## 使用跳转列表

为了帮助快速导航，Helix 维护了一个称为跳转列表的“跳转”记录。
每当你执行一次大幅移动（参见下一节）时，Helix 都会将移动前的选区保存为一个跳转。
跳转相当于一个检查点，允许你跳转到另一个位置进行编辑，然后返回到之前的位置并恢复之前的选区。
这样，跳转列表同时记录了你之前的位置和选区。
你可以使用 `Ctrl-s` 手动保存一个跳转。
要向后跳转，请使用 `Ctrl-o`；要向前跳转，请使用 `Ctrl-i`。要查看并从完整跳转列表中选择，请使用 `Space-j` 打开跳转列表选取器。

### 什么操作会产生跳转

以下是不完全列表，列出了哪些操作会向跳转列表添加一个跳转：

- 切换缓冲区
  - 使用缓冲区选取器，切换到上一个/下一个缓冲区
  - 转到最后访问/修改的文件
  - 创建新文件（`:new FILE`）
  - 打开文件（`:open FILE`）
    - 包括 `:log-open`、`:config-open`、`:config-open-workspace`、`:tutor`
  - 通过选取器、全局搜索或文件资源管理器导航
  - `goto_file`（`gf`）
- 文件内大幅移动
  - `select_regex`（`s`）
  - `split_regex`（`S`）
  - `search`（`/`）
  - `keep_selections` 和 `remove_selections`（`K` 和 `<A-K>`）
  - `goto_file_start`（`gg`）
  - `goto_file_end`
  - `goto_last_line`（`ge`）
  - `:goto 123` / `:123` / `123G`
  - `goto_definition`（`gd`）
  - `goto_declaration`（`gD`）
  - `goto_type_definition`（`gy`）
  - `goto_reference`（`gr`）
- 其他
  - `Ctrl-s` 手动创建一个跳转
  - 尝试关闭已修改的缓冲区可能会切换到该缓冲区并创建一个跳转
  - 调试器可以在跳转堆栈帧时创建跳转