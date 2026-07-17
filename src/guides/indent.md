## 添加缩进查询

Helix 使用 tree-sitter 来正确缩进新行。这需要 tree-sitter 语法和放置在 `runtime/queries/{language}/indents.scm` 中的 `indent.scm` 查询文件。

行的缩进级别是**包含它的 `@indent` 作用域的数量**。节点上的 `@indent` 捕获会打开一个作用域，该作用域跨越节点第一行*之后*到其最后一行之间的行；每行每被这样一个作用域包裹一次，就缩进一次。（少数捕获类型会对此进行调整——`@outdent` 取消一级，`@align` 对齐到某一列等（请参阅[捕获类型](#capture-types)）。）

请注意，这些作用域的*起点*很重要：在同一物理行上打开的多个作用域仅将缩进增加 1（同行规则）。请参阅[捕获类型](#capture-types)。

默认情况下，Helix 使用 `hybrid` 缩进启发式。这意味着缩进查询不用于计算行的预期绝对缩进，而是用于计算新行与已有行之间的预期缩进差值。然后将此差值添加到已有行的实际缩进中。由于这会使缩进查询中的错误更难发现，建议在测试时通过 `:set indent-heuristic tree-sitter` 禁用它。本指南的其余部分假设使用的是 `tree-sitter` 启发式。

## 缩进查询

当 Helix 通过 `o`、`O` 或 `<ret>` 插入新行时，为了确定新行的缩进级别，会对文档运行 `indents.scm` 中的查询。查询的起始位置是即将插入新行的上一行末尾。

对于 `o`，插入的行是光标所在行的下一行，因此查询的起始位置是当前行的末尾。

```rust
fn need_hero(some_hero: Hero, life: Life) -> {
    matches!(some_hero, Hero { // ←─────────────────╮
        strong: true,//←╮  ↑  ↑                     │
        fast: true,  // │  │  ╰── 查询起点          │
        sure: true,  // │  ╰───── 光标              ├─ 遍历
        soon: true,  // ╰──────── 插入的新行        │  起始节点
    }) &&            //                             │
//  ↑                                               │
//  ╰───────────────────────────────────────────────╯
    some_hero > life
}
```

对于 `O`，新插入的行是*当前*行，因此查询的起始位置是光标上方一行的末尾。

```rust
fn need_hero(some_hero: Hero, life: Life) -> { // ←─╮
    matches!(some_hero, Hero { // ←╮          ↑     │
        strong: true,//    ↑   ╭───╯          │     │
        fast: true,  //    │   │ 查询起点 ────╯     │
        sure: true,  //    ╰───┼ 光标               ├─ 遍历
        soon: true,  //        ╰ 插入的新行         │  起始节点
    }) &&            //                             │
    some_hero > life //                             │
} // ←──────────────────────────────────────────────╯
```

从这个起始节点开始，语法树会向上遍历到根节点，收集祖先节点上的每个 `@indent`/`@outdent`/`@align`/... 捕获。每个作用域*包含*当前行的 `@indent` 祖先计入一个缩进级别（在同一行打开的作用域合并为一个）；[捕获类型](#capture-types)描述了具体调整。

### 捕获类型

- `@indent`：
  在此节点上打开一个缩进作用域——它所包含的每一行都会多缩进一级。在同一行打开的作用域会合并：多个 `@indent` 在同一行开始时仅增加 1。同时被 `@indent` 和 `@outdent` 捕获的节点不产生任何效果（其级别被抵消）——用于例如嵌套的 `else if` 不应叠加第二级缩进的情况。
  默认情况下，作用域在节点自身的第一行打开；请参阅 [`header`](#scope-header) 作用域以在父节点（头部）行打开。
- `@outdent`：
  减少该行（通常是闭括号如 `}`/`)`/`]`，或关键字如 `else`）开始处的缩进 1 级。
- `@indent.always`：
  类似于 `@indent`，但*不*合并——同一行上的多个每个都增加一级。净级别贡献为 `@indent.always` − `@outdent.always`。
- `@outdent.always`：
  类似于 `@outdent`，但可叠加，是 `@indent.always` 的对应项。
- `@align`（默认作用域 `all`）：
  将此节点内的所有内容对齐到某个锚点。锚点由同一模式中 `@anchor` 捕获的节点起始位置给出。每个包含 `@align` 的模式应恰好包含一个 `@anchor`。`@align` 节点下方（按其起始行计算）节点的缩进（和取消缩进）会被添加到对齐所需的缩进中。
- `@extend`：
  将此节点的范围扩展到行尾，并扩展到比该节点起始行缩进更多的行。这对于 Python 等语言很有用，在这些语言中，出于缩进目的，某些节点（如函数或类）也应包含其后缩进的行。
- `@extend.prevent-once`：
  阻止此节点祖先的第一次扩展。例如，在 Python 中，return 表达式总是结束它所在的代码块。请注意，这仅阻止下一个 `@extend` 捕获的扩展。如果捕获了多个祖先，仅阻止最内层祖先的扩展。所有其他祖先不受影响（无论最内层祖先是否实际会被扩展）。
- `@opaque`：
  标记字面量主体，例如字符串、heredoc 或块注释。在捕获节点内开始的行保持其现有缩进，而不是被重新缩进，因此多行字面量的内容保持不变。

#### `@indent` / `@outdent`

请看以下示例：

```rust
fn shout(things: Vec<Thing>) {
    //                       ↑
    //                       ├───────────────────────╮ 缩进级别
    //                    @indent                    ├┄┄┄┄┄┄┄┄┄┄┄┄┄┄
    //                                               │
    let it_all = |out| { things.filter(|thing| { //  │      1
    //                 ↑                       ↑     │
    //                 ├───────────────────────┼─────┼┄┄┄┄┄┄┄┄┄┄┄┄┄┄
    //              @indent                 @indent  │
    //                                               │      2
        thing.can_do_with(out) //                    │
    })}; //                                          ├┄┄┄┄┄┄┄┄┄┄┄┄┄┄
  //↑↑↑                                              │      1
} //╰┼┴──────────────────────────────────────────────┴┄┄┄┄┄┄┄┄┄┄┄┄┄┄
// 3x @outdent
```

```scm
((block) @indent)
["}" ")"] @outdent
```

请注意在第二行，两个代码块在同一行打开：由于两个作用域都开始于该行，它们会合并，净增加为 1。在最后一行，三个代码块作用域都包含它，但它以三个 @outdent 的 } 标记开头，这些标记抵消了它们，因此该行回到了外部包围级别的缩进。

#### 同行合并

上述合并是一个经过深思熟虑的、具有承重作用的不变规则：

> 一行的缩进级别按**包含它的 `@indent` 作用域在多少个物理行上打开**来计算，而非按作用域个数计算。在同一行上*打开*的多个 `@indent` 作用域合计只增加一个级别。

这正是让**方法链/构建器链平展而非阶梯状**的原因。语法通常将链式调用嵌套起来，使得每个 `.method()` 链接都是前一个链接内部 `member_expression` 内的一个 `call`，并且其中多个节点*开始*于接收者所在行：

```rust
let x = thing       // ← 链式调用在此开始
    .foo()          // 每个链接对齐缩进一级，
    .bar()          // 而非逐级加深
    .baz();
```

```scm
(call_expression) @indent
```

尽管许多 `call_expression` / `member_expression` 作用域包含了 `.bar()` 这一行，但它们都在 `thing` 这一行上*打开*，因此它们合并为一个级别，连续的行对齐。如果没有合并，每个链接都会增加一个级别，链会阶梯状向右延伸。

如果你希望即使多个作用域在同一行打开时每个作用域都分别计数（例如 YAML 的“列表项*和*映射在同一行开始”），可以使用 `@indent.always`（见下文）来退出合并行为，它不会合并。

#### `@extend` / `@extend.prevent-once`

关于 `@extend` 有用的例子，可以考虑对空白敏感的 Python。

```scm
]
  (parenthesized_expression)
  (function_definition)
  (class_definition)
] @indent

```

```python
class Hero:
    def __init__(self, strong, fast, sure, soon):#  ←─╮
        self.is_strong = strong #                     │
        self.is_fast = fast     # ╭─── 查询起点       │
        self.is_sure = sure     # │ ╭─ 光标           │
        self.is_soon = soon     # │ │                 │
        #     ↑            ↑      │ │                 │
        #     │            ╰──────╯ │                 │
        #     ╰─────────────────────╯                 │
        #                                             ├─ 遍历
    def need_hero(self, life):         #              │  起始节点
        return (                       #              │
            self.is_strong             #              │
            and self.is_fast           #              │
            and self.is_sure           #              │
            and self.is_soon           #              │
            and self > life            #              │
        ) # ←─────────────────────────────────────────╯
```

如果没有花括号来界定函数的作用域，换行时光标所在的最小后代节点最终会成为类的整个内部。因此，它会错过整个函数节点及其缩进捕获，导致缩进级别少了一级。

为了解决这种情况，`@extend` 告诉 Helix 将被捕获节点的范围“扩展”到换行处，以及所有缩进级别大于该节点所在行的连续行。

```scm
(parenthesized_expression) @indent

]
  (function_definition)
  (class_definition)
] @indent @extend

```

```python
class Hero:
    def __init__(self, strong, fast, sure, soon):#  ←─╮
        self.is_strong = strong #                     │
        self.is_fast = fast     # ╭─── 查询起点       ├─ 遍历
        self.is_sure = sure     # │ ╭─ 光标           │  起始节点
        self.is_soon = soon     # │ │ ←───────────────╯
        #     ↑            ↑      │ │                 
        #     │            ╰──────╯ │
        #     ╰─────────────────────╯
    def need_hero(self, life):
        return (
            self.is_strong
            and self.is_fast
            and self.is_sure
            and self.is_soon
            and self > life
        )
```

此外，在某些情况下，扩展到所有具有更大缩进级别的内容可能并不理想。考虑上面的 `need_hero` 函数。如果我们的光标位于返回表达式的最后一行：

```python
class Hero:
    def __init__(self, strong, fast, sure, soon):
        self.is_strong = strong
        self.is_fast = fast
        self.is_sure = sure
        self.is_soon = soon

    def need_hero(self, life):
        return (
            self.is_strong
            and self.is_fast
            and self.is_sure
            and self.is_soon
            and self > life
        ) # ←─── 光标
    #←────────── 新行时光标应处的位置
```

在 Python 中，有一些标记总是会结束一个作用域，例如 return 语句。由于作用域结束，缩进级别也理应结束。但正因为函数范围被扩展到了每个具有更大缩进级别的行，新行只会继续在同一级别上。而 `@outdent` 在这里也帮不了我们，因为它会导致括号内的所有内容都被取消缩进。

为了解决这个问题，我们需要标记扩展的结束。我们可以使用`@extend.prevent-once`。

```scm
(parenthesized_expression) @indent

]
  (function_definition)
  (class_definition)
] @indent @extend

(return_statement) @extend.prevent-once
```

#### 无花括号体

无花括号的单语句体 —— `if (cond)` 及其语句在下一行，且没有 `{}` —— 是一个缩进必须包裹的体，但该体节点的*自身*首行正是需要缩进的那一行（没有单独的开头行）。捕获该体并为其指定 [`header`](#scope-header) 作用域，该作用域会在**头部**（被捕获节点的父节点）行打开，而不是在该体自身的行打开，因此体行被包含在内：

```scm
(if_statement
  consequence: (_) @indent
  (#not-kind-eq? @indent "compound_statement")
  (#set! "scope" "header"))
(while_statement
  body: (_) @indent
  (#not-kind-eq? @indent "compound_statement")
  (#set! "scope" "header"))
```

#### 无花括号体

无花括号的单语句体 —— `if (cond)` 及其语句在下一行，且没有 `{}` —— 是一个缩进必须包裹的体，但该体节点的*自身*首行正是需要缩进的那一行（没有单独的开头行）。捕获该体并为其指定 [`header`](#scope-header) 作用域，该作用域会在**头部**（被捕获节点的父节点）行打开，而不是在该体自身的行打开，因此体行被包含在内：

查询已经精确命名了无花括号体（`consequence:` / `body:` 字段，其中 `#not-kind-eq?` 跳过了被周围块缩进所包含的花括号形式），因此引擎仅将该捕获的作用域在其父节点处打开——它本身不会检查节点类型或字段名称。这也适用于多行的无花括号体（例如返回一个 lambda 的体）。为 `else` 和 `do / while` 分别给出它们自己的模式（在 `alternative` / `body` 字段上），以便末尾的 `else` / `while` 关键字行不会与体一起缩进。

#### `@indent.always` / `@outdent.always`

如前所述，通常情况下，如果同一行上有多个 `@indent` 或 `@outdent` 捕获，它们会被合并。

有时，你可能希望确保每个缩进捕获都是累加的，而不管同一行上有多少个。请考虑以下 YAML 示例:

```yaml
- foo: bar
# ↑ ↑
# │ ╰─────────────── 映射的开始
# ╰───────────────── 列表元素的开始
    baz: quux # ←─── 光标
    # ←───────────── 新行时光标应处的位置
    garply: waldo
  - quux:
      bar: baz
    xyzzy: thud
    fred: plugh
```

在 YAML 中，你经常会遇到映射列表。在这些情况下，语法使得列表元素和映射都从同一行开始。但我们确实希望为每一个都开始一个缩进，以便映射中的后续键能够悬挂在列表上方并对齐整齐。这就是 `@indent.always` 发挥作用的地方。

```scm
((block_sequence_item) @item @indent.always @extend
  (#not-one-line? @item))

((block_mapping_pair
    key: (_) @key
    value: (_) @val
    (#not-same-line? @key @val)
  ) @indent.always @extend
)
```

## 谓词

在某些情况下，S-表达式无法精确表达应该匹配的模式。为此，tree-sitter 允许谓词出现在模式中的任何位置，类似于 `#set!` 声明的工作方式：

```scm
(some_kind
  (child_kind) @indent
  (#predicate? arg1 arg2 ...)
)
```

参数的数量取决于所使用的谓词。
每个参数要么是一个捕获（`@name`），要么是一个字符串（`"some string"`）。
tree-sitter 支持以下谓词：

- `#eq?`/`#not-eq?`：
第一个参数（一个捕获）必须/不得等于第二个参数（一个捕获或字符串）。

- `#match?`/`#not-match?`：
第一个参数（一个捕获）必须/不得匹配第二个参数（字符串）中给定的正则表达式。

- `#any-of?`/`#not-any-of?`：
第一个参数（一个捕获）必须是/不得是其他参数（字符串）之一。

此外，我们还为缩进查询支持一些自定义谓词：

- `#not-kind-eq?`：
第一个参数（一个捕获）的种类必须不等于第二个参数（一个字符串）。

- `#same-line?`/`#not-same-line?`：
两个参数给出的捕获必须/不得在同一行开始。

- `#one-line?`/`#not-one-line?`：
第一个参数给出的捕获必须/不得跨越总行数为一行。

### <a name="scope-header"></a>`header` 作用域

默认情况下，`@indent` 作用域在被捕获节点自身的第一行打开，因此其*内部*的行会被缩进，而第一行不会。有时，你必须捕获的节点*正是*需要缩进的那一行——例如无花括号体，如 `if (cond)` 后面的语句（参见[无花括号体](#brace-less-bodies)）。为此，将 `scope` 设置为 `header`：

```scm
(if_statement
  consequence: (_) @indent
  (#not-kind-eq? @indent "compound_statement")
  (#set! "scope" "header"))
```

`header` 在被捕获节点的**父节点**（`if_statement` 头部）行处打开作用域，而不是在该节点自身的行处，因此函数体的第一行会被包含并缩进。查询选择的是确切的函数体，因此引擎仅遵循该注解——它不会自行匹配节点类型或字段名称。

（旧版查询使用 `tail` / `all` 作用域来控制是否包含节点的第一行；在包含模型下，这些不再需要，已被移除。`header` 是引擎读取的唯一作用域。）

## 测试

`cargo xtask indent-check [language]` 在两种模式下检查查询是否通过 `tests/indent/<language-id>.<ext>` 中的测试用例：重新缩进每一行，并模拟在其后键入换行符，因此无论是哪种方式，只要有一条规则在一种模式下正确但在另一种模式下错误，都会被捕获。