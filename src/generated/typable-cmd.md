| 名称 | 描述 |
| --- | --- |
| `:exit`, `:x`, `:xit` | 若缓冲区已修改则写入磁盘并退出。接受可选路径（:exit some/path.txt）。 |
| `:exit!`, `:x!`, `:xit!` | 若缓冲区已修改则强制写入磁盘，创建必要的子目录，然后退出。接受可选路径（:exit! some/path.txt）。 |
| `:quit`, `:q` | 关闭当前视图。 |
| `:quit!`, `:q!` | 强制关闭当前视图，忽略未保存的更改。 |
| `:open`, `:o`, `:edit`, `:e` | 从磁盘打开文件到当前视图。 |
| `:buffer-close`, `:bc`, `:bclose` | 关闭当前缓冲区。 |
| `:buffer-close!`, `:bc!`, `:bclose!` | 强制关闭当前缓冲区，忽略未保存的更改。 |
| `:buffer-close-others`, `:bco`, `:bcloseother` | 关闭除当前焦点缓冲区外的所有缓冲区。 |
| `:buffer-close-others!`, `:bco!`, `:bcloseother!` | 强制关闭除当前焦点缓冲区外的所有缓冲区。 |
| `:buffer-close-all`, `:bca`, `:bcloseall` | 关闭所有缓冲区但不退出。 |
| `:buffer-close-all!`, `:bca!`, `:bcloseall!` | 强制关闭所有缓冲区，忽略未保存的更改，但不退出。 |
| `:buffer-next`, `:bn`, `:bnext` | 转到下一个缓冲区。 |
| `:buffer-previous`, `:bp`, `:bprev` | 转到上一个缓冲区。 |
| `:write`, `:w` | 将更改写入磁盘。接受可选路径（:write some/path.txt）。 |
| `:write!`, `:w!` | 强制将更改写入磁盘，创建必要的子目录。接受可选路径（:write! some/path.txt）。 |
| `:write-buffer-close`, `:wbc` | 将更改写入磁盘并关闭缓冲区。接受可选路径（:write-buffer-close some/path.txt）。 |
| `:write-buffer-close!`, `:wbc!` | 强制将更改写入磁盘，创建必要的子目录，并关闭缓冲区。接受可选路径（:write-buffer-close! some/path.txt）。 |
| `:new`, `:n` | 创建新的暂存缓冲区。 |
| `:format`, `:fmt` | 使用外部格式化程序或语言服务器格式化文件。 |
| `:indent-style` | 设置编辑时的缩进样式。（'t' 表示制表符，或 1-16 表示空格数。） |
| `:line-ending` | 设置文档的默认换行符。选项：crlf、lf。 |
| `:earlier`, `:ear` | 跳转到编辑历史中更早的时间点。接受步数或时间跨度。 |
| `:later`, `:lat` | 跳转到编辑历史中更晚的时间点。接受步数或时间跨度。 |
| `:write-quit`, `:wq` | 将更改写入磁盘并关闭当前视图。接受可选路径（:wq some/path.txt）。 |
| `:write-quit!`, `:wq!` | 将更改写入磁盘并强制关闭当前视图。接受可选路径（:wq! some/path.txt）。 |
| `:write-all`, `:wa` | 将所有缓冲区的更改写入磁盘。 |
| `:write-all!`, `:wa!` | 强制将所有缓冲区的更改写入磁盘，创建必要的子目录。 |
| `:write-quit-all`, `:wqa`, `:xa` | 将所有缓冲区的更改写入磁盘并关闭所有视图。 |
| `:write-quit-all!`, `:wqa!`, `:xa!` | 强制将所有缓冲区的更改写入磁盘，创建必要的子目录，并关闭所有视图（忽略未保存的更改）。 |
| `:quit-all`, `:qa` | 关闭所有视图。 |
| `:quit-all!`, `:qa!` | 强制关闭所有视图，忽略未保存的更改。 |
| `:cquit`, `:cq` | 以退出码退出（默认 1）。接受可选的整数退出码（:cq 2）。 |
| `:cquit!`, `:cq!` | 强制以退出码退出（默认 1），忽略未保存的更改。接受可选的整数退出码（:cq! 2）。 |
| `:theme` | 更改编辑器主题（若未指定名称则显示当前主题）。 |
| `:yank-join` | 复制合并后的选区。可提供分隔符作为第一个参数。默认值为换行符。 |
| `:clipboard-yank` | 将主选区复制到系统剪贴板。 |
| `:clipboard-yank-join` | 将合并后的选区复制到系统剪贴板。可提供分隔符作为第一个参数。默认值为换行符。 |
| `:primary-clipboard-yank` | 将主选区复制到系统主剪贴板。 |
| `:primary-clipboard-yank-join` | 将合并后的选区复制到系统主剪贴板。可提供分隔符作为第一个参数。默认值为换行符。 |
| `:clipboard-paste-after` | 在选区后粘贴系统剪贴板内容。 |
| `:clipboard-paste-before` | 在选区前粘贴系统剪贴板内容。 |
| `:clipboard-paste-replace` | 用系统剪贴板内容替换选区。 |
| `:primary-clipboard-paste-after` | 在选区后粘贴主剪贴板内容。 |
| `:primary-clipboard-paste-before` | 在选区前粘贴主剪贴板内容。 |
| `:primary-clipboard-paste-replace` | 用系统主剪贴板内容替换选区。 |
| `:show-clipboard-provider` | 在状态栏中显示剪贴板提供程序名称。 |
| `:change-current-directory`, `:cd` | 更改当前工作目录。 |
| `:show-directory-stack` | 以空格分隔的字符串显示目录栈。 |
| `:push-directory`, `:pushd` | 保存当前目录并切换目录。 |
| `:pop-directory`, `:popd` | 移除目录栈顶条目，并切换到新的栈顶目录。 |
| `:show-directory`, `:pwd` | 显示当前工作目录。 |
| `:encoding` | 设置编码。基于 `https://encoding.spec.whatwg.org`。 |
| `:character-info`, `:char` | 获取主光标下字符的信息。 |
| `:reload`, `:rl` | 丢弃更改并从源文件重新加载。 |
| `:reload-all`, `:rla` | 丢弃更改并从源文件重新加载所有文档。 |
| `:update`, `:u` | 仅当文件已修改时写入更改。 |
| `:lsp-workspace-command` | 打开工作区命令选择器。 |
| `:lsp-restart` | 重启指定的语言服务器；若无参数，则重启当前文件使用的所有语言服务器。 |
| `:lsp-stop` | 停止指定的语言服务器；若无参数，则停止当前文件使用的所有语言服务器。 |
| `:tree-sitter-scopes` | 显示 tree-sitter 作用域，主要用于主题和开发。 |
| `:tree-sitter-highlight-name` | 显示光标下 tree-sitter 高亮作用域的名称。 |
| `:tree-sitter-layers` | 显示光标下 tree-sitter 注入层的语言名称。 |
| `:debug-start`, `:dbg` | 从给定模板和参数启动调试会话。 |
| `:debug-remote`, `:dbg-tcp` | 通过 TCP 地址连接到调试适配器，并从给定模板和参数启动调试会话。 |
| `:debug-eval` | 在当前调试上下文中计算表达式。 |
| `:vsplit`, `:vs` | 在垂直分割中打开文件。 |
| `:vsplit-new`, `:vnew` | 在垂直分割中打开暂存缓冲区。 |
| `:hsplit`, `:hs`, `:sp` | 在水平分割中打开文件。 |
| `:hsplit-new`, `:hnew` | 在水平分割中打开暂存缓冲区。 |
| `:tutor` | 打开教程。 |
| `:goto`, `:g` | 跳转到行号。 |
| `:set-language`, `:lang` | 设置当前缓冲区的语言（若未指定值则显示当前语言）。 |
| `:set-option`, `:set` | 在运行时设置配置选项。<br>例如，要禁用智能大小写搜索，使用 `:set search.smart-case false`。 |
| `:toggle-option`, `:toggle` | 在运行时切换配置选项。<br>例如，要切换智能大小写搜索，使用 `:toggle search.smart-case`。 |
| `:get-option`, `:get` | 获取配置选项的当前值。 |
| `:sort` | 对选区中的范围进行排序。 |
| `:reflow` | 将当前选中的行硬换行到指定宽度。 |
| `:tree-sitter-subtree`, `:ts-subtree` | 显示覆盖主选区的最小子树，主要用于调试查询。 |
| `:config-reload` | 刷新用户配置。 |
| `:config-open` | 打开用户 config.toml 文件。 |
| `:config-open-workspace` | 打开工作区 config.toml 文件。 |
| `:log-open` | 打开 helix 日志文件。 |
| `:insert-output` | 运行 shell 命令，在每个选区前插入输出。 |
| `:append-output` | 运行 shell 命令，在每个选区后追加输出。 |
| `:pipe`, `:\|` | 将每个选区传递给 shell 命令。 |
| `:pipe-to` | 将每个选区传递给 shell 命令，忽略输出。 |
| `:run-shell-command`, `:sh`, `:!` | 运行 shell 命令。 |
| `:reset-diff-change`, `:diffget`, `:diffg` | 重置光标位置的差异更改。 |
| `:clear-register` | 清除指定寄存器。若未提供参数，则清除所有寄存器。 |
| `:set-register` | 设置指定寄存器的内容。 |
| `:redraw` | 清除并重新渲染整个 UI。 |
| `:move`, `:mv` | 将当前缓冲区及其对应文件移动到不同路径。 |
| `:move!`, `:mv!` | 将当前缓冲区及其对应文件移动到不同路径，创建必要的子目录。 |
| `:yank-diagnostic` | 将主光标下的诊断信息复制到寄存器，默认复制到剪贴板。 |
| `:read`, `:r` | 将文件加载到缓冲区。 |
| `:echo` | 将给定参数打印到状态行。 |
| `:noop` | 无操作。 |
| `:workspace-trust` | 允许当前工作区使用语言服务器和本地配置。 |
| `:workspace-untrust` | 撤销当前工作区的信任授权或排除设置。 |
| `:workspace-exclude` | 将当前工作区标记为不再提示。不再提示信任。 |