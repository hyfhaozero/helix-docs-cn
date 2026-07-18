## 编辑器

- [`[editor]` 部分](#editor-section)
- [`[editor.clipboard-provider]` 部分](#editorclipboard-provider-section)
- [`[editor.statusline]` 部分](#editorstatusline-section)
- [`[editor.lsp]` 部分](#editorlsp-section)
- [`[editor.cursor-shape]` 部分](#editorcursor-shape-section)
- [`[editor.file-picker]` 部分](#editorfile-picker-section)
- [`[editor.file-explorer]` 部分](#editorfile-explorer-section)
- [`[editor.buffer-picker]` 部分](#editorbuffer-picker-section)
- [`[editor.auto-pairs]` 部分](#editorauto-pairs-section)
- [`[editor.auto-save]` 部分](#editorauto-save-section)
- [`[editor.search]` 部分](#editorsearch-section)
- [`[editor.whitespace]` 部分](#editorwhitespace-section)
- [`[editor.indent-guides]` 部分](#editorindent-guides-section)
- [`[editor.gutters]` 部分](#editorgutters-section)
  - [`[editor.gutters.line-numbers]` 部分](#editorguttersline-numbers-section)
  - [`[editor.gutters.diagnostics]` 部分](#editorguttersdiagnostics-section)
  - [`[editor.gutters.diff]` 部分](#editorguttersdiff-section)
  - [`[editor.gutters.spacer]` 部分](#editorguttersspacer-section)
  - [`[editor.gutters.code-action-hint]` 部分](#editorgutterscode-action-hint-section)
- [`[editor.soft-wrap]` 部分](#editorsoft-wrap-section)
- [`[editor.smart-tab]` 部分](#editorsmart-tab-section)
- [`[editor.inline-diagnostics]` 部分](#editorinline-diagnostics-section)
- [`[editor.word-completion]` 部分](#editorword-completion-section)
- [`[editor.workspace-trust]` 部分](#editorworkspace-trust-section)

### `[editor]` 部分

| 键名 | 描述 | 默认值 |
|--|--|---------|
| `scrolloff` | 滚动时屏幕边缘的填充行数 | `5` |
| `mouse` | 启用鼠标模式 | `true` |
| `mouse-yank-register` | 鼠标复制使用的寄存器 | `*` |
| `middle-click-paste` | 支持鼠标中键粘贴 | `true` |
| `default-yank-register` | 复制/粘贴使用的默认寄存器 | `'"'` |
| `scroll-lines` | 每次滚动滚轮步进滚动的行数 | `3` |
| `shell` | 运行外部命令时使用的 Shell | Unix: `["sh", "-c"]`<br/>Windows: `["cmd", "/C"]` |
| `line-number` | 行号显示：`absolute` 简单显示每行编号，`relative` 显示与当前行的距离。未聚焦或插入模式下，`relative` 仍显示绝对行号 | `"absolute"` |
| `cursorline` | 高亮所有有光标的行 | `false` |
| `cursorcolumn` | 高亮所有有光标的列 | `false` |
| `continue-comments` | 在注释内创建新行时 Helix 是否自动添加行注释标记 | `true` |
| `gutters` | 要显示的行号区域：可用选项有 `diagnostics`、`diff`、`line-numbers`、`spacer` 和 `code-action-hint`，注意 `diagnostics` 还包括断点等其他功能，若行号区域非空则插入 1 像素宽度填充 | `["diagnostics", "spacer", "line-numbers", "spacer", "diff"]` |
| `auto-completion` | 启用自动补全弹窗 | `true` |
| `path-completion` | 启用文件路径补全。若光标处识别出已有路径（相对于当前打开的文档或当前工作目录的绝对或相对路径），则显示文件和目录。默认为 true。 | `true` |
| `auto-format` | 保存时启用自动格式化[^3] | `true` |
| `idle-timeout` | 上次按键后触发空闲计时器的毫秒数 | `250` |
| `completion-timeout` | 输入单词字符后显示补全的毫秒数，设为 5 表示即时 | `250` |
| `preview-completion-insert` | 选中补全项时是否立即应用 | `true` |
| `completion-trigger-len` | 触发自动补全的光标下单词最小长度 | `2` |
| `completion-replace` | 是否使补全始终替换整个单词而不仅仅是光标前的部分 | `false` |
| `auto-info` | 是否显示信息框 | `true` |
| `true-color` | 在误报情况下是否覆盖终端真彩色支持的自动检测 | `false` |
| `undercurl` | 在误报情况下是否覆盖终端下卷曲波浪线支持的自动检测 | `false` |
| `rulers` | 显示标尺的列位置列表。可在 `languages.toml` 文件中按语言单独覆盖 `rulers` | `[]` |
| `bufferline` | 在编辑器顶部渲染一行显示打开的缓冲区。可以是 `always`、`never` 或 `multiple`（仅当使用多个缓冲区时显示） | `"never"` |
| `color-modes` | 是否根据模式本身用不同颜色着色模式指示器 | `false` |
| `text-width` | 最大行长度。用于 `:reflow` 命令和软换行（若设置了 `soft-wrap.wrap-at-text-width`） | `80` |
| `workspace-lsp-roots` | 相对于工作区根目录被视为 LSP 根目录的目录。应仅在 `.helix/config.toml` 中设置 | `[]` |
| `default-line-ending` | 新文档使用的换行符。可以是 `native`、`lf`、`crlf`、`ff`、`cr` 或 `nel`。`native` 使用平台的原生换行符（Windows 上为 `crlf`，否则为 `lf`）。 | `"native"` |
| `insert-final-newline` | 写入时若缺少尾随换行符是否自动插入 | `true` |
| `atomic-save` | 是否使用原子操作将文档写入磁盘。这可以防止在写入文件时编辑器被中断而导致数据丢失，但可能会混淆某些文件监视/热重载程序。 | `true` |
| `trim-final-newlines` | 写入时是否自动删除最后一个换行符之后的换行符 | `false` |
| `trim-trailing-whitespace` | 写入时是否自动删除行尾前的空白字符 | `false` |
| `popup-border` | 为 `popup`、`menu`、`all` 或 `none` 绘制边框 | `"none"` |
| `indent-heuristic` | 计算新插入行缩进的方式：`simple` 仅复制前一行的缩进级别，`tree-sitter` 基于语法树计算缩进，`hybrid` 结合两种方法。若所选启发式方法不可用，将使用其他方法作为备选（备选顺序为 `hybrid` -> `tree-sitter` -> `simple`）。 | `"hybrid"` |
| `jump-label-alphabet` | 用于生成双字符跳转标签的字符。优先使用字母表开头的字符。 | `"abcdefghijklmnopqrstuvwxyz"` |
| `end-of-line-diagnostics` | 行尾渲染诊断的最低严重级别。设为 `disable` 完全禁用。更多详情请参阅 `inline-diagnostics` 设置 | `"hint"` |
| `clipboard-provider` | 用于剪贴板交互的 API。可以是 `pasteboard`（MacOS）、`wayland`、`x-clip`、`x-sel`、`win32-yank`、`termux`、`tmux`、`windows`、`termcode`、`none` 或自定义命令集。 | 平台和环境特定。 |
| `editor-config` | 是否从 [EditorConfig](https://editorconfig.org) 文件读取设置 | `true` |
| `rainbow-brackets` | 是否为匹配括号渲染彩虹颜色。需要语言的 tree-sitter `rainbows.scm` 查询。 | `false` |
| `kitty-keyboard-protocol` | 是否启用 Kitty 键盘协议。可以是 `enabled`、`disabled` 或 `auto` | `"auto"` |

[^3]: 在大多数情况下，你还需在 `languages.toml` 中启用 `auto-format` 设置。原因请参见[此处](https://github.com/helix-editor/helix/discussions/9043#discussioncomment-7811497)。

### `[editor.clipboard-provider]` 部分

Helix 可配置为使用内置剪贴板配置或使用提供的命令。

例如，将其设置为使用 OSC 52 终端代码，配置如下：
```toml
[editor]
clipboard-provider = "termcode"
```

或者，Helix 也可以配置为使用任意命令进行剪贴板集成：

```toml
[editor.clipboard-provider.custom]
yank = { command = "cat",  args = ["test.txt"] }
paste = { command = "tee",  args = ["test.txt"] }
primary-yank = { command = "cat",  args = ["test-primary.txt"] } # optional
primary-paste = { command = "tee",  args = ["test-primary.txt"] } # optional
```

对于自定义命令，复制/粘贴的内容通过标准输入/标准输出进行通信。

### `[editor.statusline]` 部分

允许配置编辑器底部的状态栏。

该配置区分状态栏的三个区域：

`[ ... ... 左 ... ... | ... ... ... 中 ... ... ... | ... ... 右 ... ... ]`

状态栏元素可以按如下方式定义：

```toml
[editor.statusline]
left = ["mode", "spinner"]
center = ["file-name"]
right = ["diagnostics", "selections", "position", "file-encoding", "file-line-ending", "file-type"]
separator = "│"
mode.normal = "NORMAL"
mode.insert = "INSERT"
mode.select = "SELECT"
diagnostics = ["warning", "error"]
workspace-diagnostics = ["warning", "error"]
```
### `[editor.statusline]` 部分（续）

`[editor.statusline]` 键接受以下子键：

| 键名           | 描述 | 默认值 |
| ---           | ---         | ---     |
| `left`        | 左对齐的状态栏元素列表 | `["mode", "spinner", "file-name", "read-only-indicator", "file-modification-indicator"]` |
| `center`      | 居中的状态栏元素列表 | `[]` |
| `right`       | 右对齐的状态栏元素列表 | `["diagnostics", "selections", "register", "position", "file-encoding"]` |
| `separator`   | 用于分隔状态栏元素的字符 | `"│"` |
| `mode.normal` | 普通模式下 `mode` 元素显示的文本 | `"NOR"` |
| `mode.insert` | 插入模式下 `mode` 元素显示的文本 | `"INS"` |
| `mode.select` | 选择模式下 `mode` 元素显示的文本 | `"SEL"` |
| `diagnostics` | 当前缓冲区显示的诊断严重级别列表 | `["warning", "error"]` |
| `workspace-diagnostics` | 工作区显示的诊断严重级别列表 | `["warning", "error"]` |

可配置的状态栏元素：

| 键名    | 描述 |
| ------ | ----------- |
| `mode` | 当前编辑器模式（`mode.normal`/`mode.insert`/`mode.select`） |
| `spinner` | 表示 LSP 活动状态的进度旋转器 |
| `file-name` | 打开文件的路径/名称 |
| `file-absolute-path` | 打开文件的绝对路径/名称 |
| `file-base-name` | 打开文件的基本名称 |
| `current-working-directory` | 当前工作目录 |
| `file-modification-indicator` | 显示文件是否已修改的指示器（有未保存更改时显示 `[+]`） |
| `file-encoding` | 打开文件的编码（若非 UTF-8） |
| `file-line-ending` | 文件的换行符（CRLF 或 LF） |
| `file-indent-style` | 文件的缩进样式 |
| `read-only-indicator` | 当文件无法写入时显示 `[readonly]` 的指示器 |
| `total-line-numbers` | 打开文件的总行数 |
| `file-type` | 打开文件的类型 |
| `diagnostics` | 警告和/或错误的数量 |
| `workspace-diagnostics` | 工作区中警告和/或错误的数量 |
| `selections` | 当前活动选区中的主选区索引 |
| `primary-selection-length` | 当前主选区中的字符数 |
| `position` | 光标位置 |
| `position-percentage` | 光标位置占总行数的百分比 |
| `separator` | `editor.statusline.separator` 中定义的字符串（默认为 `"│"`） |
| `spacer` | 在元素之间插入空格（可指定多个/连续的空格） |
| `version-control` | 打开的工作区的当前分支名称或分离的提交哈希 |
| `register` | 当前选中的寄存器 |
| `code-action-hint` | 有可用代码操作时的指示器 |

### `[editor.lsp]` 部分

| 键名                   | 描述                                                 | 默认值 |
| ---                   | -----------                                                 | ------- |
| `enable`              | 启用 LSP 集成。设为 `false` 将完全禁用语言服务器，无论语言设置如何。 | `true` |
| `display-messages`    | 在状态栏下方显示 LSP `window/showMessage` 消息[^1] | `true` |
| `display-progress-messages` | 在状态栏下方显示 LSP 进度消息[^1]    | `false` |
| `auto-signature-help` | 启用签名帮助（参数提示）的自动弹出 | `true`  |
| `auto-document-highlight` | 自动高亮光标处的符号引用 | `false` |
| `display-inlay-hints` | 显示内联提示[^2] | `false` |
| `inlay-hints-length-limit` | 内联提示的最大显示长度（非零数字） | 默认未设置 |
| `display-color-swatches` | 在颜色旁显示色板 | `true` |
| `display-signature-help-docs` | 在签名帮助弹出窗口下显示文档 | `true`  |
| `snippets`      | 启用代码片段补全。需要在 `:config-reload`/`:set` 后重启服务器（`:lsp-restart`）才能生效。 | `true`  |
| `goto-reference-include-declaration` | 在转到引用弹出窗口中包含声明。 | `true`  |

[^1]: 默认情况下，状态栏中文件路径旁会显示一个进度旋转器。

[^2]: 你可能还需要在语言服务器配置中激活它们才能显示，而不仅仅是在 Helix 中。Helix 中的内联提示仍在改进中，在某些情况下可能会略显迟缓或不稳定。如果你发现任何错误，请报告以便我们修复！

### `[editor.cursor-shape]` 部分

定义每种模式下光标的形状。
这些选项的有效值为 `block`、`bar`、`underline` 或 `hidden`。

> 💡 由于终端环境的限制，只有主光标可以改变形状。

| 键名      | 描述                                | 默认值   |
| ---      | -----------                                | -------   |
| `normal` | [普通模式][normal mode]下的光标形状 | `"block"` |
| `insert` | [插入模式][insert mode]下的光标形状 | `"block"` |
| `select` | [选择模式][select mode]下的光标形状 | `"block"` |

[normal mode]: ./keymap.md#normal-mode
[insert mode]: ./keymap.md#insert-mode
[select mode]: ./keymap.md#select--extend-mode

### `[editor.file-picker]` 部分

设置文件选择器和全局搜索的选项。忽略文件意味着它在 Helix 文件选择器和全局搜索中不可见。

所有与 git 相关的选项仅在 git 仓库中启用。

| 键名 | 描述 | 默认值 |
|--|--|---------|
| `hidden` | 启用忽略隐藏文件 | `true` |
| `follow-symlinks` | 跟随符号链接而非忽略它们 | `true` |
| `deduplicate-links` | 忽略指向已显示在选择器中的文件的符号链接 | `true` |
| `parents` | 启用从父目录读取忽略文件 | `true` |
| `ignore` | 启用读取 `.ignore` 文件 | `true` |
| `git-ignore` | 启用读取 `.gitignore` 文件 | `true` |
| `git-global` | 启用读取全局 `.gitignore`，其路径在 git 配置的 `core.excludesfile` 选项中指定 | `true` |
| `git-exclude` | 启用读取 `.git/info/exclude` 文件 | `true` |
| `max-depth` | 设置一个整数值作为递归的最大深度 | 默认未设置 |

忽略文件可以本地放置为 `.ignore`，或放在主目录中作为 `~/.ignore`。它们支持 `.gitignore` 文件中常用的忽略和否定忽略（取消忽略）规则。

此外，你可以通过在当前工作区中创建本地 `.helix/ignore` 文件，或在 Helix 配置目录中创建全局 `ignore` 文件来使用 Helix 特定的忽略文件：
- Linux 和 Mac：`~/.config/helix/ignore`
- Windows：`%AppData%\helix\ignore`

示例：

```ini
# 在文件选择器和全局搜索中取消忽略
!.github/
!.gitignore
!.gitattributes
```

### `[editor.file-explorer]` 部分

除了文件选择器和全局搜索的选项外，还提供了一组类似的选项来单独配置文件浏览器。但与文件选择器不同，其默认值设置为避免忽略大多数文件。

请注意，当 `ignore` 设置为 `true` 时，文件浏览器参考的忽略文件与文件选择器使用的相同，包括前面提到的 Helix 特定忽略文件。

| 键名 | 描述 | 默认值 |
|--|--|---------|
| `hidden` | 启用忽略隐藏文件 | `false` |
| `follow-symlinks` | 跟随符号链接而非忽略它们 | `false` |
| `parents` | 启用从父目录读取忽略文件 | `false` |
| `ignore` | 启用读取 `.ignore` 文件 | `false` |
| `git-ignore` | 启用读取 `.gitignore` 文件 | `false` |
| `git-global` | 启用读取全局 `.gitignore`，其路径在 git 配置的 `core.excludesfile` 选项中指定 | `false` |
| `git-exclude` | 启用读取 `.git/info/exclude` 文件 | `false` |
| `flatten-dirs` | 启用展平单子目录 | `true` |

### `[editor.buffer-picker]` 部分

设置缓冲区选择器的选项。

| 键名 | 描述 | 默认值 |
|--|--|---------|
| `start-position` | 控制初始选中缓冲区的行为 | `current` |

示例：

```toml
[editor.buffer-picker]
start-position = "previous"
```

### `[editor.auto-pairs]` 部分

启用自动插入括号、方括号等成对符号。可以是一个简单的布尔值，也可以是单字符对的具体映射。

要完全禁用自动配对，请将 `auto-pairs` 设置为 `false`：
```toml
[editor]
auto-pairs = false # 默认值为 `true`
```

默认配对为 <code>(){}[]''""``</code>，但可以通过将 `auto-pairs` 设置为 TOML 表来定制：

```toml
[editor.auto-pairs]
'(' = ')'
'{' = '}'
'[' = ']'
'"' = '"'
'`' = '`'
'<' = '>'
```

此外，此设置可在语言配置中使用。除非编辑器设置为 `false`，否则在具有该语言的文档中会覆盖编辑器配置。

以下 `languages.toml` 示例添加了 `<>` 并移除了 `''`：

```toml
[[language]]
name = "rust"

[language.auto-pairs]
'(' = ')'
'{' = '}'
'[' = ']'
'"' = '"'
'`' = '`'
'<' = '>'
```

### `[editor.auto-save]` 部分

控制自动保存行为。

| 键名 | 描述 | 默认值 |
|--|--|---------|
| `focus-lost` | 当焦点离开 Helix 时启用自动保存。需要终端支持[焦点事件](https://github.com/helix-editor/helix/wiki/Terminal-Support) | `false` |
| `after-delay.enable` | 在最后一次编辑后经过 `auto-save.after-delay.timeout` 毫秒后启用自动保存。 | `false` |
| `after-delay.timeout` | 自动保存计时器触发前距离上次编辑的毫秒数。 | `3000` |

### `[editor.search]` 部分

搜索特定选项。

| 键名 | 描述 | 默认值 |
|--|--|---------|
| `smart-case` | 启用智能大小写正则搜索（除非模式包含大写字符，否则不区分大小写） | `true` |
| `wrap-around`| 搜索匹配项用尽后是否应循环 | `true` |

### `[editor.whitespace]` 部分

使用可见字符渲染空白字符的选项。使用 `:set whitespace.render all` 可临时启用可见空白字符。

| 键名 | 描述 | 默认值 |
|-----|-------------|---------|
| `render` | 是否渲染空白字符。可以是 `all` 或 `none`，也可以是包含子键 `space`、`nbsp`、`nnbsp`、`tab` 和 `newline` 的表 | `"none"` |
| `characters` | 渲染空白字符时使用的字面字符。子键可以是 `tab`、`space`、`nbsp`、`nnbsp`、`newline` 或 `tabpad` | 参见下面的示例 |

示例：

```toml
[editor.whitespace]
render = "all"
# or control each character
[editor.whitespace.render]
space = "all"
tab = "all"
nbsp = "none"
nnbsp = "none"
newline = "none"

[editor.whitespace.characters]
space = "·"
nbsp = "⍽"
nnbsp = "␣"
tab = "→"
newline = "⏎"
tabpad = "·" # 制表符将显示为 "→···"（取决于制表符宽度）
```

### `[editor.indent-guides]` 部分

用于渲染垂直缩进引导线的选项。

| 键名          | 描述                             | 默认值 |
| ---           | ---                             | ---    |
| `render`      | 是否渲染缩进引导线               | `false`|
| `character`   | 用于渲染缩进引导线的字面字符     | `"│"`  |
| `skip-levels` | 要跳过的缩进级别数               | `0`    |

示例：

```toml
[editor.indent-guides]
render = true
character = "╎" # 一些效果不错的字符："▏"、"┆"、"┊"、"⸽"
skip-levels = 1
```

### `[editor.gutters]` 部分

为简化起见，`editor.gutters` 接受一个行号区域类型的数组，该数组将对所有行号区域组件使用默认设置。

```toml
[editor]
gutters = ["diff", "diagnostics", "line-numbers", "spacer"]
```

要自定义行号区域的行为，必须使用 `[editor.gutters]` 部分。该部分包含顶层设置以及特定行号区域组件作为子部分的设置。

| 键名     | 描述                    | 默认值                                                           |
| ---      | ---                    | ---                                                             |
| `layout` | 要显示的行号区域向量    | `["diagnostics", "spacer", "line-numbers", "spacer", "diff"]`   |

示例：

```toml
[editor.gutters]
layout = ["diff", "diagnostics", "line-numbers", "spacer"]
```

#### `[editor.gutters.line-numbers]` 部分

行号区域的选项

| 键名        | 描述                     | 默认值 |
| ---         | ---                     | ---    |
| `min-width` | 使用的最小字符数          | `3`    |

示例：

```toml
[editor.gutters.line-numbers]
min-width = 1
```

#### `[editor.gutters.diagnostics]` 部分

目前未使用

#### `[editor.gutters.diff]` 部分

`diff` 行号区域选项显示彩色条，指示 `git` 差异表示某行是新增、删除还是修改。
这些颜色由主题属性 `diff.plus`、`diff.minus` 和 `diff.delta` 控制。

其他差异提供程序最终将通过未来的插件系统得到支持。

此部分目前没有选项。

#### `[editor.gutters.spacer]` 部分

目前未使用

#### `[editor.gutters.code-action-hint]` 部分

`code-action-hint` 行号区域选项显示指示当前选区是否有可用代码操作的指示器。

此部分目前没有选项。

### `[editor.soft-wrap]` 部分

用于超出视图宽度的行软换行的选项：

| 键名                 | 描述                                                  | 默认值 |
| ---                  | ---                                                  | ---     |
| `enable`             | 是否启用软换行。                            | `false` |
| `max-wrap`           | 行尾保留的最大可用空间。              | `20`    |
| `max-indent-retain`  | 软换行时保留的最大缩进量。 | `40`    |
| `wrap-indicator`     | 软换行前插入的文本，使用 `ui.virtual.wrap` 高亮 | `"↪ "`    |
| `wrap-at-text-width` | 在 `text-width` 处软换行，而不是使用完整的视口大小。 | `false` |

示例：

```toml
[editor.soft-wrap]
enable = true
max-wrap = 25 # 增大该值以减少强制在单词中间换行
max-indent-retain = 0
wrap-indicator = ""  # 将 wrap-indicator 设置为 "" 以隐藏它
```

### `[editor.smart-tab]` 部分

用于使用 Tab 键导航和编辑的选项。

| 键名              | 描述                                                                                                                                                                                                                                                                                                                       | 默认值  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enable`          | 若设为 `true`，则当光标左侧有非空白字符时，按 Tab 不会插入制表符，而是执行 `move_parent_node_end` 命令。若左侧仅有空白字符，则正常插入制表符。使用默认绑定时，若要显式插入制表符，请按 Shift-Tab。                                                                                                                         | `true`  |
| `supersede-menu`  | 通常，当屏幕上有菜单时（例如触发了自动补全），Tab 键被绑定为在菜单项间循环。这意味着当菜单显示时，无法使用 Tab 键触发 `smart-tab` 命令。若将此选项设为 `true`，则 `smart-tab` 命令始终优先，这意味着无法使用 Tab 键在菜单项间循环，而必须使用其他绑定，例如方向键或 `C-n`/`C-p`。 | `false` |

由于某些终端对 S-Tab 的支持有限，默认键绑定并未完全实现智能 Tab 的编辑体验。如果你喜欢智能 Tab 导航，并且使用的终端支持[增强键盘协议](https://github.com/helix-editor/helix/wiki/Terminal-Support#enhanced-keyboard-protocol)，可以考虑设置额外的键绑定。

```toml
[keys.normal]
tab = "move_parent_node_end"
S-tab = "move_parent_node_start"

[keys.insert]
S-tab = "move_parent_node_start"

[keys.select]
tab = "extend_parent_node_end"
S-tab = "extend_parent_node_start"
```

### `[editor.inline-diagnostics]` 部分

用于在文本中渲染诊断（如下所示）的选项。

```text
fn main() {
  let foo = bar;
            └─ 此作用域中不存在该值
}
```

| 键名              | 描述                                                                                                                             | 默认值      |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------|
| `cursor-line`     | 诊断必须具有的最低严重级别，才能在包含主光标的行内联显示。设置为 `disable` 则不显示任何内联诊断。此选项在插入模式下无效，仅在光标移动到不同行后 350ms 生效。 | `"warning"` |
| `other-lines`     | 诊断必须具有的最低严重级别，才能在非光标所在行内联显示。设置为 `disable` 则不显示任何内联诊断。                               | `"disable"` |
| `prefix-len`      | 诊断文本前渲染的水平横线 `─` 的数量。                                                                                           | `1`         |
| `max-wrap`        | 相当于诊断的 `editor.soft-wrap.max-wrap` 选项。                                                                                  | `20`        |
| `max-diagnostics` | 给定行内联显示的最大诊断数量。                                                                                                  | `10`        |

`cursor-line` 和 `other-lines` 允许的值为：`error`、`warning`、`info`、`hint`。

未内联显示的最高严重级别的（第一个）诊断会呈现在行尾（只要其严重级别高于 `end-of-line-diagnostics` 配置选项）：

```text
fn main() {
  let baz = 1;
  let foo = bar; 存在名称相似的局部变量：baz
            └─ 此作用域中不存在该值
}
```

### `[editor.word-completion]` 部分

控制从打开的缓冲区中补全单词的选项。

| 键名             | 描述                                       | 默认值   |
|------------------|--------------------------------------------|----------|
| `enable`         | 是否启用单词补全                           | `true`   |
| `trigger-length` | 触发补全前需要键入的单词字符数             | `7`      |

示例：

```toml
[editor.word-completion]
enable = true
# 降低触发长度，使单词补全更频繁出现
trigger-length = 4
```

### `[editor.workspace-trust]` 部分

控制隐式工作区信任。完整功能请参见[工作区信任](./workspace-trust.md)章节。

| 键名      | 描述                                                                 | 默认值      |
|-----------|----------------------------------------------------------------------|-------------|
| `level`   | 每个工作区的默认信任级别。                                           | `"servers"` |
| `prompt`  | 在不受信任的工作区中打开文件时是否显示模态提示。                       | `true`      |
| `trusted` | 通配符模式，匹配的工作区无需授予即可被信任。                         | `[]`        |

Example:

```toml
[editor.workspace-trust]
# 即使为 `false`，状态栏中的 `[⚠]` 指示器仍然会显示。
prompt = false

# "none":     对每个工作区都进行提示。
# "servers":  信任 LSP 和 DAP 启动，但仍然限制本地配置和 git；
#             .helix/config.toml、.helix/languages.toml 等需要 :workspace-trust。
# "insecure": 信任所有内容（不推荐）。
level = "servers"

# 不推荐：跳过 .helix/ 变更检测，并信任匹配路径下的所有内容。
# `~` 和环境变量会被展开。
trusted = ["~/src/github.com/me/*"]
```
