## 键位重映射

Helix 目前通过简单的 TOML 配置文件支持单向键位重映射。（未来将提供更强大的解决方案，例如通过命令进行重绑定。）

键位映射中可使用三种命令：

* 静态命令：像 `move_char_right` 这样的命令，通常绑定到按键上，用于移动和编辑。静态命令列表可在 [Keymap](./keymap.md) 文档和源代码中 `helix-term/src/commands.rs` 的 `static_commands!` 宏调用处找到。
* 可输入命令：可从命令模式（`:`）执行的命令，例如 `:write!`。可用可输入命令列表请参见 [Commands](./commands.md) 文档，或源代码中 `helix-term/src/commands/typed.rs` 的 `TypableCommandList` 声明。
* 宏：按顺序执行的按键序列。这些键绑定以 `@` 开头，后跟任意数量的按键。例如 `@miw` 可用于选择周围的单词。目前，由于命令序列执行方式的限制，宏键绑定不允许出现在键绑定序列中。修饰键（例如 Alt+o）可以像 `"<A-o>"` 这样使用，例如 `"@miw<A-o>"`。

要重映射按键，请在 `helix` 配置目录（Linux 系统默认为 `~/.config/helix`）中创建一个 `config.toml` 文件，结构如下：

> 💡 要将修饰键 + 键设置为键绑定，请使用 `A-X = ...` 或 `C-X = ...` 表示 Alt + X 或 Ctrl + X。使用连字符组合 Shift，例如 `C-S-esc`。
> 在宏中，将它们包裹在 `<>` 中，例如 `<A-X>` 和 `<C-X>`，以区别于 `A` 或 `C` 键本身。

```toml
# 每个部分最多一个：'keys.normal'、'keys.insert' 和 'keys.select'
[keys.normal]
C-s = ":w" # 将 Ctrl-s 映射到可输入命令 :w，它是 :write（保存文件）的别名
C-o = ":open ~/.config/helix/config.toml" # 将 Ctrl-o 映射到打开 helix 配置文件
a = "move_char_left" # 将 'a' 键映射到 move_char_left 命令
w = "move_line_up" # 将 'w' 键映射到 move_line_up
"C-S-esc" = "extend_line" # 将 Ctrl-Shift-Escape 映射到 extend_line
g = { a = "code_action" } # 将 `ga` 映射到显示可能的代码操作
"ret" = ["open_below", "normal_mode"] # 将回车键映射为 open_below 然后重新进入普通模式
"A-x" = "@x<A-d>" # 将 Alt-x 映射为一个宏，该宏选中整行并删除它而不复制

[keys.insert]
"A-x" = "normal_mode"     # 将 Alt-X 映射到进入普通模式
j = { k = "normal_mode" } # 将 `jk` 映射到退出插入模式
```

## 次要模式

次要模式通过按键（通常从普通模式）进入，提供专用的键绑定。可以通过嵌套定义来修改或添加绑定。

```toml
[keys.insert.j]
k = "normal_mode" # Maps `jk` to exit insert mode

[keys.normal.g]
a = "code_action" # Maps `ga` to show possible code actions

# invert `j` and `k` in view mode
[keys.normal.z]
j = "scroll_up"
k = "scroll_down"

# create a new minor mode bound to `+`
[keys.normal."+"]
m = ":run-shell-command make"
c = ":run-shell-command cargo build"
t = ":run-shell-command cargo test"
```

## 特殊键和修饰键

Ctrl、Shift 和 Alt 修饰键分别使用前缀 `C-`、`S-` 和 `A-` 编码。

[Super 键](https://en.wikipedia.org/wiki/Super_key_(keyboard_button))——Windows/Linux 键或 Mac 键盘上的 Command 键——在使用支持[增强键盘协议](https://github.com/helix-editor/helix/wiki/Terminal-Support#enhanced-keyboard-protocol)的终端模拟器时同样受支持。Super 键使用前缀 `Meta-`、`Cmd-` 或 `Win-` 编码。这些均为 Super 修饰键的同义词——使用 `Win-` 修饰键绑定按键意味着它可以使用 Windows/Linux 键或 Command 键来触发。

```toml
[keys.normal]
C-s = ":write" # Ctrl 和 's' 写入
Cmd-s = ":write" # Cmd 或 Win 或 Meta 和 's' 写入
```

特殊键按如下方式编码：

| 键名             | 表示方式        |
| ---              | ---            |
| Backspace        | `"backspace"`  |
| Space            | `"space"`      |
| Return/Enter     | `"ret"`        |
| Left             | `"left"`       |
| Right            | `"right"`      |
| Up               | `"up"`         |
| Down             | `"down"`       |
| Home             | `"home"`       |
| End              | `"end"`        |
| Page Up          | `"pageup"`     |
| Page Down        | `"pagedown"`   |
| Tab              | `"tab"`        |
| Delete           | `"del"`        |
| Insert           | `"ins"`        |
| Null             | `"null"`       |
| Escape           | `"esc"`        |
| 小于号 (<)       | `"lt"`         |
| 大于号 (>)       | `"gt"`         |

可以通过将按键绑定到 `no_op` 命令来禁用它们。

所有其他键，如 `?`、`!`、`-` 等，可以直接使用：

```toml
[keys.normal]
"?" = ":write"
"!" = ":write"
"-" = ":write"
```

注意：`-` 在与修饰键组合时不能直接使用，例如 `Alt` + `-` 应写成 `A-minus`。`A--` 不被接受。