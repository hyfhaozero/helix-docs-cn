## 添加标签查询

关于标签查询的背景信息，请参阅 tree-sitter 的[代码导航系统][Code Navigation Systems]文档。

Helix 为具有基于语法树的 `tags.scm` 查询的语言，开箱即用地提供了类似 LSP 的功能，例如文档和工作区符号选择器。要进行分析，语言必须具有 tree-sitter 语法和 `tags.scm` 查询文件，该文件用于匹配语法树中的相关节点。

在为 Helix 贡献代码时，查询文件应放置在 `runtime/queries/{language}/tags.scm` 中。为便于测试，你可以将它们放在本地运行时目录下（例如 Linux 上的 `~/.config/helix/runtime`）。

## 捕获

### `@definition.*`

将节点标记为符号定义。以下定义捕获是被识别的：

| 捕获名称               |
| ---                    |
| `definition.class`     |
| `definition.constant`  |
| `definition.enum`      |
| `definition.field`     |
| `definition.function`  |
| `definition.interface` |
| `definition.macro`     |
| `definition.module`    |
| `definition.section`   |
| `definition.struct`    |
| `definition.type`      |

此列表之外的捕获会被符号选择器忽略，因此应将语言特定的结构映射到最接近的列出的种类，而不是创建新的种类。

### `@name`

在匹配项中标记名称标识符节点。`@definition.*` 应捕获整个定义节点，而 `@name` 应捕获同一匹配项中的名称标识符：

```scm
(function_definition
  name: (identifier) @name) @definition.function

(class_definition
  name: (identifier) @name) @definition.class
```

### `@reference.*`

将节点标记为调用点或类型引用。它们被工作区符号搜索用于定位使用处。`@reference.call` 和 `@reference.class` 是常见的变体。与定义类似，`@name` 捕获标识符：

```scm
(call
  function: (identifier) @name) @reference.call
```

[示例查询文件][example-queries]可以在 Helix GitHub 仓库中找到。

[Code Navigation Systems]: https://tree-sitter.github.io/tree-sitter/4-code-navigation.html
[example-queries]: https://github.com/search?q=repo%3Ahelix-editor%2Fhelix+path%3A%2A%2A/tags.scm&type=Code
