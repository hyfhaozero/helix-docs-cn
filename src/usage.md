# 使用Helix

如需完整的 Helix 交互式教程，请参阅
[tutor](https://github.com/helix-editor/helix/blob/master/runtime/tutor) ,可通过命令 `hx --tutor` 或 `:tutor` 访问.

> 💡 目前并非所有功能都有完整文档，请参阅 键位映射
> [key mappings](./keymap.md) 列表.

## 模式

Helix 是一个模式编辑器(modal editor), 它有不同的模式用于不同的任务.

* [普通模式(Normal mode)](./keymap.md#normal-mode): 用于导航和编辑命令(默认模式).

* [插入模式(Insert mode)](./keymap.md#insert-mode): 用于直接在文档中输入文本, 你可以在普通模式下输入 `i` 进入插入模式.
* [选择模式(Select/extend mode)](./keymap.md#select--extend-mode): 用于选择和操作文本, 你可以在普通模式下输入 `v` 进入选择模式.

## 缓冲区(Buffer)

缓冲区是内存中的文件表示. 使用选择器(pickers)或命令打开或切换缓冲区（你可以同时打开多个缓冲区）.

## "选择优先"编辑模式

受 [Kakoune](http://kakoune.org) 启发, Helix 遵循 `选择->操作`（`selection → action`） 模型. 这意味着你正在操作的任何内容（例如单词、段落、行等）需要先被选择，然后再被操作（删除、更改、粘贴等）。
光标是一个宽度为1的选择。

## "多选择"模式

受 [Kakoune](http://kakoune.org) 启发, 多选择是一种核心的交互模式. 例如，替换多个单词的实例通常需要先选择所有实例（所以每个实例都要选择），接着使用更改操作（`c`）同时编辑所有选择。

## 移动命令

移动命令是移动光标或修改选择的命令. 它们用于导航和文本操作. 例如，使用 `w` 移动到下一个单词，或使用 `f` 查找字符。请参阅[移动](./keymap.md#movement) 部分以获取更多移动命令.

