# Configuration

要覆盖全局配置参数，请在配置目录中创建一个 `config.toml` 文件：

- Linux / Mac: `~/.config/helix/config.toml`
- Windows: `%AppData%\helix\config.toml`

> 💡 你可以通过在 Helix 正常模式下输入命令 `:config-open` 来打开配置文件。

示例配置：

```toml
theme = "onedark"

[editor]
line-number = "relative"
mouse = false

[editor.cursor-shape]
insert = "bar"
normal = "block"
select = "underline"

[editor.file-picker]
hidden = false
```

你可以使用 `-c` 或 `--config` 命令行参数指定自定义配置文件，例如 `hx -c path/to/custom-config.toml`。
你可以通过执行 `:config-reload` 命令重新加载配置文件。或者，在 Unix 操作系统上，你也可以通过向 Helix 进程发送 USR1 信号来重新加载它，例如使用命令 `pkill -USR1 hx`。

最后，你可以在仓库根目录下的 `.helix` 目录中放置项目本地的 `config.toml` 和 `languages.toml` 文件。
它的设置将与配置目录和内置配置合并。

