## 包围

Helix 内置了类似 [vim-surround](https://github.com/tpope/vim-surround) 的功能。
键位映射灵感来自 [vim-sandwich](https://github.com/machakann/vim-sandwich)：

![包围演示](https://user-images.githubusercontent.com/23398472/122865801-97073180-d344-11eb-8142-8f43809982c6.gif)

| 按键序列                          | 操作                                   |
| --------------------------------- | -------------------------------------- |
| `ms<char>`（选中文本后）          | 为选区添加包围字符                     |
| `mr<char_to_replace><new_char>`   | 替换最近的包围字符                     |
| `md<char_to_delete>`              | 删除最近的包围字符                     |

你可以使用计数来作用于外层配对。

包围也可以作用于多个选区。例如，要将所有出现的 `(use)` 改为 `[use]`：

1. `%` 选中整个文件
2. `s` 按搜索词拆分选区
3. 输入 `use` 并按下 Enter
4. `mr([` 将圆括号替换为方括号

目前不支持多个字符，但计划在未来的版本中支持。