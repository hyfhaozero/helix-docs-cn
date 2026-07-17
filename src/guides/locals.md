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

Marks a name node as introducing a local symbol. The suffix after
`@local.definition.` becomes the highlight class applied to any reference that
resolves to this definition. For example, `@local.definition.variable.parameter`
causes matching references to be highlighted as `variable.parameter`.

```scm
(function_item
  (parameters
    (parameter
      pattern: (identifier) @local.definition.variable.parameter)))
```

Common suffixes mirror the highlight classes in `highlights.scm`:
`variable`, `variable.parameter`, `variable.builtin`, `variable.mutable`,
`function`, `namespace`, `type`, `constant`, etc.

### `@local.reference`

Marks an identifier node as a potential reference to a local definition.
Helix searches enclosing scopes for a matching definition and, if found,
highlights the reference with that definition's class instead.

```scm
(identifier) @local.reference
```

## Discard captures

Any capture in `locals.scm` that is not `@local.scope`, `@local.reference`, or
`@local.definition.*` acts as a discard. It prevents a `@local.reference` from
being resolved at that node without affecting the `highlights.scm` result. This
is useful for identifier nodes that look like references but should not be
treated as variable references, for example keyword argument names or struct
field names in struct literals.

```scm
; Keyword argument names in a call are not variable references.
(keyword_argument
  name: (identifier) @_)
```

Later patterns in a query file have higher precedence than earlier ones. A
discard pattern must appear after the `@local.reference` pattern it is intended
to override. Placing it later ensures it takes precedence and cancels the
reference resolution for nodes it matches.

The convention is to use a capture name beginning with an underscore (e.g. `@_`,
`@_keyword`) to make the discard intent clear, but any non-`@local.*` name works.

## How definitions and references are matched

Helix matches references to definitions by comparing the text of the reference
node against the text of definitions visible from the current scope. Definitions
in inner scopes shadow those in outer scopes. If no definition is found the
reference is left with its `highlights.scm` highlight.

## Relationship with `highlights.scm`

The locals system runs alongside `highlights.scm`, not instead of it.
`highlights.scm` always determines the baseline highlight for a node.
`locals.scm` can override that highlight only when a `@local.reference`
successfully resolves to a `@local.definition`, and only for that specific
resolution. Non-`@local.*` captures in `locals.scm` (i.e. discards) have no
effect on `highlights.scm` results.
