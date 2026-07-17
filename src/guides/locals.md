## 添加局部变量查询

`locals.scm` 查询让 Helix 了解变量作用域和定义，从而可以将局部变量与全局变量区分高亮显示。当 `@local.reference` 标识符被解析为 `@local.definition` 时，它会继承该定义的高亮类别，而不是由 `highlights.scm` 分配的类别。

在为 Helix 贡献代码时，查询文件应放置在 `runtime/queries/{language}/locals.scm` 中。与其他查询文件一样，`locals.scm` 可以在第一行使用 `; inherits: <lang>` 来复用其他语言的查询。局部变量解析在其自己的过程中进行，具有自己的优先级，独立于 `highlights.scm`。

## 捕获

### `@local.scope`

将节点标记为作用域边界。定义仅对出现在同一作用域或嵌套作用域内的引用可见。典型的作用域节点是函数体和代码块。

```scm
[
  (function_definition)
  (block)
] @local.scope
```

### `@local.definition.*`

将名称节点标记为引入局部符号。`@local.definition.` 之后的后缀成为应用于解析到该定义的任何引用的高亮类别。例如，`@local.definition.variable.parameter` 会使匹配的引用被高亮为 `variable.parameter`。
```scm
(function_item
  (parameters
    (parameter
      pattern: (identifier) @local.definition.variable.parameter)))
```

常见的后缀与 `highlights.scm` 中的高亮类别相对应：`variable`、`variable.parameter`、`variable.builtin`、`variable.mutable`、`function`、`namespace`、`type`、`constant` 等。

### `@local.reference`

将标识符节点标记为对局部定义的潜在引用。Helix 会在封闭的作用域中搜索匹配的定义，如果找到，则使用该定义的高亮类别来高亮该引用。

```scm
(identifier) @local.reference
```

## 丢弃捕获

`locals.scm` 中任何不是 `@local.scope`、`@local.reference` 或 `@local.definition.*` 的捕获都充当丢弃捕获。它会阻止 `@local.reference` 在该节点处被解析，但不影响 `highlights.scm` 的结果。这对于那些看起来像引用但不应被视为变量引用的标识符节点很有用，例如关键字参数名称或结构体字面量中的结构体字段名称。

```scm
; 调用中的关键字参数名称不是变量引用。
(keyword_argument
  name: (identifier) @_)
```

查询文件中较晚的模式比较早的模式具有更高的优先级。丢弃模式必须出现在它要覆盖的 `@local.reference` 模式之后。将其放在后面可确保它具有更高的优先级，并取消对匹配节点的引用解析。

约定使用以下划线开头的捕获名称（例如 `@_`、`@_keyword`）来明确丢弃意图，但任何非 `@local.*` 的名称都可以。h

## 定义和引用如何匹配

Helix 通过将引用节点的文本与当前作用域内可见定义的文本进行比较，来将引用匹配到定义。内部作用域中的定义会遮蔽外部作用域中的定义。如果未找到定义，则该引用保留其 `highlights.scm` 中的高亮。

## 与 `highlights.scm` 的关系

locals 系统与 `highlights.scm` 并行运行，而不是取代它。`highlights.scm` 始终确定节点的基准高亮。仅当 `@local.reference` 成功解析到 `@local.definition` 时，`locals.scm` 才能覆盖该高亮，且仅针对该特定解析。`locals.scm` 中非 `@local.*` 的捕获（即丢弃捕获）对 `highlights.scm` 的结果没有影响。