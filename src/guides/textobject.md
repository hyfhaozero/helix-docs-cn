## 添加文本对象查询

Helix 支持特定于语言的文本对象，例如函数、类等。这些文本对象需要配套的 tree-sitter 语法和 `textobjects.scm` 查询文件才能正常工作。Tree-sitter 允许我们查询源代码语法树并捕获其中的特定部分。查询使用 Lisp 方言编写。有关如何编写查询的更多信息，请参阅[官方 tree-sitter 文档][tree-sitter-queries]。

在为 Helix 贡献代码时，查询文件应放置在 `runtime/queries/{language}/textobjects.scm` 中。请注意，要在本地测试查询文件，你应将它们放在本地运行时目录下（例如 Linux 上的 `~/.config/helix/runtime`）。

以下[捕获][tree-sitter-captures]是被识别的：

| 捕获名称              |
| ---                   |
| `function.inside`     |
| `function.around`     |
| `class.inside`        |
| `class.around`        |
| `test.inside`         |
| `test.around`         |
| `parameter.inside`    |
| `parameter.around`    |
| `comment.inside`      |
| `comment.around`      |
| `entry.inside`        |
| `entry.around`        |
| `xml-element.inside`  |
| `xml-element.around`  |

[示例查询文件][textobject-examples]可以在 Helix GitHub 仓库中找到。

## 基于文本对象的导航查询

Helix 中基于 Tree-sitter 的导航按以下顺序使用捕获：

- `object.movement`
- `object.around`
- `object.inside`

例如，如果某语言的 `function.around` 捕获已在其 `textobjects.scm` 文件中定义，则函数导航也应自动工作。仅当 `function.around` 捕获的节点在导航上下文中不合适时，才应定义 `function.movement`。

[tree-sitter-queries]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/1-syntax.html
[tree-sitter-captures]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/2-operators.html#capturing-nodes
[textobject-examples]: https://github.com/search?q=repo%3Ahelix-editor%2Fhelix+path%3A%2A%2A/textobjects.scm&type=Code&ref=advsearch&l=&l=