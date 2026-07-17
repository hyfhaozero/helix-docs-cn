## 添加注入查询

编写语言注入查询允许将特定节点高亮为不同的语言。除了 tree-sitter 使用的[标准][upstream-docs]语言注入选项外，还有一些 Helix 特定的扩展，可提供更多控制。

注入不仅仅驱动高亮：在注入区域内，Helix 还会使用注入语言自身的缩进、文本对象和注释标记——例如，在 HTML 的 `<script>` 标签内编辑 JavaScript 时，缩进和注释会按照 JavaScript 的规则进行。

一个简单的查询示例，将 Nix 中所有字符串高亮为 bash：
```scm
((string_expression (string_fragment) @injection.content)
  (#set! injection.language "bash"))
```
另一个示例是此查询，它通过复用专用的 "comment" 语言，高亮注释中的链接和 "TODO" 等关键词：
```scm
((comment) @injection.content
  (#set! injection.language "comment"))
```

## Capture Types

- `@injection.language` (standard):
The captured node may contain the language name used to highlight the node captured by
`@injection.content`.

- `@injection.content` (standard):
Marks the content to be highlighted as the language captured with `@injection.language` _et al_.

- `@injection.filename` (extension):
The captured node may contain a filename with a file-extension known to Helix,
highlighting `@injection.content` as that language. This uses the language extensions defined in
both the default languages.toml distributed with Helix, as well as user defined languages.

- `@injection.shebang` (extension):
The captured node may contain a shebang used to choose a language to highlight as. This also uses
the shebangs defined in the default and user `languages.toml`.

## Settings

- `injection.combined` (standard):
Indicates that all the matching nodes in the tree should have their content parsed as one
nested document.

- `injection.language` (standard):
Forces the captured content to be highlighted as the given language

- `injection.include-children` (standard):
Indicates that the content node’s entire text should be re-parsed, including the text of its child
nodes. By default, child nodes’ text will be excluded from the injected document.

- `injection.include-unnamed-children` (extension):
Same as `injection.include-children` but only for unnamed child nodes.

## Predicates

- `#eq?` (standard):
The first argument (a capture) must be equal to the second argument
(a capture or a string).

- `#match?` (standard):
The first argument (a capture) must match the regex given in the
second argument (a string).

- `#any-of?` (standard):
The first argument (a capture) must be one of the other arguments (strings).

[upstream-docs]: https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html#language-injection
