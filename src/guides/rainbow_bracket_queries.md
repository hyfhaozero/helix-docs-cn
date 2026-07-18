# 添加彩虹括号查询

Helix 使用 `rainbows.scm` tree-sitter 查询文件来提供彩虹括号功能。

Tree-sitter 查询在 tree-sitter 在线文档中有详细说明。如果你是第一次编写查询，请务必查看[语法高亮查询]和[查询语法]部分。

彩虹查询有两个捕获：`@rainbow.scope` 和 `@rainbow.bracket`。`@rainbow.scope` 应捕获任何增加嵌套层级的节点，而 `@rainbow.bracket` 应捕获任何括号节点。换句话说：`@rainbow.scope` 为其下树中的所有节点切换到下一个彩虹颜色，而 `@rainbow.bracket` 则使用当前彩虹颜色绘制捕获的节点。

例如，让我们为 tree-sitter 查询（TSQ）语言本身添加彩虹查询。这些查询将放入仓库根目录下的 `runtime/queries/tsq/rainbows.scm` 文件中。

首先我们添加 `@rainbow.bracket` 捕获。TSQ 只有圆括号和方括号：

```tsq
["(" ")" "[" "]"] @rainbow.bracket
```

交替（方括号）内节点的顺序不被考虑。

尖括号需要小心：`<` 和 `>` 通常也是比较运算符，因此全局捕获它们会使每个比较都被彩虹着色。只应在通用节点内捕获它们，同时将该节点标记为作用域：

```tsq
(type_arguments ["<" ">"] @rainbow.bracket) @rainbow.scope
```

> 注意：为什么这些节点要加引号？大多数语法高亮捕获的是用括号括起来的文本。这些是_命名节点_，对应于语法中规则的名称。括号在 tree-sitter 语法中通常写作字面量字符串，例如：
>
> ```js
> {
>   // ...
>   arguments: $ => seq("(", repeat($.argument), ")"),
>   // ...
> }
> ```
>
> 在 tree-sitter 语法中写成字面量字符串的节点，可以在查询中使用相同的字面量字符串进行捕获。

然后我们添加 `@rainbow.scope` 捕获。最简单的方法是查看 tree-sitter 语法仓库中的 `grammar.js` 文件。对于 TSQ，该文件在[这里][tsq grammar.js]。当我们向下滚动 `grammar.js` 时，可以看到 `(alternation)`（L36）、`(group)`（L57）、`(named_node)`（L59）、`(predicate)`（L87）和 `(wildcard_node)`（L97）节点的定义中都包含字面量圆括号或方括号。这些节点都是括号的直接父节点，也恰好是我们希望切换到下一个彩虹颜色的节点，因此我们将它们捕获为 `@rainbow.scope`。

```tsq
[
  (group)
  (named_node)
  (wildcard_node)
  (predicate)
  (alternation)
] @rainbow.scope
```

这种策略作为大多数编程语言和配置语言的经验法则行之有效。标记语言可能会更棘手，可能需要额外的实验来找到用于作用域和括号的正确节点。

`:tree-sitter-subtree` 命令以 S-表达式格式显示主选区下的语法树，对于确定如何编写查询来说是一个有用的工具。

### 属性

`rainbow.include-children` 属性可应用于 `@rainbow.scope` 捕获。默认情况下，所有 `@rainbow.bracket` 捕获必须是语法树中某个被 `@rainbow.scope` 捕获节点的直接后代，才能被高亮。`rainbow.include-children` 属性禁用了该检查，允许 `@rainbow.bracket` 捕获在它们是某个被 `@rainbow.scope` 捕获节点的直接或间接后代时被高亮。

例如，此属性在 HTML 彩虹查询中被使用。

对于像 `<a>link</a>` 这样的文档，语法树为：

```tsq
(element                   ; <a>link</a>
  (start_tag               ; <a>
    (tag_name))            ; a
  (text)                   ; link
  (end_tag                 ; </a>
    (tag_name)))           ; a
```

如果我们想用彩虹颜色高亮 `<`、`>` 和 `</` 节点，我们将它们捕获为 `@rainbow.bracket`：

```tsq
["<" ">" "</"] @rainbow.bracket
```

我们将 `(element)` 捕获为 `@rainbow.scope`，因为 `(element)` 节点彼此嵌套：它们会增加嵌套层级并切换到彩虹中的下一个颜色。

```tsq
(element) @rainbow.scope
```

但这种 `@rainbow.scope` 和 `@rainbow.bracket` 的组合不会高亮任何节点。`<`、`>` 和 `</` 是 `(start_tag)` 和 `(end_tag)` 节点的子节点。我们不能将 `(start_tag)` 和 `(end_tag)` 捕获为 `@rainbow.scope`，因为它们不嵌套其他元素。我们可以通过使用 `rainbow.include-children` 属性，移除 `<`、`>` 和 `</` 必须是 `(element)` 直接后代的要求来解决此问题。

```tsq
((element) @rainbow.scope
 (#set! rainbow.include-children))
```

设置了此属性后，`<`、`>` 和 `</` 将会以彩虹颜色高亮，即使它们不是 `(element)` 节点的直接后代。

`rainbow.include-children` 对于绝大多数编程语言来说并非必需。仅当增加嵌套层级（改变彩虹颜色）的节点不是括号节点的直接父节点时，才需要使用它。

[语法高亮查询]: https://tree-sitter.github.io/tree-sitter/syntax-highlighting#highlights
[查询语法]: https://tree-sitter.github.io/tree-sitter/using-parsers#pattern-matching-with-queries
[tsq grammar.js]: https://github.com/the-mikedavis/tree-sitter-tsq/blob/48b5e9f82ae0a4727201626f33a17f69f8e0ff86/grammar.js
