## 向 Helix 添加新语言

要向 Helix 添加新语言，你需要按照以下步骤操作。

## 语言配置

1. 在 `languages.toml` 文件中添加一个新的 `[[language]]` 条目，并为新语言提供必要的配置。有关语言配置的更多信息，请参阅文档中的[语言配置章节](../languages.md)。可以通过在同一文件中扩展 `[language-server]` 表来添加新的语言服务器。
2. 如果你正在添加新语言或更新现有语言服务器配置，请运行命令 `cargo xtask docgen` 以更新[语言支持](../lang-support.md)文档。

> 💡 如果你正在添加新的语言服务器配置，请确保使用安装说明更新[语言服务器 Wiki](https://github.com/helix-editor/helix/wiki/Language-Server-Configurations)。

## 语法配置

1. 如果新语言有可用的 tree-sitter 语法，请在 `languages.toml` 文件中添加一个新的 `[[grammar]]` 条目。
2. 如果你在本地测试语法，可以使用 `source.path` 键并指定语法的绝对路径。但在提交拉取请求之前，请确保切换为使用 `source.git`。

## 查询

1. 为了为新语言提供语法高亮和缩进，你需要添加查询文件。
2. 为该语言创建一个新目录，路径为 `runtime/queries/<name>/`。
3. 有关编写查询的更多信息，请参阅 [tree-sitter 网站](https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html#highlights)。
4. 高亮捕获（`@function`、`@type` 等）及其解析方式在[主题页面](./themes.md)中有文档说明：匹配最合适的特定范围，捕获你指代的叶子节点，并记住最后一个匹配模式（以及最内层的节点）胜出。
5. Helix 从该目录加载多个查询文件；只有 `highlights.scm` 是必需的：

   | 文件 | 用途 | 指南 |
   |---|---|---|
   | `highlights.scm` | 语法高亮 | [highlights.md](./highlights.md) |
   | `injections.scm` | 在区域中嵌入其他语言（字符串、代码块） | [injection.md](./injection.md) |
   | `indents.scm` | 缩进 | [indent.md](./indent.md) |
   | `textobjects.scm` | 文本对象和导航（`mif`、`]f` 等） | [textobject.md](./textobject.md) |
   | `locals.scm` | 作用域跟踪，使局部变量高亮更清晰 | [locals.md](./locals.md) |
   | `tags.scm` | 文档/工作区符号选择器 | [tags.md](./tags.md) |
   | `rainbows.scm` | 彩虹括号 | [rainbow_bracket_queries.md](./rainbow_bracket_queries.md) |

   查询文件可以在第一行使用 `; inherits: <lang>` 来复用其他语言的查询。运行 `cargo xtask query-check [language]` 可以检查查询文件是否针对该语法有效。

## 常见问题

- 如果在切换分支后运行 Helix 时遇到错误，你可能需要更新 tree-sitter 语法。运行命令 `hx --grammar fetch` 获取语法，运行 `hx --grammar build` 构建任何过时的语法。
- 如果某个解析器导致段错误，或者你想移除它，请确保移除位于 `runtime/grammars/<name>.so` 的已编译解析器。
- 如果你正在尝试添加查询文件而 Helix 无法找到它们，请确保环境变量 `HELIX_RUNTIME` 已设置为你要开发的 `runtime` 文件夹的位置。
- 使用 `cargo xtask query-check [language]` 验证查询文件（每个查询文件必须能针对该语法编译）。`highlight-check` 和 `indent-check` 会额外在实际测试用例上运行真正的高亮器和缩进器以捕获错误。
