## 语言

语言特定的设置和语言服务器的设置在 `languages.toml` 文件中配置。

## `languages.toml` 文件

`languages.toml` 文件有三个可能的位置：

1. Helix 源代码中，位于 [Helix 仓库](https://github.com/helix-editor/helix/blob/master/languages.toml)。它提供语言和语言服务器的默认配置。

2. 你的[配置目录](./configuration.md)中。这会覆盖内置语言配置中的值。例如，要禁用 Rust 的自动格式化：

   ```toml
   # in <config_dir>/helix/languages.toml

   [language-server.mylang-lsp]
   command = "mylang-lsp"

   [[language]]
   name = "rust"
   auto-format = false
   ```

3. 在项目中的 `.helix` 文件夹中。通过在 `.helix` 文件夹中创建 `languages.toml` 文件，也可以针对项目覆盖语言配置。其设置将与配置目录中的语言配置和内置配置合并。

## 语言配置

每种语言通过在 `languages.toml` 文件中添加 `[[language]]` 部分来配置。例如：

```toml
[[language]]
name = "mylang"
scope = "source.mylang"
injection-regex = "mylang"
file-types = ["mylang", "myl"]
comment-tokens = "#"
indent = { tab-width = 2, unit = "  " }
formatter = { command = "mylang-formatter" , args = ["--stdin"] }
language-servers = [ "mylang-lsp" ]
```

以下是可用的配置键：

| 键名                     | 描述                                                                                                                         |
| ----                    | -----------                                                                                                                  |
| `name`                  | 语言名称                                                                                                                     |
| `language-id`           | 语言服务器的语言 ID，请查看 [TextDocumentItem](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocumentItem) 中的表格以获取正确的 ID |
| `scope`                 | 类似于 `source.js` 的字符串，用于标识语言。目前，我们力求匹配流行的 TextMate 语法和 Linguist 库使用的作用域名称。通常为 `source.<name>` 或标记语言情况下的 `text.<name>` |
| `injection-regex`       | 正则表达式模式，将针对语言名称进行测试，以确定是否应将此语言用于潜在的[语言注入][treesitter-language-injection]位置。          |
| `file-types`            | 语言的文件类型，例如 `["yml", "yaml"]`。请参阅下面的文件类型检测部分。                                                        |
| `shebangs`              | Shebang 行中的解释器，例如 `["sh", "bash"]`                                                                                 |
| `roots`                 | 用于 LSP 工作目录选择的一组标记文件。Helix 从文件开始向上查找，并记住包含标记文件的**最顶层**即**最后一个**目录。例如 Cargo.lock、yarn.lock |
| `auto-format`           | 是否在保存时自动格式化此语言                                                                                                 |
| `comment-tokens`        | 用作行注释的令牌，可以是单个令牌如 `"//"` 或数组如 `["//", "///", "//!"]`（第一个令牌将用于注释）。也可配置为 `comment-token` 以向后兼容 |
| `block-comment-tokens`  | 多行注释的起始和结束令牌，可以是数组或单个表 `{ start = "/*", end = "*/"}`。第一组令牌将用于注释，数组中的任何对都可以取消注释 |
| `indent`                | 要使用的缩进。包含子键 `unit`（缩进时插入文档的文本；通常设置为 N 个空格或制表符的 `"\t"`）和 `tab-width`（制表符渲染的空格数） |
| `language-servers`      | 此语言使用的语言服务器。有关更多信息，请参见下文 [为语言配置语言服务器](#configuring-language-servers-for-a-language) 部分 |
| `grammar`               | 要使用的 tree-sitter 语法（默认为 `name` 的值）                                                                             |
| `formatter`             | 语言的格式化程序，当定义时会优先于 LSP。格式化程序必须能够将原始文件作为标准输入读取，并将格式化后的文件写入标准输出。当前缓冲区的文件名可以通过使用 `%{buffer_name}` 展开变量作为参数传递。有关更多信息，请参见下文 [配置格式化命令](#configuring-the-formatter-command) |
| `soft-wrap`             | [editor.softwrap](./editor.md#editorsoft-wrap-section)                                                                       |
| `text-width`            | 最大行长度。用于 `:reflow` 命令和软换行（如果设置了 `soft-wrap.wrap-at-text-width`），默认为 `editor.text-width`               |
| `rulers`                | 覆盖语言的 `editor.rulers` 配置键。                                                                                          |
| `path-completion`       | 覆盖语言的 `editor.path-completion` 配置键。                                                                                 |
| `word-completion`       | 覆盖语言的 [`editor.word-completion`](./editor.md#editorword-completion-section) 配置。                                      |
| `workspace-lsp-roots`   | 在工作区根目录中提前停止向上根搜索的目录（相对于工作区根目录）。用于本地 `.helix/config.toml` 中的项目特定硬覆盖。            |
| `persistent-diagnostic-sources` | 当语言服务器重新发送相同的诊断集时，假定不变的 LSP 诊断源数组。Helix 可以在内部跟踪这些诊断的位置。对于保存时重新计算的诊断很有用。 |
| `rainbow-brackets`      | 覆盖语言的 `editor.rainbow-brackets` 配置键。                                                                               |
| `code-actions-on-save`  | 保存时按顺序运行的 LSP 代码操作列表，例如 `["source.organizeImports"]`                                                    |

## 项目和 LSP 根目录选择

这是 Helix 使用的模型：

- **工作区根目录**通过从当前工作目录向上查找，并选择包含 `.git`、`.svn`、`.jj` 或 `.helix` 的第一个目录来确定。如果未找到任何目录，则当前工作目录即为工作区根目录。
- 根标记（`roots`）仅用于 LSP 根目录选择，并且是从**文件**（而非 Helix 打开的文件夹）开始查找。
- 我们使用具有根标记的**最顶层**目录（搜索会在工作区根目录处停止）。
- 在大多数情况下，根标记已足够。在某些仓库中，存在多个嵌套的根标记，而你需要使用内部还是外部的标记取决于具体项目。对于这些情况，可以使用 `workspace-lsp-roots` 在特定目录中提前停止搜索。
- `workspace-lsp-roots` 旨在**项目特定**配置中设置：`$PROJECT/.helix/config.toml`。

与 `required-root-patterns`（语言服务器配置键）的交互：

- 选定 LSP 根目录后，Helix 会在该目录中检查 `required-root-patterns`。如果没有匹配项，则不会启动服务器。
- 这是验证，而非根目录检测。

### 文件类型检测与 `file-types` 键

Helix 根据上一节中的 `file-types` 键确定要使用的语言配置。`file-types` 是字符串或表的列表，例如：saving               |
| `diagnostic-severity` | 诊断显示的最低严重级别。（允许值：`error`、`warning`、`info`、`hint`） |
| `comment-tokens`      | 用作注释令牌的令牌，可以是单个令牌

```toml
file-types = ["toml", { glob = "Makefile" }, { glob = ".git/config" }, { glob = ".github/workflows/*.yaml" } ]
```

在确定要使用的语言配置时，Helix 按以下优先级搜索 `file-types`：

1. Glob：`glob` 表中的值会与给定文件的完整路径进行匹配。Glob 是标准的 Unix 风格路径通配符（例如 Shell 中使用的那种），可用于匹配特定前缀、后缀、目录等的路径。在上述示例中，`{ glob = "Makefile" }` 配置会匹配名为 `Makefile` 的文件，`{ glob = ".git/config" }` 配置会匹配 `.git` 目录中的 `config` 文件，而 `{ glob = ".github/workflows/*.yaml" }` 配置会匹配 `.github/workflow` 目录中的任何 `yaml` 文件。请注意，即使在 Windows 系统上，glob 也应始终使用 Unix 路径分隔符 `/`；匹配器会自动考虑特定于机器的分隔符。如果 glob 不是绝对路径且尚未以 glob 前缀开头，则会自动添加 `*/` 以确保它匹配任何子目录。
2. 扩展名：如果没有 glob 匹配，则任何匹配给定文件扩展名的 `file-types` 字符串胜出。在上述示例中，`"toml"` 配置会匹配 `Cargo.toml` 或 `languages.toml` 等文件。

### 配置格式化命令

格式化命令的参数中支持[命令行展开](./command-line.md#expansions)。特别是，`%{buffer_name}` 变量可以作为参数传递给格式化程序：

```toml
formatter = { command = "mylang-formatter" , args = ["--stdin", "--stdin-filename", "%{buffer_name}"] }
```

### 配置保存时执行的代码操作

`code-actions-on-save` 键列出了在保存缓冲区时要执行的 LSP 代码操作（按顺序）。可用操作取决于已配置的语言服务器，以下是一些常见示例，可能需要根据你的设置进行调整。

```toml
# Python + ruff
[[language]]
name = "python"
code-actions-on-save = ["source.organizeImports", "source.fixAll"]

# TS/JS + tsserver
[[language]]
name = "typescript"
code-actions-on-save = ["source.addMissingImports.ts"]

# TS/JS + eslint
[[language]]
name = "javascript"
code-actions-on-save = ["source.fixAll.eslint", "source.organizeImports"]
```

## 语言服务器配置

语言服务器在与语言相同的文件 `languages.toml` 中的 `language-server` 表中单独配置。

例如：

```toml
[language-server.mylang-lsp]
command = "mylang-lsp"
args = ["--stdio"]
config = { provideFormatter = true }
environment = { "ENV1" = "value1", "ENV2" = "value2" }

[language-server.efm-lsp-prettier]
command = "efm-langserver"

[language-server.efm-lsp-prettier.config]
documentFormatting = true
languages = { typescript = [ { formatCommand ="prettier --stdin-filepath ${INPUT}", formatStdin = true } ] }
```

以下是语言服务器的可用选项。

| 键名                       | 描述                                                                                                                           |
| ----                       | -----------                                                                                                                   |
| `command`                  | 要执行的语言服务器二进制文件的名称或路径。二进制文件必须在 `$PATH` 中                                                         |
| `args`                     | 传递给语言服务器二进制文件的参数列表                                                                                           |
| `config`                   | 语言服务器初始化选项                                                                                                           |
| `timeout`                  | 对语言服务器请求的最大时间，以秒为单位。默认为 `20`                                                                            |
| `environment`              | 启动语言服务器时将使用的环境变量 `{ "KEY1" = "Value1", "KEY2" = "Value2" }`                                                    |
| `required-root-patterns`   | 在 LSP 工作目录中查找的 `glob` 模式列表。仅当找到至少一个匹配项时才启动语言服务器。                                             |

`config` 中的 `format` 子表可用于向[文档格式化请求](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_formatting)传递额外的格式化选项。例如，使用 typescript：

```toml
[language-server.typescript-language-server]
# pass format options according to https://github.com/typescript-language-server/typescript-language-server#workspacedidchangeconfiguration omitting the "[language].format." prefix.
config = { format = { "semicolons" = "insert", "insertSpaceBeforeFunctionParenthesis" = true } }
```

### 为语言配置语言服务器

语言中的 `language-servers` 属性告诉 Helix 该语言使用哪些语言服务器。

它们必须在 `[language-server]` 表中定义，如前一节所述。

不同的语言可以使用相同的语言服务器实例，例如 `typescript-language-server` 默认用于 javascript、jsx、tsx 和 typescript。

语言服务器的定义顺序会影响代码操作菜单结果列表中的顺序。

如果在 `language` 的 `language-servers` 属性中指定了多个语言服务器，通常只需要对这些语言服务器启用/禁用某些特定功能。

例如，上一示例中的 `efm-lsp-prettier` 仅用于格式化命令 `prettier`，因此其他所有功能应由 `typescript-language-server` 处理（默认已配置）。typescript 的语言配置可能如下所示：

```toml
[[language]]
name = "typescript"
language-servers = [ { name = "efm-lsp-prettier", only-features = [ "format" ] }, "typescript-language-server" ]
```

或者：

```toml
[[language]]
name = "typescript"
language-servers = [ { name = "typescript-language-server", except-features = [ "format" ] }, "efm-lsp-prettier" ]
```

每个请求的 LSP 功能按 `language-servers` 数组的顺序进行优先级排序。例如，第一个支持 `goto-definition` 的语言服务器（此处为 `typescript-language-server`）将被用于相关的 LSP 请求（命令 `goto_definition`）。`diagnostics`、`code-action`、`completion`、`document-symbols` 和 `workspace-symbols` 功能是该规则的例外，因为它们同时为所有语言服务器工作，并且如果为该语言启用，则会合并在一起。如果未指定 `except-features` 或 `only-features`，则语言服务器的所有功能均被启用。如果语言服务器本身不支持某个功能，则会尝试数组中的下一个语言服务器条目（以此类推）。

支持的功能列表：

- `format`
- `goto-declaration`
- `goto-definition`
- `goto-type-definition`
- `goto-reference`
- `goto-implementation`
- `signature-help`
- `hover`
- `document-highlight`
- `completion`
- `code-action`
- `document-links`
- `workspace-command`
- `document-symbols`
- `workspace-symbols`
- `diagnostics`
- `pull-diagnostics`
- `rename-symbol`
- `inlay-hints`
- `document-colors`
- `call-hierarchy`

## Tree-sitter 语法配置

语言的 tree-sitter 语法源在 `languages.toml` 的 `[[grammar]]` 部分中指定。例如：

```toml
[[grammar]]
name = "mylang"
source = { git = "https://github.com/example/mylang", rev = "a250c4582510ff34767ec3b7dcdd3c24e8c8aa68" }
```

语法配置包含以下键：

| 键名     | 描述                                                               |
| ---      | -----------                                                       |
| `name`   | tree-sitter 语法名称                                               |
| `source` | 获取语法的方式 - 一个具有如下定义模式的表                          |

当从 git 仓库使用语法时，`source` 是一个包含以下键的表：

| 键名       | 描述                                                           |
| ---        | -----------                                                   |
| `git`      | 应克隆语法的 git 远程 URL                                      |
| `rev`      | 应获取的修订版本（提交哈希或标签）                             |
| `subpath`  | 语法目录中应构建的子路径。某些语法仓库在子目录中托管多个语法（例如 `tree-sitter-typescript` 和 `tree-sitter-ocaml`）。此键用于指示 `hx --grammar build` 到正确的编译路径。省略时，使用仓库根目录 |

### 选择语法

你可以使用顶层 `use-grammars` 键来控制在使用 `hx --grammar fetch` 和 `hx --grammar build` 时获取和构建哪些语法。

```toml
# Note: this key must come **before** the [[language]] and [[grammar]] sections
use-grammars = { only = [ "rust", "c", "cpp" ] }
# or
use-grammars = { except = [ "yaml", "json" ] }
```

若省略，则会获取并构建所有语法。

[treesitter-language-injection]: https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html#language-injection