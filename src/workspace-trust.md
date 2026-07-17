# 工作区信任

Helix 有若干功能可以执行任意代码：

- 语言服务器（LSP）
- 调试适配器（DAP）
- 本地工作区配置（`.helix/config.toml`、`.helix/languages.toml`）
- Git 集成（仓库 `.git/config` 中的过滤器和其它命令）

为防止恶意项目（检出的 PR、新克隆的仓库等），Helix 将这些功能置于显式的按工作区信任之后。默认情况下，语言服务器会自动启动（其二进制文件来自 `$PATH`，而非工作区），调试适配器也可被启动，但加载 `.helix/config.toml` 或 `.helix/languages.toml` 以及信任仓库的 `.git/config` 则需要主动选择加入。请注意，调试适配器永远不会自动启动——需要你自行启动——但相同的信任级别仍然限制它们是否可以运行。该模型与 [direnv](https://direnv.net/) 类似：每个工作区运行一次 `:workspace-trust`，Helix 会在会话间记住该设置。

## 授予信任

当 Helix 在从未见过的工作区中打开文件时，会弹出一个模式信任提示，询问：

- **信任(Trust)** — 永久允许该工作区。
- **从不(Never)** — 排除该工作区；不再提示。

`<Esc>`（或任何其他取消操作）会缓存“本次会话不受信任”("untrusted for this session")的状态，这样你就不会在工作区中打开的每个文件都重复触发提示。下次你在该工作区启动 Helix 时，会再次提示。

每当工作区处于受限模式，*且*运行 `:workspace-trust` 会改变可观察行为时（即存在要加载的本地配置或将要启动的 LSP），编辑器右下角（宏录制 `[@]` 指示器旁边）会显示一个小的 `[⚠]` 指示器。

你也可以直接从命令输入框中运行 `:workspace-trust` / `:workspace-untrust` / `:workspace-exclude`。

## 撤销信任

运行 `:workspace-untrust` 可撤销对工作区的信任授权。下次你在该工作区中打开文件时，将恢复到不受信任的提示状态。

## 授予信任后检测变更

当你信任一个工作区时，Helix 会记录 `.helix/` 下所有文件的哈希值。如果这些文件之后发生变更（恶意检出、意外变基等），Helix 会在下次打开时检测到不匹配，并将该工作区报告为*过时*：

```
Workspace `.helix/` config changed since `:workspace-trust`. Local config
not loaded. Run `:workspace-trust` to re-allow.
```

在过时状态下，语言服务器继续运行（它们使用 `$PATH` 上全局配置的二进制文件，这些文件未发生变化），但不会加载 `.helix/config.toml` 和 `.helix/languages.toml`。再次运行 `:workspace-trust` 以重新固定新的哈希值。

## 存储

信任授权存储在 `data_dir()/workspace_trust/` 中，每个工作区对应一个小文件。文件名是工作区绝对路径的 SHA-256 哈希值；文件内容如下所示：


```
path = /home/user/proj1
hash = sha256:abc123...
excluded = false
```


- Linux / macOS：`~/.local/share/helix/workspace_trust/`
- Windows：`%AppData%\Roaming\helix\workspace_trust\`

每个工作区单独一个文件的存储方式在多个并发 Helix 实例下是安全的——不同的工作区永远不会写入同一个文件。

每个工作区单独一个文件的存储方式在多个并发 Helix 实例下是安全的——不同的工作区永远不会写入同一个文件。

## 配置

配置项位于 `[editor.workspace-trust]` 下：

| 键名       | 取值                               | 默认值      | 作用                                                                                |
| ---       | ---                                 | ---         | ---                                                                                 |
| `level`   | `"none"`, `"servers"`, `"insecure"` | `"servers"` | 每个工作区中自动信任的内容。详见下文。                                                 |
| `prompt`  | `true`, `false`                     | `true`      | 是否显示模式弹窗。`[⚠]` 指示器无论何时都会显示。                                       |
| `trusted` | 通配符模式列表                       | `[]`        | 匹配模式的工作区无需授予即可被信任。不推荐使用；详见下文。                               |

### 推荐配置

**默认：信任服务器，加载工作区配置前提示。**

```toml
[editor.workspace-trust]
level = "servers"
prompt = true
```

语言服务器在每个工作区中都会自动启动——它们的二进制文件来自 `$PATH`，并非由工作区控制——并且你启动的调试适配器也被允许运行。仅当在工作区中打开文件，且该工作区的 `.helix/config.toml` 或 `.helix/languages.toml` 会解锁某些内容时，模式弹窗才会出现。每个工作区只需按一次键即可信任所有其他内容，按另一次键则拒绝。

**最高的安全性：从不提示，手动信任每个工作区。**

```toml
[editor.workspace-trust]
level = "none"
prompt = false
```

任何内容都不会被隐式信任：语言服务器、调试适配器、本地配置以及 git 的 `Trust::Full` 均处于关闭状态，直到你运行 `:workspace-trust` 为止。弹窗不会出现；右下角的 `[⚠]` 指示器是当前工作区受限的唯一信号。适合那些宁愿将授予信任作为一项主动操作，而不是去关闭对话框的用户。

> [!WARNING]
> `level = "insecure"` 极不推荐使用。它会隐式信任你打开的每个工作区，从而完全破坏保护机制：一个带有恶意 `.helix/config.toml` 的检出 PR 将会加载其配置，并启动其中定义的任何语言服务器，且不会有任何提示或指示。仅当你对 `cd` 进入的每个项目目录中的内容承担全部责任时，才可设置此项。

### 通过路径信任工作区（不推荐） {#trust-workspaces-by-path-discouraged}

如果你将所有仓库都存放在一个可预测的目录结构下，可以使用通配符模式批量信任它们，而无需逐个授予信任：

```toml
[editor.workspace-trust]
trusted = [
  "~/src/github.com/me/*",
  "~/work/repos/*",
]
```

路径匹配该模式的工作区将被完全信任，效果等同于你在其中运行了 `:workspace-trust` 命令。`~` 和环境变量均会被展开。

> [!WARNING]
> 这种方式比显式授予信任更弱，不推荐使用。它会完全跳过 `.helix/` 变更检测（匹配目录下的恶意检出永远不会被标记为过时），并且会信任之后落入匹配路径下的**任何**仓库——包括你从不可信源克隆到 `~/src/github.com/me/` 下的仓库。建议优先按工作区逐个授予信任；仅当提示确实严重影响你的工作流时才考虑使用此方式。显式的 `:workspace-exclude` 仍然会覆盖匹配的模式。

## Git 信任机制

工作区信任同样会影响 Helix 打开 Git 仓库的方式。不受信任的工作区以 [gix](https://github.com/Byron/gitoxide) 的 `Trust::Reduced` 模式打开；受信任的工作区则使用 `Trust::Full` 模式。

在 `Trust::Reduced` 模式下，gix 仍会运行完整的过滤器管道（因此像 `core.autocrlf` 这类内置转换功能依然有效），但会忽略来自不受信任的仓库本地 `.git/config` 中的配置。这意味着 `filter.*.clean` / `filter.*.smudge` 驱动以及类似会执行外部程序的配置项会被丢弃，直到你信任该工作区为止。

Helix 主动强制设定此信任级别，而不是让 gix 从 `.git` 目录所有权来推断——即使某个目录中的 `.git/config` 恰好属于你，在运行 `:workspace-trust` 之前，它仍被视为不受信任。