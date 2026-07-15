## 使用选择器(pickers)

Helix 有多种选择器(pickers), 即用于选择各类项目的交互式窗口, 包括文件选取器、全局搜索选取器等. 这些选择器在 [空格键(space)模式](./keymap.md#space-mode) 中可通过 [键位映射(keymap)](./keymap.md#picker) 访问.

### 对选取结果进行筛选(Filtering picker results)

绝大多数选取器使用 [fzf 语法](https://github.com/junegunn/fzf?tab=readme-ov-file#search-syntax) 执行模糊匹配。两个例外分别是使用正则表达式的全局搜索选取器，以及将搜索词传递给语言服务器的工作区符号选取器。注意，OR 操作（`|`）目前不受支持。

如果选取器显示多列，你可以通过在列名前加上 `%` 来将筛选应用于特定列。列名可以缩短为任意前缀，因此 `%p`、`%pa` 或 `%pat` 都与 `%path` 含义相同。例如，在全局搜索选取器中查询 `helix %p .toml !lang` 将搜索路径以 ".toml" 结尾但不包含 "lang" 的文件中实际上会包含 "helix" 的条目。

你可以使用 `Ctrl-r` 后跟寄存器名称来插入[寄存器(register)](./registers.md)中的内容。例如，可以使用 `Ctrl-r`-`.` 插入当前选中的文本，或使用 `Ctrl-r`-`%` 后跟 `Ctrl-w` 移除最后一个路径部分来插入当前文件的目录。如果在未输入筛选条件的情况下按 `Enter`，全局搜索选取器将使用[搜索寄存器(search registers)](./registers.md#default-registers)中的内容。例如，按 `*`-`Space-/`-`Enter` 将开始对当前选中文本进行全局搜索。

### 文件浏览器(File explorer)

按下`Space-e` 会打开一个交互式文件浏览器，用于搜索和打开文件, 它以工作区为根目录; `Space-.` 按 Space-. 则会打开一个以当前缓冲区所在目录为根目录的. 与文件选择器不同, 文件浏览器默认不会忽略大多数文件; 其忽略行为可在 [editor.file-explorer] 章节中单独配置。
