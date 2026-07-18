## 主题

要使用主题，请将 `theme = "<name>"` 添加到你的 [`config.toml`](./configuration.md) 文件顶部，或在运行时使用 `:theme <name>` 选择主题。

可以为深色和浅色模式分别配置不同的主题。在支持 [mode 2031 深色/浅色检测](https://github.com/contour-terminal/contour/blob/master/docs/vt-extensions/color-palette-update-notifications.md) 的终端上，主题模式会从终端自动检测。

```toml
[theme]
dark = "catppuccin_frappe"
light = "catppuccin_latte"
## Optional. Used if the terminal doesn't declare a preference.
## Defaults to the theme set for `dark` if not specified.
# fallback = "catppuccin_frappe"
```

## 创建主题

创建一个以主题名称为文件名（即 `mytheme.toml`）的文件，并将其放入 `themes` 目录（即 Linux 上的 `~/.config/helix/themes` 或 Windows 上的 `%AppData%\helix\themes`）。该目录可能需要事先创建。

> 💡 名称 "default" 和 "base16_default" 为内置主题保留，不能被用户定义的主题覆盖。

### 概述

主题文件中的每一行按如下方式指定：

```toml
key = { fg = "#ffffff", bg = "#000000", underline = { color = "#ff0000", style = "curl"}, modifiers = ["bold", "italic"] }
```

其中 `key` 表示你想要设置样式的对象，`fg` 指定前景色，`bg` 指定背景色，`underline` 指定下划线的 `style`/`color`，`modifiers` 是样式修饰符列表。`bg`、`underline` 和 `modifiers` 可以省略以使用默认值。

仅指定前景色：

```toml
# Valid hex-color format is `#RGB` or `#RRGGBB`
# (each letter is a nibble)
key = "#ffffff"
```

如果键包含点 `'.'`，则必须用引号括起来，以防止被解析为 [dotted key](https://toml.io/en/v1.0.0#keys)。

```toml
"key.key" = "#fff"
```

颜色值必须是 [CSS 十六进制 RGB 字符串](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/hex-color) 或在 [`palette`](#color-palettes) 中声明的名称。

> 💡 请注意，Helix 不支持透明度（alpha 通道）。

如需灵感，可以在这里找到默认的 `theme.toml` [here](https://github.com/helix-editor/helix/blob/master/theme.toml) 和用户提交的主题 [here](https://github.com/helix-editor/helix/blob/master/runtime/themes)。


## 主题创建的细节

### 颜色调色板

建议定义一个命名颜色的调色板，并在主题的配置值中引用它们。为此，请在主题文件中添加一个名为 `palette` 的表：

```toml
"ui.background" = "white"
"ui.text" = "black"

[palette]
white = "#ffffff"
black = "#000000"
```

请记住，`[palette]` 表包含其标题之后的所有键，因此它应在常规主题选项之后定义。

默认调色板使用终端的默认 16 色，颜色名称如下所列。配置文件中的 `[palette]` 部分优先于默认调色板，并与其合并。

| 颜色名称        |
| ---             |
| `default`       |
| `black`         |
| `red`           |
| `green`         |
| `yellow`        |
| `blue`          |
| `magenta`       |
| `cyan`          |
| `gray`          |
| `light-red`     |
| `light-green`   |
| `light-yellow`  |
| `light-blue`    |
| `light-magenta` |
| `light-cyan`    |
| `light-gray`    |
| `white`         |

### 修饰符

以下值可用作修饰符，前提是你的终端模拟器支持它们。

| 修饰符              |
| ---                  |
| `bold`               |
| `dim`                |
| `italic`             |
| `underlined`         |
| `slow_blink`         |
| `rapid_blink`        |
| `reversed`           |
| `hidden`             |
| `crossed_out`        |

> 💡 `underlined` 修饰符已弃用，仅保留用于向后兼容。
> 其行为等同于设置 `underline.style="line"`。

### 下划线样式

以下值之一可用作 `underline.style` 的值，前提是你的终端模拟器支持。

| 修饰符        |
| ---            |
| `line`         |
| `curl`         |
| `dashed`       |
| `dotted`       |
| `double_line`  |


### 继承

通过将 `inherits` 属性设置为现有主题来扩展其他主题。

```toml
inherits = "boo_berry"

# Override the theming for "keyword"s:
"keyword" = { fg = "gold" }

# Override colors in the palette:
[palette]
berry = "#2A2A4D"
```

### 彩虹

`rainbow` 键用于匹配括号的彩虹高亮。该键是一个样式列表。

```toml
rainbow = ["#ff0000", "#ffa500", "#fff000", { fg = "#00ff00", modifiers = ["bold"] }]
```

可以使用调色板中的颜色和修饰符。

### 作用域

以下是可用于样式设置的作用域列表：

#### 语法高亮

这些键与 [tree-sitter 作用域](https://tree-sitter.github.io/tree-sitter/3-syntax-highlighting.html#highlights) 匹配。

在为高亮确定样式时，将使用最长的匹配主题键。例如，如果高亮是 `function.builtin.static`，将使用 `function.builtin` 键而不是 `function`。

此列表也是 `highlights.scm` 查询中使用的捕获名称（`@function`、`@type` 等）的参考——请参阅 [添加语言](./guides/adding_languages.md)。当多个捕获覆盖同一文本时，文件中 **最后** 匹配的模式获胜；当它们位于嵌套节点上时，**最内层** 节点获胜，无论顺序如何，因此捕获你指代的叶子节点（将 `@function` 放在被调用的标识符上，而不是包裹它的节点上）。方法调用是 `@function.method`；不带调用的字段访问是 `@variable.other.member`。

我们使用与 [Sublime Text](https://www.sublimetext.com/docs/scope_naming.html) 类似的作用域集。另请参阅 [TextMate](https://macromates.com/manual/en/language_grammars) 作用域。

- `attribute` - 类属性、HTML 标签属性

- `type` - 类型
  - `builtin` - 语言提供的基本类型（`int`、`usize`）
  - `parameter` - 泛型类型参数（`T`）
  - `enum`
    - `variant` - 枚举变体
- `constructor` - 构造函数、结构体/记录字面量、值位置上的类型名称

- `constant`（TODO: constant.other.placeholder 用于 `%v`）
  - `builtin` - 语言提供的特殊常量（`true`、`false`、`nil` 等）
    - `boolean`
  - `character`
    - `escape`
  - `numeric`（数字）
    - `integer`
    - `float`

- `string`（TODO: string.quoted.{single, double}, string.raw/.unquoted）？
  - `regexp` - 正则表达式
  - `special`
    - `path`
    - `url`
    - `symbol` - Erlang/Elixir 原子、Ruby 符号、Clojure 关键字

- `comment` - 代码注释
  - `line` - 单行注释（`//`）
    - `documentation` - 行文档注释（例如 Rust 中的 `///`）
  - `block` - 块注释（例如 `/* */`）
    - `documentation` - 块文档注释（例如 Rust 中的 `/** */`）
  - `unused` - 未使用的变量和模式，例如 `_` 和 `_foo`

- `variable` - 变量
  - `mutable` - 可变变量（例如 Rust 中用 `mut` 标记的）
  - `builtin` - 保留语言变量（`self`、`this`、`super` 等）
    - `mutable` - 可变语言变量（例如 Rust 中的 `mut self`）
  - `parameter` - 函数参数
    - `mutable` - 可变函数参数（例如 Rust 中用 `mut` 标记的）
  - `other`
    - `member` - 复合数据类型（例如结构体、联合体）的字段
      - `private` - 使用独特语法的私有字段（目前仅为基于 ECMAScript 的语言）

- `label` - CSS 中的 `.class`、`#id` 等

- `punctuation`
  - `delimiter` - 逗号、冒号
  - `bracket` - 括号、尖括号等
  - `special` - 字符串插值括号

- `keyword`
  - `control`
    - `conditional` - `if`、`else`
    - `repeat` - `for`、`while`、`loop`
    - `import` - `import`、`export`
    - `return`
    - `exception`
  - `operator` - `or`、`in`
  - `directive` - 预处理指令（C 中的 `#if`）
  - `function` - `fn`、`func`
  - `storage` - 描述事物存储方式的关键字
    - `type` - 事物的类型，`class`、`function`、`var`、`let` 等
    - `modifier` - 存储修饰符，如 `static`、`mut`、`const`、`ref` 等

- `operator` - `||`、`+=`、`>`

- `function` - 函数定义和调用
  - `builtin` - 语言内置函数
  - `method` - 方法定义和调用（`obj.method()`）
    - `private` - 使用独特语法的私有方法（目前仅为基于 ECMAScript 的语言）
  - `macro` - 宏调用（例如 Rust 中的 `println!`）
  - `special`（C 中的预处理）

- `tag` - 标签（例如 HTML 中的 `<body>`）
  - `builtin`

- `namespace` - 模块和命名空间（例如 `std::collections`、包名）

- `special` - Rust 中的 `derive`、选择器中加粗的查询匹配（包括文件浏览器）等
另请参阅 [#2380]

- `markup`
  - `heading`
    - `marker`
    - `1`、`2`、`3`、`4`、`5`、`6` - h1 到 h6 的标题文本
  - `list`
    - `unnumbered` - 无序列表
    - `numbered` - 有序列表
    - `checked` - 已勾选任务列表
    - `unchecked` - 未勾选任务列表
  - `bold` - 粗体
  - `italic` - 斜体
  - `strikethrough` - 删除线
  - `link`
    - `url` - 链接指向的 URL
    - `label` - 非 URL 链接引用
    - `text` - 链接中的 URL 和图像描述
  - `quote` - 引用
  - `raw`
    - `inline` - 内联原始文本
    - `block` - 块级原始文本

- `diff` - 版本控制变更
  - `plus` - 新增
    - `gutter` - 行号区域指示器
  - `minus` - 删除
    - `gutter` - 行号区域指示器
  - `delta` - 修改
    - `moved` - 重命名或移动的文件/更改
    - `conflict` - 合并冲突
    - `gutter` - 行号区域指示器

- `embedded` - 嵌入在字符串模板中的插值表达式（`${…}`）

#### 界面

这些作用域用于编辑器界面的主题样式：

- `markup`
  - `normal`
    - `completion` - 用于补全文档弹出 UI
    - `hover` - 用于悬停弹出 UI
  - `heading`
    - `completion` - 用于补全文档弹出 UI
    - `hover` - 用于悬停弹出 UI
  - `raw`
    - `inline`
      - `completion` - 用于补全文档弹出 UI
      - `hover` - 用于悬停弹出 UI


| 键                                | 说明                                                                                          |
| ---                               | ---                                                                                           |
| `ui.background`                   |                                                                                               |
| `ui.background.separator`         | 选择器输入行下方的分隔线                                                                       |
| `ui.cursor`                       |                                                                                               |
| `ui.cursor.normal`                |                                                                                               |
| `ui.cursor.insert`                |                                                                                               |
| `ui.cursor.select`                |                                                                                               |
| `ui.cursor.match`                 | 匹配的括号等                                                                                  |
| `ui.cursor.primary`               | 主选区的光标                                                                                  |
| `ui.cursor.primary.normal`        |                                                                                               |
| `ui.cursor.primary.insert`        |                                                                                               |
| `ui.cursor.primary.select`        |                                                                                               |
| `ui.debug.breakpoint`             | 断点指示器，位于行号区域                                                                       |
| `ui.debug.active`                 | 调试执行暂停所在行的指示器，位于行号区域                                                        |
| `ui.gutter`                       | 行号区域                                                                                      |
| `ui.gutter.selected`              | 光标所在行的行号区域                                                                           |
| `ui.linenr`                       | 行号                                                                                          |
| `ui.linenr.selected`              | 光标所在行的行号                                                                               |
| `ui.statusline`                   | 状态栏                                                                                        |
| `ui.statusline.inactive`          | 状态栏（未聚焦文档）                                                                          |
| `ui.statusline.normal`            | 普通模式下的状态栏模式（[仅当 `editor.color-modes` 启用时][editor-section]）                   |
| `ui.statusline.insert`            | 插入模式下的状态栏模式（[仅当 `editor.color-modes` 启用时][editor-section]）                   |
| `ui.statusline.select`            | 选择模式下的状态栏模式（[仅当 `editor.color-modes` 启用时][editor-section]）                   |
| `ui.statusline.separator`         | 状态栏中的分隔符                                                                               |
| `ui.bufferline`                   | 缓冲区栏样式                                                                                  |
| `ui.bufferline.active`            | 缓冲区栏中活动缓冲区的样式                                                                     |
| `ui.bufferline.background`        | 缓冲区栏背景样式                                                                               |
| `ui.popup`                        | 文档弹出窗口（例如 Space + k）                                                                |
| `ui.popup.info`                   | 多个按键选项的提示                                                                             |
| `ui.picker.header`                | 多列选择器中的标题行区域                                                                       |
| `ui.picker.header.column`         | 多列选择器中的列名                                                                             |
| `ui.picker.header.column.active`  | 多列选择器中光标当前进入的列名                                                                 |
| `ui.window`                       | 分割窗口的边框线                                                                               |
| `ui.help`                         | 命令的描述框                                                                                   |
| `ui.text`                         | 默认文本样式，命令提示、弹出文本等                                                              |
| `ui.text.focus`                   | 选择器中当前选中的行                                                                           |
| `ui.text.inactive`                | 与 `ui.text` 相同，但用于非活动文本（例如建议）                                                |
| `ui.text.info`                    | `ui.popup.info` 框中的键：命令文本                                                            |
| `ui.text.directory`               | 提示补全中的目录名                                                                             |
| `ui.text.symlink`                 | 提示补全中的符号链接名                                                                         |
| `ui.virtual.ruler`                | 标尺列（参见 [`editor.rulers` 配置][editor-section]）                                          |
| `ui.virtual.whitespace`           | 可见的空白字符                                                                                 |
| `ui.virtual.indent-guide`         | 垂直缩进宽度引导线                                                                             |
| `ui.virtual.inlay-hint`           | 所有类型内联提示的默认样式                                                                     |
| `ui.virtual.inlay-hint.parameter` | 类型为 `parameter` 的内联提示样式（语言服务器不要求设置类型）                                  |
| `ui.virtual.inlay-hint.type`      | 类型为 `type` 的内联提示样式（语言服务器不要求设置类型）                                       |
| `ui.virtual.wrap`                 | 软换行指示器（参见 [`editor.soft-wrap` 配置][editor-section]）                                 |
| `ui.virtual.jump-label`           | 虚拟跳转标签样式                                                                               |
| `ui.menu`                         | 代码和命令补全菜单                                                                             |
| `ui.menu.selected`                | 选中的自动补全项                                                                               |
| `ui.menu.scroll`                  | `fg` 设置滑块颜色，`bg` 设置滚动条轨道颜色                                                    |
| `ui.selection`                    | 编辑区域中的选区                                                                               |
| `ui.selection.primary`            |                                                                                               |
| `ui.highlight`                    | 选择器预览中高亮的行                                                                           |
| `ui.highlight.frameline`          | 调试执行暂停所在的行                                                                           |
| `ui.cursorline.primary`           | 主光标所在行（[如果启用了 cursorline][editor-section]）                                       |
| `ui.cursorline.secondary`         | 其他光标所在行（[如果启用了 cursorline][editor-section]）                                     |
| `ui.cursorcolumn.primary`         | 主光标所在列（[如果启用了 cursorcolumn][editor-section]）                                     |
| `ui.cursorcolumn.secondary`       | 其他光标所在列（[如果启用了 cursorcolumn][editor-section]）                                   |
| `warning`                         | 诊断警告（行号区域）                                                                          |
| `warning.diagnostic.inline`       | 警告严重程度的内联诊断                                                                         |
| `error`                           | 诊断错误（行号区域）                                                                          |
| `error.diagnostic.inline`         | 错误严重程度的内联诊断                                                                         |
| `info`                            | 诊断信息（行号区域）                                                                          |
| `info.diagnostic.inline`          | 信息严重程度的内联诊断                                                                         |
| `hint`                            | 诊断提示（行号区域）                                                                          |
| `hint.diagnostic.inline`          | 提示严重程度的内联诊断                                                                         |
| `diagnostic`                      | 诊断回退样式（编辑区域）                                                                       |
| `diagnostic.hint`                 | 诊断提示（编辑区域）                                                                          |
| `diagnostic.info`                 | 诊断信息（编辑区域）                                                                          |
| `diagnostic.warning`              | 诊断警告（编辑区域）                                                                          |
| `diagnostic.error`                | 诊断错误（编辑区域）                                                                          |
| `diagnostic.unnecessary`          | 带有 unnecessary 标签的诊断（编辑区域）                                                        |
| `diagnostic.deprecated`           | 带有 deprecated 标签的诊断（编辑区域）                                                         |
| `tabstop`                         | 代码片段占位符                                                                                |

[editor-section]: ./configuration.md#editor-section
[#2380]: https://github.com/helix-editor/helix/issues/2380