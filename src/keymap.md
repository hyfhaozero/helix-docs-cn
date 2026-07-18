## 键位映射

- [普通模式](#normal-mode)
  - [移动](#movement)
  - [更改](#changes)
    - [Shell](#shell)
  - [选区操作](#selection-manipulation)
  - [搜索](#search)
  - [次要模式](#minor-modes)
    - [视图模式](#view-mode)
    - [跳转模式](#goto-mode)
    - [匹配模式](#match-mode)
    - [窗口模式](#window-mode)
    - [Space 模式](#space-mode)
      - [弹出窗口](#popup)
      - [补全菜单](#completion-menu)
      - [签名帮助弹出窗口](#signature-help-popup)
    - [Unimpaired](#unimpaired)
- [插入模式](#insert-mode)
- [选择 / 扩展模式](#select--extend-mode)
- [选择器](#picker)
- [提示](#prompt)

> 💡 标记为（**LSP**）的映射需要为文件激活语言服务器。

> 💡 标记为（**TS**）的映射需要为文件类型提供 tree-sitter 语法。

> ⚠️ 某些终端的默认键映射与 Helix 的冲突。如果此页面上描述的任何映射无法按预期工作，请检查终端的映射以确保它们没有冲突。有关已知冲突，请参阅 [wiki](https://github.com/helix-editor/helix/wiki/Terminal-Support)。

## 普通模式 {#normal-mode}

普通模式是启动 Helix 时的默认模式。你可以通过按 `Escape` 键从其他模式返回普通模式。

### 移动 {#movement}

> 注意：与 Vim 不同，`f`、`F`、`t` 和 `T` 不限于当前行。

> 下文中的 `<n>` 表示通过键入一串数字得到的整数。

| 键                   | 描述                                        | 命令                     |
| -----                 | -----------                                        | -------                     |
| `h`、`Left`           | 向左移动                                          | `move_char_left`            |
| `j`、`Down`           | 向下移动                                          | `move_visual_line_down`     |
| `k`、`Up`             | 向上移动                                            | `move_visual_line_up`       |
| `l`、`Right`          | 向右移动                                         | `move_char_right`           |
| `w`                   | 移动到下一个单词开头                               | `move_next_word_start`      |
| `b`                   | 移动到上一个单词开头                           | `move_prev_word_start`      |
| `e`                   | 移动到下一个单词结尾                                 | `move_next_word_end`        |
| `W`                   | 移动到下一个长单词（仅按空白分隔）开头                               | `move_next_long_word_start` |
| `B`                   | 移动到上一个长单词开头                           | `move_prev_long_word_start` |
| `E`                   | 移动到下一个长单词结尾                                 | `move_next_long_word_end`   |
| `t`                   | 移动到下一个字符之前                                | `find_till_char`            |
| `f`                   | 移动到下一个字符处                                     | `find_next_char`            |
| `T`                   | 移动到上一个字符之前                            | `till_prev_char`            |
| `F`                   | 移动到上一个字符处                                 | `find_prev_char`            |
| `<n>G`、`<n>gg`       | 跳转到行号 `<n>`                            | `goto_line`                 |
| `Alt-.`               | 重复上一次移动操作（`f`、`t`、`m`、`[` 或 `]`）     | `repeat_last_motion`        |
| `Home`                | 移动到行首                      | `goto_line_start`           |
| `End`                 | 移动到行尾                        | `goto_line_end`             |
| `Ctrl-b`、`PageUp`    | 向上翻页                                       | `page_up`                   |
| `Ctrl-f`、`PageDown`  | 向下翻页                                     | `page_down`                 |
| `Ctrl-u`              | 将光标和页面向上半页移动                  | `page_cursor_half_up`       |
| `Ctrl-d`              | 将光标和页面向下半页移动                | `page_cursor_half_down`     |
| `Ctrl-i`              | 在跳转列表中向前跳转                       | `jump_forward`              |
| `Ctrl-o`              | 在跳转列表中向后跳转                      | `jump_backward`             |
| `Ctrl-s`              | 将当前选区保存到跳转列表         | `save_selection`            |

### 更改 {#changes}

| 键         | 描述                                                          | 命令                   |
| -----       | -----------                                                          | -------                   |
| `r`         | 替换为一个字符                                             | `replace`                 |
| `R`         | 用已复制的内容替换                                             | `replace_with_yanked`     |
| `~`         | 切换选中文本的大小写                                     | `switch_case`             |
| `` ` ``     | 将选中文本转为小写                                  | `switch_to_lowercase`     |
| `` Alt-` `` | 将选中文本转为大写                                  | `switch_to_uppercase`     |
| `i`         | 在选区前插入                                              | `insert_mode`             |
| `a`         | 在选区后插入（追加）                                      | `append_mode`             |
| `I`         | 在行首插入                                      | `insert_at_line_start`    |
| `A`         | 在行尾插入                                        | `insert_at_line_end`      |
| `o`         | 在选区下方打开新行                                        | `open_below`              |
| `O`         | 在选区上方打开新行                                        | `open_above`              |
| `.`         | 重复上一次插入                                                   | N/A                       |
| `u`         | 撤销更改                                                          | `undo`                    |
| `U`         | 重做更改                                                          | `redo`                    |
| `Alt-u`     | 在历史中向后移动                                             | `earlier`                 |
| `Alt-U`     | 在历史中向前移动                                              | `later`                   |
| `y`         | 复制选区                                                       | `yank`                    |
| `p`         | 在选区后粘贴                                                | `paste_after`             |
| `P`         | 在选区前粘贴                                               | `paste_before`            |
| `"` `<reg>` | 选择寄存器以复制到或粘贴自                           | `select_register`         |
| `>`         | 缩进选区                                                     | `indent`                  |
| `<`         | 取消缩进选区                                                   | `unindent`                |
| `=`         | 格式化选区（**LSP**）                                           | `format_selections`       |
| `d`         | 删除选区                                                     | `delete_selection`        |
| `Alt-d`     | 删除选区（不放入寄存器）                                    | `delete_selection_noyank` |
| `c`         | 更改选区（删除并进入插入模式）                      | `change_selection`        |
| `Alt-c`     | 更改选区（删除并进入插入模式，不放入寄存器）     | `change_selection_noyank` |
| `Ctrl-a`    | 增加光标下的对象（数字）                               | `increment`               |
| `Ctrl-x`    | 减少光标下的对象（数字）                               | `decrement`               |
| `Q`         | 开始/停止向选定寄存器录制宏（实验性）   | `record_macro`            |
| `q`         | 从选定寄存器回放录制的宏（实验性） | `replay_macro`            |
| `Ctrl-z`    | 挂起 Helix 并返回 shell（使用 `fg` 恢复）             | `suspend`                 |

#### Shell 

| 键     | 描述                                                                      | 命令               |
| ------  | -----------                                                                      | -------               |
| <code>&#124;</code>     | 将每个选区通过 shell 命令传输，用输出替换                 | `shell_pipe`          |
| <code>Alt-&#124;</code> | 将每个选区输入 shell 命令，忽略输出                          | `shell_pipe_to`       |
| `!`     | 运行 shell 命令，在每个选区前插入输出                        | `shell_insert_output` |
| `Alt-!` | 运行 shell 命令，在每个选区后追加输出                         | `shell_append_output` |
| `$`     | 将每个选区输入 shell 命令，保留命令返回值为 0 的选区 | `shell_keep_pipe`     |


### 选区操作 {#selections}

| 键                      | 描述                                                       | 命令                              |
| -----                    | -----------                                                       | -------                              |
| `s`                      | 在选区内选择所有正则匹配项                        | `select_regex`                       |
| `S`                      | 按正则匹配将选区拆分为子选区              | `split_selection`                    |
| `Alt-s`                  | 按换行拆分选区                                       | `split_selection_on_newline`         |
| `Alt-minus`              | 合并选区                                                  | `merge_selections`                   |
| `Alt-_`                  | 合并连续选区                                      | `merge_consecutive_selections`       |
| `&`                      | 按列对齐选区                                        | `align_selections`                   |
| `_`                      | 修剪选区中的空白                                | `trim_selections`                    |
| `;`                      | 将选区折叠为单个光标                           | `collapse_selection`                 |
| `Alt-;`                  | 翻转选区的光标和锚点                                  | `flip_selections`                    |
| `Alt-:`                  | 确保选区朝前                     | `ensure_selections_forward`          |
| `,`                      | 仅保留主选区                                   | `keep_primary_selection`             |
| `Alt-,`                  | 移除主选区                                      | `remove_primary_selection`           |
| `C`                      | 将选区复制到下一行（在下方添加光标）              | `copy_selection_on_next_line`        |
| `Alt-C`                  | 将选区复制到上一行（在上方添加光标）          | `copy_selection_on_prev_line`        |
| `(`                      | 向后轮换主选区                                    | `rotate_selections_backward`         |
| `)`                      | 向前轮换主选区                                     | `rotate_selections_forward`          |
| `Alt-(`                  | 向后轮换选区内容                                | `rotate_selection_contents_backward` |
| `Alt-)`                  | 向前轮换选区内容                                 | `rotate_selection_contents_forward`  |
| `%`                      | 选择整个文件                                                | `select_all`                         |
| `x`                      | 选择当前行，若已选择则扩展到下一行     | `extend_line_below`                  |
| `X`                      | 将选区扩展到行边界（行选择）             | `extend_to_line_bounds`              |
| `Alt-x`                  | 将选区收缩到行边界（行选择）             | `shrink_to_line_bounds`              |
| `J`                      | 连接选区内的行                                       | `join_selections`                    |
| `Alt-J`                  | 连接选区内的行并选择插入的空格         | `join_selections_space`              |
| `K`                      | 保留匹配正则的选区                                | `keep_selections`                    |
| `Alt-K`                  | 移除匹配正则的选区                              | `remove_selections`                  |
| `Ctrl-c`                 | 注释/取消注释选区                                  | `toggle_comments`                    |
| `Alt-o`、`Alt-up`        | 将选区展开到父语法节点（**TS**）                   | `expand_selection`                   |
| `Alt-i`、`Alt-down`      | 收缩语法树对象选区（**TS**）                      | `shrink_selection`                   |
| `Alt-p`、`Alt-left`      | 选择语法树中的上一个兄弟节点（**TS**）              | `select_prev_sibling`                |
| `Alt-n`、`Alt-right`     | 选择语法树中的下一个兄弟节点（**TS**）                  | `select_next_sibling`                |
| `Alt-a`                  | 选择语法树中的所有兄弟节点（**TS**）                  | `select_all_siblings`                |
| `Alt-I`、`Alt-Shift-down`| 选择语法树中的所有子节点（**TS**）                 | `select_all_children`                |
| `Alt-e`                  | 移动到语法树中父节点的末尾（**TS**）                | `move_parent_node_end`               |
| `Alt-b`                  | 移动到语法树中父节点的开头（**TS**）              | `move_parent_node_start`             |

### 搜索 {#search}

搜索命令默认都操作 `/` 寄存器。要使用其他寄存器，请使用 `"<char>`。

| 键   | 描述                                 | 命令              |
| ----- | -----------                                 | -------              |
| `/`   | 搜索正则模式                    | `search`             |
| `?`   | 搜索上一个模式                 | `rsearch`            |
| `n`   | 选择下一个搜索匹配项                    | `search_next`        |
| `N`   | 选择上一个搜索匹配项                | `search_prev`        |
| `*`   | 使用当前选区作为搜索模式，在单词边界自动包裹 `\b` | `search_selection_detect_word_boundaries` |
| `Alt-*` | 使用当前选区作为搜索模式 | `search_selection` |

### 次要模式 {#minor-modes}

这些子模式可从普通模式进入，通常在命令执行后切换回普通模式。

| 键      | 描述                                        | 命令        |
| -----    | -----------                                        | -------        |
| `v`      | 进入[选择（扩展）模式](#select--extend-mode) | `select_mode`  |
| `g`      | 进入[跳转模式](#goto-mode)                      | N/A            |
| `m`      | 进入[匹配模式](#match-mode)                    | N/A            |
| `:`      | 进入命令模式                                 | `command_mode` |
| `z`      | 进入[视图模式](#view-mode)                      | N/A            |
| `Z`      | 进入粘性[视图模式](#view-mode)               | N/A            |
| `Ctrl-w` | 进入[窗口模式](#window-mode)                  | N/A            |
| `Space`  | 进入[Space 模式](#space-mode)                    | N/A            |

这些模式（命令模式除外）可以通过[重映射键](https://docs.helix-editor.com/remapping.html#minor-modes)进行配置。

#### 视图模式 {#view-mode}

通过在[普通模式](#normal-mode)下键入 `z` 进入。

视图模式用于滚动和操纵视图而不改变选区。此模式的“粘性”变体（通过普通模式下键入 `Z` 进入）是持久的，可以使用 escape 键退出。当你只是浏览文本而不主动编辑时，这很有用。


| 键                  | 描述                                               | 命令                 |
| -----                | -----------                                               | -------                 |
| `z`、`c`             | 垂直居中行                                | `align_view_center`     |
| `t`                  | 将行对齐到屏幕顶部                   | `align_view_top`        |
| `b`                  | 将行对齐到屏幕底部                | `align_view_bottom`     |
| `m`                  | 将行对齐到屏幕中间（水平方向） | `align_view_middle`     |
| `j`、`down`          | 向下滚动视图                                 | `scroll_down`           |
| `k`、`up`            | 向上滚动视图                                   | `scroll_up`             |
| `Ctrl-f`、`PageDown` | 向下翻页                                            | `page_down`             |
| `Ctrl-b`、`PageUp`   | 向上翻页                                              | `page_up`               |
| `Ctrl-u`             | 将光标和页面向上半页移动                         | `page_cursor_half_up`   |
| `Ctrl-d`             | 将光标和页面向下半页移动                       | `page_cursor_half_down` |

#### 跳转模式 {#goto-mode}

通过在[普通模式](#normal-mode)下键入 `g` 进入。

跳转到各个位置。

| 键   | 描述                                      | 命令                    |
| ----- | -----------                                      | -------                    |
| `<n>g`| 跳转到行号 `<n>`                          | `goto_file_start`          |
| `g`   | 跳转到文件开头                      | `goto_file_start`          |
| <code>&lt;n&gt;&#124;</code>  | 跳转到列号 `<n>`      | `goto_column`              |
| <code>&#124;</code>     | 跳转到行首        | `goto_column`              |
| `e`   | 跳转到文件末尾                        | `goto_last_line`           |
| `f`   | 跳转到选区中的文件/URL                   | `goto_file`                |
| `h`   | 跳转到行首                      | `goto_line_start`          |
| `l`   | 跳转到行尾                        | `goto_line_end`            |
| `s`   | 跳转到行中第一个非空白字符 | `goto_first_nonwhitespace` |
| `t`   | 跳转到屏幕顶部                      | `goto_window_top`          |
| `c`   | 跳转到屏幕中间                   | `goto_window_center`       |
| `b`   | 跳转到屏幕底部                   | `goto_window_bottom`       |
| `d`   | 跳转到定义（**LSP**）                       | `goto_definition`          |
| `D`   | 跳转到声明（**LSP**）                      | `goto_declaration`         |
| `y`   | 跳转到类型定义（**LSP**）                  | `goto_type_definition`     |
| `r`   | 跳转到引用（**LSP**）                       | `goto_reference`           |
| `i`   | 跳转到实现（**LSP**）                   | `goto_implementation`      |
| `a`   | 跳转到上次访问/替代文件           | `goto_last_accessed_file`  |
| `m`   | 跳转到上次修改/替代文件           | `goto_last_modified_file`  |
| `n`   | 跳转到下一个缓冲区                                | `goto_next_buffer`         |
| `p`   | 跳转到上一个缓冲区                            | `goto_previous_buffer`     |
| `.`   | 跳转到当前文件中的上次修改位置          | `goto_last_modification`   |
| `j`   | 向下移动文本行（而非视觉行）       | `move_line_down`           |
| `k`   | 向上移动文本行（而非视觉行）         | `move_line_up`             |
| `w`   | 在每个单词处显示标签，并选择属于输入标签的单词 | `goto_word` |

#### 匹配模式 {#match-mode}

通过在[普通模式](#normal-mode)下键入 `m` 进入。

请参阅相关章节了解有关[环绕](./surround.md)和[文本对象](./textobjects.md)的详细说明。

| 键              | 描述                                     | 命令                    |
| -----            | -----------                                     | -------                    |
| `m`              | 跳转到匹配的括号（**TS**）                  | `match_brackets`           |
| `s` `<char>`     | 用 `<char>` 环绕当前选区        | `surround_add`             |
| `r` `<from><to>` | 将环绕字符 `<from>` 替换为 `<to>` | `surround_replace`         |
| `d` `<char>`     | 删除环绕字符 `<char>`              | `surround_delete`          |
| `a` `<object>`   | 选择文本对象外部                        | `select_textobject_around` |
| `i` `<object>`   | 选择文本对象内部                        | `select_textobject_inner`  |

TODO：选择语法节点的映射（`[` 的超集）。

#### 窗口模式 {#window-mode}

通过在[普通模式](#normal-mode)下键入 `Ctrl-w` 进入。

此层类似于 Vim 键绑定，因为 Kakoune 不支持窗口。

| 键                    | 描述                                          | 命令           |
| -----                  | -------------                                        | -------           |
| `w`、`Ctrl-w`          | 切换到下一个窗口                                | `rotate_view`     |
| `v`、`Ctrl-v`          | 垂直右侧分割                                 | `vsplit`          |
| `s`、`Ctrl-s`          | 水平底部分割                              | `hsplit`          |
| `t`、`Ctrl-t`          | 转置两个相邻分割                    | `transpose_view`  |
| `f`                    | 在水平分割中跳转到选区中的文件/URL  | `goto_file_hsplit`|
| `F`                    | 在垂直分割中跳转到选区中的文件/URL    | `goto_file_vsplit`|
| `h`、`Ctrl-h`、`Left`  | 移动到左侧分割                                   | `jump_view_left`  |
| `j`、`Ctrl-j`、`Down`  | 移动到下方分割                                  | `jump_view_down`  |
| `k`、`Ctrl-k`、`Up`    | 移动到上方分割                                    | `jump_view_up`    |
| `l`、`Ctrl-l`、`Right` | 移动到右侧分割                                 | `jump_view_right` |
| `q`、`Ctrl-q`          | 关闭当前窗口                                 | `wclose`          |
| `o`、`Ctrl-o`          | 仅保留当前窗口，关闭所有其他窗口 | `wonly`           |
| `H`                    | 将窗口向左交换                              | `swap_view_left`  |
| `J`                    | 将窗口向下交换                                | `swap_view_down`  |
| `K`                    | 将窗口向上交换                                  | `swap_view_up`    |
| `L`                    | 将窗口向右交换                             | `swap_view_right` |
| `ns`、`nCtrl-s`        | 使用暂存缓冲区新建水平分割           | `hsplit_new`      |
| `nv`、`nCtrl-v`        | 使用暂存缓冲区新建垂直分割             | `vsplit_new`      |
#### 空格( Space ) 模式 {#space-mode}

通过在[普通模式](#normal-mode)下键入 `Space` 进入。

此层是一组映射的集合，主要是选择器。

| 键     | 描述                                                             | 命令                                    |
| -----   | -----------                                                             | -------                                    |
| `f`     | 在 LSP 工作区根目录打开文件选择器                                  | `file_picker`                              |
| `F`     | 在当前工作目录打开文件选择器                           | `file_picker_in_current_directory`         |
| `e`     | 在工作区根目录打开文件浏览器                                     | `file_explorer`                            |
| `.`     | 在当前缓冲区所在目录打开文件浏览器                        | `file_explorer_in_current_buffer_directory`|
| `b`     | 打开缓冲区选择器                                                      | `buffer_picker`                            |
| `j`     | 打开跳转列表选择器                                                    | `jumplist_picker`                          |
| `g`     | 打开已更改文件选择器                                                | `changed_file_picker`                      |
| `G`     | 调试（实验性）                                                    | N/A                                        |
| `k`     | 在[弹出窗口](#popup)中显示光标下项目的文档（**LSP**） | `hover`                                    |
| `s`     | 打开文档符号选择器（**LSP** 或 **TS**）                         | `lsp_or_syntax_symbol_picker`              |
| `S`     | 打开工作区符号选择器（**LSP** 或 **TS**）                        | `lsp_or_syntax_workspace_symbol_picker`    |
| `d`     | 打开文档诊断选择器（**LSP**）                              | `diagnostics_picker`                       |
| `D`     | 打开工作区诊断选择器（**LSP**）                             | `workspace_diagnostics_picker`             |
| `r`     | 重命名符号（**LSP**）                                                 | `rename_symbol`                            |
| `a`     | 执行代码操作（**LSP**）                                             | `code_action`                              |
| `h`     | 选择符号引用（**LSP**）                                      | `select_references_to_symbol_under_cursor` |
| `'`     | 打开上次使用的模糊选择器                                                  | `last_picker`                              |
| `w`     | 进入[窗口模式](#window-mode)                                       | N/A                                        |
| `c`     | 注释/取消注释选区                                            | `toggle_comments`                          |
| `C`     | 块注释/取消注释选区                                      | `toggle_block_comments`                    |
| `Alt-c` | 行注释/取消注释选区                                       | `toggle_line_comments`                     |
| `p`     | 在选区后粘贴系统剪贴板内容                                 | `paste_clipboard_after`                    |
| `P`     | 在选区前粘贴系统剪贴板内容                                | `paste_clipboard_before`                   |
| `y`     | 将选区复制到剪贴板                                            | `yank_to_clipboard`                        |
| `Y`     | 将主选区复制到剪贴板                                        | `yank_main_selection_to_clipboard`         |
| `R`     | 用剪贴板内容替换选区                                | `replace_selections_with_clipboard`        |
| `/`     | 在工作区文件夹中全局搜索                                       | `global_search`                            |
| `?`     | 打开命令面板                                                    | `command_palette`                          |

> 💡 全局搜索在模糊选择器中显示结果，打开文件后使用 `Space + '` 可再次调出。

##### 弹出窗口

显示光标下项目的文档。目前不支持重映射。

| 键      | 描述 |
| ----     | ----------- |
| `Ctrl-u` | 向上滚动   |
| `Ctrl-d` | 向下滚动 |

##### 补全菜单

显示所选补全项的文档。目前不支持重映射。

| 键                         | 描述                      |
| ----                        | -----------                      |
| `Shift-Tab`、`Ctrl-p`、`Up` | 上一个条目                   |
| `Tab`、`Ctrl-n`、`Down`     | 下一个条目                       |
| `Enter`                     | 关闭菜单并接受补全 |
| `Ctrl-c`                    | 关闭菜单并拒绝补全 |

任何其他按键都会导致补全被接受。

##### 签名帮助弹出窗口

显示所选补全项的签名。目前不支持重映射。

| 键     | 描述        |
| ----    | -----------        |
| `Alt-p` | 上一个签名 |
| `Alt-n` | 下一个签名     |

#### Unimpaired {#unimpaired}

这些映射采用 [vim-unimpaired](https://github.com/tpope/vim-unimpaired) 的风格。

| 键      | 描述                                  | 命令                 |
| -----    | -----------                                  | -------                 |
| `]d`     | 转到下一个诊断（**LSP**）              | `goto_next_diag`        |
| `[d`     | 转到上一个诊断（**LSP**）          | `goto_prev_diag`        |
| `]D`     | 转到文档中最后一个诊断（**LSP**）  | `goto_last_diag`        |
| `[D`     | 转到文档中第一个诊断（**LSP**） | `goto_first_diag`       |
| `]f`     | 转到下一个函数（**TS**）                 | `goto_next_function`    |
| `[f`     | 转到上一个函数（**TS**）             | `goto_prev_function`    |
| `]t`     | 转到下一个类型定义（**TS**）          | `goto_next_class`       |
| `[t`     | 转到上一个类型定义（**TS**）      | `goto_prev_class`       |
| `]a`     | 转到下一个参数（**TS**）       | `goto_next_parameter`   |
| `[a`     | 转到上一个参数（**TS**）   | `goto_prev_parameter`   |
| `]c`     | 转到下一个注释（**TS**）                  | `goto_next_comment`     |
| `[c`     | 转到上一个注释（**TS**）              | `goto_prev_comment`     |
| `]e`     | 转到下一个条目（**TS**）                    | `goto_next_entry`       |
| `[e`     | 转到上一个条目（**TS**）                | `goto_prev_entry`       |
| `]T`     | 转到下一个测试（**TS**）                     | `goto_next_test`        |
| `[T`     | 转到上一个测试（**TS**）                 | `goto_prev_test`        |
| `]p`     | 转到下一个段落                         | `goto_next_paragraph`   |
| `[p`     | 转到上一个段落                     | `goto_prev_paragraph`   |
| `]g`     | 转到下一个变更                            | `goto_next_change`      |
| `[g`     | 转到上一个变更                        | `goto_prev_change`      |
| `]G`     | 转到最后一个变更                            | `goto_last_change`      |
| `[G`     | 转到第一个变更                           | `goto_first_change`     |
| `[x`     | 转到下一个（X）HTML 元素                   | `goto_next_xml_element` |
| `]x`     | 转到上一个（X）HTML 元素               | `goto_prev_xml_element` |
| `]Space` | 在下方添加新行                            | `add_newline_below`     |
| `[Space` | 在上方添加新行                            | `add_newline_above`     |

## 插入模式 {#insert-mode}

通过在[普通模式](#normal-mode)下键入 `i` 进入。

插入模式绑定默认最少。Helix 被设计为模态编辑器，这体现在用户体验和内部机制中。只有在从插入模式退出到普通模式时，文本更改才会保存为撤销记录。

> 💡 强烈建议新用户学习模态编辑范式以获得最流畅的体验。

| 键                                         | 描述                 | 命令                  |
| -----                                       | -----------                 | -------                  |
| `Escape`                                    | 切换到普通模式       | `normal_mode`            |
| `Ctrl-s`                                    | 提交撤销检查点      | `commit_undo_checkpoint` |
| `Ctrl-x`                                    | 自动补全                | `completion`             |
| `Ctrl-r`                                    | 插入寄存器内容   | `insert_register`        |
| `Ctrl-w`、`Alt-Backspace`                   | 删除前一个单词        | `delete_word_backward`   |
| `Alt-d`、`Alt-Delete`                       | 删除后一个单词            | `delete_word_forward`    |
| `Ctrl-u`                                    | 删除到行首     | `kill_to_line_start`     |
| `Ctrl-k`                                    | 删除到行尾       | `kill_to_line_end`       |
| `Ctrl-h`、`Backspace`、`Shift-Backspace`    | 删除前一个字符        | `delete_char_backward`   |
| `Ctrl-d`、`Delete`                          | 删除后一个字符            | `delete_char_forward`    |
| `Ctrl-j`、`Enter`                           | 插入新行             | `insert_newline`         |
| `Tab`                                       | [智能制表]（可配置）  | `smart_tab`              |
| `Shift-Tab`                                 | 插入制表符                  | `insert_tab`             |

[智能制表]: ./editor.md#editorsmart-tab-section

这些按键不推荐使用，但为不太熟悉模态编辑器的新用户提供。

| 键                                         | 描述                 | 命令                  |
| -----                                       | -----------                 | -------                  |
| `Up`                                        | 移动到上一行       | `move_line_up`           |
| `Down`                                      | 移动到下一行           | `move_line_down`         |
| `Left`                                      | 向后移动一个字符             | `move_char_left`         |
| `Right`                                     | 向前移动一个字符              | `move_char_right`        |
| `PageUp`                                    | 向上翻一页            | `page_up`                |
| `PageDown`                                  | 向下翻一页          | `page_down`              |
| `Home`                                      | 移动到行首          | `goto_line_start`        |
| `End`                                       | 移动到行尾            | `goto_line_end_newline`  |

随着你对模态编辑更加熟悉，你可能希望禁用某些插入模式绑定。你可以通过编辑 `config.toml` 文件来实现。

```toml
[keys.insert]
up = "no_op"
down = "no_op"
left = "no_op"
right = "no_op"
pageup = "no_op"
pagedown = "no_op"
home = "no_op"
end = "no_op"
```

## 选择 / 扩展模式 {#select-mode}

通过在[普通模式](#normal-mode)下键入 `v` 进入。

选择模式与普通模式类似，但会将任何移动操作改为扩展选区而非替换选区。Goto 跳转操作也会变为扩展，因此例如 `vgl` 会将选区扩展到行尾。

搜索也会受到影响。默认情况下，`n` 和 `N` 会移除当前选区并选择下一个搜索匹配项。在按 `n` 或 `N` 之前切换到此模式，可以保留当前选区。在迭代搜索过程中反复开关此模式，可以让你有选择地将搜索项添加到选区中。

## 选择器 {#picker-mode}

在选择器中使用的按键。目前不支持重映射。
更多信息请参见[选择器](./pickers.md)文档页面。[提示](#prompt)键绑定在选择器中同样有效，除非与选择器键绑定冲突。

| 键                          | 描述                                                |
| -----                        | -------------                                              |
| `Shift-Tab`、`Up`、`Ctrl-p`  | 上一个条目                                             |
| `Tab`、`Down`、`Ctrl-n`      | 下一个条目                                                 |
| `PageUp`、`Ctrl-u`           | 向上翻页                                                    |
| `PageDown`、`Ctrl-d`         | 向下翻页                                                  |
| `Home`                       | 转到第一个条目                                          |
| `End`                        | 转到最后一个条目                                           |
| `Enter`                      | 打开选中项                                              |
| `Alt-Enter`                  | 在后台打开选中项，不关闭选择器 |
| `Ctrl-s`                     | 水平打开                                          |
| `Ctrl-v`                     | 垂直打开                                            |
| `Ctrl-t`                     | 切换预览                                             |
| `Escape`、`Ctrl-c`           | 关闭选择器                                               |

## 提示 {#prompt-mode}

在提示中使用的按键。目前不支持重映射。

| 键                                         | 描述                                                             |
| -----                                       | -------------                                                           |
| `Escape`、`Ctrl-c`                          | 关闭提示                                                            |
| `Alt-b`、`Ctrl-Left`                        | 向后移动一个单词                                                         |
| `Ctrl-b`、`Left`                            | 向后移动一个字符                                                         |
| `Alt-f`、`Ctrl-Right`                       | 向前移动一个单词                                                          |
| `Ctrl-f`、`Right`                           | 向前移动一个字符                                                          |
| `Ctrl-e`、`End`                             | 移动到提示末尾                                                         |
| `Ctrl-a`、`Home`                            | 移动到提示开头                                                       |
| `Ctrl-w`、`Alt-Backspace`、`Ctrl-Backspace` | 删除前一个单词                                                    |
| `Alt-d`、`Alt-Delete`、`Ctrl-Delete`        | 删除后一个单词                                                        |
| `Ctrl-u`                                    | 删除到行首                                                 |
| `Ctrl-k`                                    | 删除到行尾                                                   |
| `Backspace`、`Ctrl-h`、`Shift-Backspace`    | 删除前一个字符                                                    |
| `Delete`、`Ctrl-d`                          | 删除后一个字符                                                        |
| `Ctrl-s`                                    | 插入文档光标下的单词，之后可能改为 Ctrl-r Ctrl-w   |
| `Ctrl-p`、`Up`                              | 选择上一条历史记录                                                 |
| `Ctrl-n`、`Down`                            | 选择下一条历史记录                                                     |
| `Ctrl-r`                                    | 插入由后续输入字符选择的寄存器内容     |
| `Tab`                                       | 选择下一个补全项                                             |
| `BackTab`                                   | 选择上一个补全项                                         |
| `Enter`                                     | 打开选中项                                                           |