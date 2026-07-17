| 名称 | 描述 | 默认键绑定 |
| --- | --- | --- |
| `no_op` | 无操作 |  |
| `move_char_left` | 向左移动 | normal: `` h ``, `` <left> ``, insert: `` <left> `` |
| `move_char_right` | 向右移动 | normal: `` l ``, `` <right> ``, insert: `` <right> `` |
| `move_line_up` | 向上移动（按行） | normal: `` gk `` |
| `move_line_down` | 向下移动（按行） | normal: `` gj `` |
| `move_visual_line_up` | 向上移动（按屏幕行） | normal: `` k ``, `` <up> ``, insert: `` <up> `` |
| `move_visual_line_down` | 向下移动（按屏幕行） | normal: `` j ``, `` <down> ``, insert: `` <down> `` |
| `extend_char_left` | 向左扩展选区 | select: `` h ``, `` <left> `` |
| `extend_char_right` | 向右扩展选区 | select: `` l ``, `` <right> `` |
| `extend_line_up` | 向上扩展选区（按行） | select: `` gk `` |
| `extend_line_down` | 向下扩展选区（按行） | select: `` gj `` |
| `extend_visual_line_up` | 向上扩展选区（按屏幕行） | select: `` k ``, `` <up> `` |
| `extend_visual_line_down` | 向下扩展选区（按屏幕行） | select: `` j ``, `` <down> `` |
| `copy_selection_on_next_line` | 将选区复制到下一行 | normal: `` C ``, select: `` C `` |
| `copy_selection_on_prev_line` | 将选区复制到上一行 | normal: `` <A-C> ``, select: `` <A-C> `` |
| `move_next_word_start` | 移到下一个单词开头 | normal: `` w `` |
| `move_prev_word_start` | 移到上一个单词开头 | normal: `` b `` |
| `move_next_word_end` | 移到下一个单词结尾 | normal: `` e `` |
| `move_prev_word_end` | 移到上一个单词结尾 |  |
| `move_next_long_word_start` | 移到下一个长单词开头（仅按空白分隔） | normal: `` W `` |
| `move_prev_long_word_start` | 移到上一个长单词开头 | normal: `` B `` |
| `move_next_long_word_end` | 移到下一个长单词结尾 | normal: `` E `` |
| `move_prev_long_word_end` | 移到上一个长单词结尾 |  |
| `move_next_sub_word_start` | 移到下一个子单词开头（驼峰/下划线分词） |  |
| `move_prev_sub_word_start` | 移到上一个子单词开头 |  |
| `move_next_sub_word_end` | 移到下一个子单词结尾 |  |
| `move_prev_sub_word_end` | 移到上一个子单词结尾 |  |
| `move_parent_node_end` | 移到父语法节点的末尾 | normal: `` <A-e> `` |
| `move_parent_node_start` | 移到父语法节点的开头 | normal: `` <A-b> `` |
| `extend_next_word_start` | 扩展选区到下一个单词开头 | select: `` w `` |
| `extend_prev_word_start` | 扩展选区到上一个单词开头 | select: `` b `` |
| `extend_next_word_end` | 扩展选区到下一个单词结尾 | select: `` e `` |
| `extend_prev_word_end` | 扩展选区到上一个单词结尾 |  |
| `extend_next_long_word_start` | 扩展选区到下一个长单词开头 | select: `` W `` |
| `extend_prev_long_word_start` | 扩展选区到上一个长单词开头 | select: `` B `` |
| `extend_next_long_word_end` | 扩展选区到下一个长单词结尾 | select: `` E `` |
| `extend_prev_long_word_end` | 扩展选区到上一个长单词结尾 |  |
| `extend_next_sub_word_start` | 扩展选区到下一个子单词开头 |  |
| `extend_prev_sub_word_start` | 扩展选区到上一个子单词开头 |  |
| `extend_next_sub_word_end` | 扩展选区到下一个子单词结尾 |  |
| `extend_prev_sub_word_end` | 扩展选区到上一个子单词结尾 |  |
| `extend_parent_node_end` | 扩展选区到父语法节点的末尾 | select: `` <A-e> `` |
| `extend_parent_node_start` | 扩展选区到父语法节点的开头 | select: `` <A-b> `` |
| `find_till_char` | 移动到下一个字符之前 | normal: `` t `` |
| `find_next_char` | 移动到下一个字符处 | normal: `` f `` |
| `extend_till_char` | 扩展选区到下一个字符之前 | select: `` t `` |
| `extend_next_char` | 扩展选区到下一个字符处 | select: `` f `` |
| `till_prev_char` | 移动到上一个字符之前 | normal: `` T `` |
| `find_prev_char` | 移动到上一个字符处 | normal: `` F `` |
| `extend_till_prev_char` | 扩展选区到上一个字符之前 | select: `` T `` |
| `extend_prev_char` | 扩展选区到上一个字符处 | select: `` F `` |
| `repeat_last_motion` | 重复上一次移动操作 | normal: `` <A-.> ``, select: `` <A-.> `` |
| `replace` | 用新字符替换当前字符 | normal: `` r ``, select: `` r `` |
| `switch_case` | 切换大小写 | normal: `` ~ ``, select: `` ~ `` |
| `switch_to_uppercase` | 转为大写 | normal: `` <A-`> ``, select: `` <A-`> `` |
| `switch_to_lowercase` | 转为小写 | normal: `` ` ``, select: `` ` `` |
| `page_up` | 向上翻页 | normal: `` <C-b> ``, `` Z<C-b> ``, `` z<C-b> ``, `` <pageup> ``, `` Z<pageup> ``, `` z<pageup> ``, select: `` <C-b> ``, `` Z<C-b> ``, `` z<C-b> ``, `` <pageup> ``, `` Z<pageup> ``, `` z<pageup> ``, insert: `` <pageup> `` |
| `page_down` | 向下翻页 | normal: `` <C-f> ``, `` Z<C-f> ``, `` z<C-f> ``, `` <pagedown> ``, `` Z<pagedown> ``, `` z<pagedown> ``, select: `` <C-f> ``, `` Z<C-f> ``, `` z<C-f> ``, `` <pagedown> ``, `` Z<pagedown> ``, `` z<pagedown> ``, insert: `` <pagedown> `` |
| `half_page_up` | 向上翻半页 |  |
| `half_page_down` | 向下翻半页 |  |
| `page_cursor_up` | 翻页并将光标移向上方 |  |
| `page_cursor_down` | 翻页并将光标移向下方 |  |
| `page_cursor_half_up` | 翻半页并将光标移向上方 | normal: `` <C-u> ``, `` Z<C-u> ``, `` z<C-u> ``, `` Z<backspace> ``, `` z<backspace> ``, select: `` <C-u> ``, `` Z<C-u> ``, `` z<C-u> ``, `` Z<backspace> ``, `` z<backspace> `` |
| `page_cursor_half_down` | 翻半页并将光标移向下方 | normal: `` <C-d> ``, `` Z<C-d> ``, `` z<C-d> ``, `` Z<space> ``, `` z<space> ``, select: `` <C-d> ``, `` Z<C-d> ``, `` z<C-d> ``, `` Z<space> ``, `` z<space> `` |
| `select_all` | 全选当前文档 | normal: `` % ``, select: `` % `` |
| `select_regex` | 在选区中选中所有正则匹配项 | normal: `` s ``, select: `` s `` |
| `split_selection` | 按正则匹配拆分选区 | normal: `` S ``, select: `` S `` |
| `split_selection_on_newline` | 按换行拆分选区 | normal: `` <A-s> ``, select: `` <A-s> `` |
| `merge_selections` | 合并所有选区 | normal: `` <A-minus> ``, select: `` <A-minus> `` |
| `merge_consecutive_selections` | 合并相邻的选区 | normal: `` <A-_> ``, select: `` <A-_> `` |
| `search` | 向前搜索正则模式 | normal: `` / ``, `` Z/ ``, `` z/ ``, select: `` / ``, `` Z/ ``, `` z/ `` |
| `rsearch` | 向后搜索正则模式 | normal: `` ? ``, `` Z? ``, `` z? ``, select: `` ? ``, `` Z? ``, `` z? `` |
| `search_next` | 选择下一个搜索匹配项 | normal: `` n ``, `` Zn ``, `` zn ``, select: `` Zn ``, `` zn `` |
| `search_prev` | 选择上一个搜索匹配项 | normal: `` N ``, `` ZN ``, `` zN ``, select: `` ZN ``, `` zN `` |
| `extend_search_next` | 将下一个匹配项加入选区 | select: `` n `` |
| `extend_search_prev` | 将上一个匹配项加入选区 | select: `` N `` |
| `search_selection` | 将当前选区内容作为搜索模式 | normal: `` <A-*> ``, select: `` <A-*> `` |
| `search_selection_detect_word_boundaries` | 将选区作为搜索模式，并自动用 `\b` 包裹单词边界 | normal: `` * ``, select: `` * `` |
| `make_search_word_bounded` | 将当前搜索改为单词边界模式 |  |
| `global_search` | 在工作区中全局搜索 | normal: `` <space>/ ``, select: `` <space>/ `` |
| `extend_line` | 选中当前行；若已选中，则基于锚点扩展 |  |
| `extend_line_below` | 选中当前行；若已选中，扩展至下一行 | normal: `` x ``, select: `` x `` |
| `extend_line_above` | 选中当前行；若已选中，扩展至上一行 |  |
| `select_line_above` | 选中当前行；若已选中，基于锚点扩展或收缩到上一行 |  |
| `select_line_below` | 选中当前行；若已选中，基于锚点扩展或收缩到下一行 |  |
| `extend_to_line_bounds` | 将选区扩展到行首尾 | normal: `` X ``, select: `` X `` |
| `shrink_to_line_bounds` | 将选区收缩到行首尾 | normal: `` <A-x> ``, select: `` <A-x> `` |
| `delete_selection` | 删除选区 | normal: `` d ``, select: `` d `` |
| `delete_selection_noyank` | 删除选区（不复制到寄存器） | normal: `` <A-d> ``, select: `` <A-d> `` |
| `change_selection` | 更改选区（删除并进入插入模式） | normal: `` c ``, select: `` c `` |
| `change_selection_noyank` | 更改选区（不复制到寄存器） | normal: `` <A-c> ``, select: `` <A-c> `` |
| `collapse_selection` | 将多选区折叠为单个光标 | normal: `` ; ``, select: `` ; `` |
| `flip_selections` | 翻转选区的光标与锚点 | normal: `` <A-;> ``, select: `` <A-;> `` |
| `ensure_selections_forward` | 确保所有选区方向朝前 | normal: `` <A-:> ``, select: `` <A-:> `` |
| `insert_mode` | 在选区前插入 | normal: `` i ``, select: `` i `` |
| `append_mode` | 在选区后追加 | normal: `` a ``, select: `` a `` |
| `command_mode` | 进入命令行模式 | normal: `` : ``, select: `` : `` |
| `file_picker` | 打开文件选择器（工作区） | normal: `` <space>f ``, select: `` <space>f `` |
| `file_picker_in_current_buffer_directory` | 在当前文件所在目录打开文件选择器 |  |
| `file_picker_in_current_directory` | 在当前工作目录打开文件选择器 | normal: `` <space>F ``, select: `` <space>F `` |
| `file_explorer` | 在工作区根目录打开文件浏览器 | normal: `` <space>e ``, select: `` <space>e `` |
| `file_explorer_in_current_buffer_directory` | 在当前文件所在目录打开文件浏览器 | normal: `` <space>. ``, select: `` <space>. `` |
| `file_explorer_in_current_directory` | 在当前工作目录打开文件浏览器 |  |
| `code_action` | 执行代码操作（如快速修复） | normal: `` <space>a ``, select: `` <space>a `` |
| `buffer_picker` | 打开缓冲区选择器 | normal: `` <space>b ``, select: `` <space>b `` |
| `jumplist_picker` | 打开跳转列表选择器 | normal: `` <space>j ``, select: `` <space>j `` |
| `symbol_picker` | 打开文档符号选择器 |  |
| `syntax_symbol_picker` | 基于语法树打开符号选择器 |  |
| `lsp_or_syntax_symbol_picker` | 优先用 LSP，否则用语法树打开符号选择器 | normal: `` <space>s ``, select: `` <space>s `` |
| `changed_file_picker` | 打开 Git 变更文件选择器 | normal: `` <space>g ``, select: `` <space>g `` |
| `select_references_to_symbol_under_cursor` | 选择光标下符号的所有引用 | normal: `` <space>h ``, select: `` <space>h `` |
| `workspace_symbol_picker` | 打开工作区符号选择器 |  |
| `syntax_workspace_symbol_picker` | 基于语法树打开工作区符号选择器 |  |
| `lsp_or_syntax_workspace_symbol_picker` | 优先用 LSP，否则用语法树打开工作区符号选择器 | normal: `` <space>S ``, select: `` <space>S `` |
| `diagnostics_picker` | 打开文档诊断选择器 | normal: `` <space>d ``, select: `` <space>d `` |
| `workspace_diagnostics_picker` | 打开工作区诊断选择器 | normal: `` <space>D ``, select: `` <space>D `` |
| `last_picker` | 重新打开上一次使用的选择器 | normal: `` <space>' ``, select: `` <space>' `` |
| `insert_at_line_start` | 在行首插入 | normal: `` I ``, select: `` I `` |
| `insert_at_line_end` | 在行尾插入 | normal: `` A ``, select: `` A `` |
| `open_below` | 在选区下方新建一行 | normal: `` o ``, select: `` o `` |
| `open_above` | 在选区上方新建一行 | normal: `` O ``, select: `` O `` |
| `normal_mode` | 进入普通模式 | normal: `` <esc> ``, select: `` v ``, insert: `` <esc> `` |
| `select_mode` | 进入选择扩展模式 | normal: `` v `` |
| `exit_select_mode` | 退出选择模式 | select: `` <esc> `` |
| `goto_definition` | 转到定义 | normal: `` gd ``, select: `` gd `` |
| `goto_declaration` | 转到声明 | normal: `` gD ``, select: `` gD `` |
| `add_newline_above` | 在当前位置上方添加空行 | normal: `` [<space> ``, select: `` [<space> `` |
| `add_newline_below` | 在当前位置下方添加空行 | normal: `` ]<space> ``, select: `` ]<space> `` |
| `goto_type_definition` | 转到类型定义 | normal: `` gy ``, select: `` gy `` |
| `goto_implementation` | 转到实现 | normal: `` gi ``, select: `` gi `` |
| `goto_file_start` | 转到文件开头（或指定行号） | normal: `` gg `` |
| `goto_file_end` | 转到文件末尾 |  |
| `extend_to_file_start` | 扩展选区到文件开头（或指定行） | select: `` gg `` |
| `extend_to_file_end` | 扩展选区到文件末尾 |  |
| `goto_file` | 打开选区中的文件或 URL | normal: `` gf ``, select: `` gf `` |
| `goto_file_hsplit` | 在水平分割中打开文件 | normal: `` <C-w>f ``, `` <space>wf ``, select: `` <C-w>f ``, `` <space>wf `` |
| `goto_file_vsplit` | 在垂直分割中打开文件 | normal: `` <C-w>F ``, `` <space>wF ``, select: `` <C-w>F ``, `` <space>wF `` |
| `goto_reference` | 转到所有引用 | normal: `` gr ``, select: `` gr `` |
| `goto_window_top` | 光标移动到窗口顶部 | normal: `` gt ``, select: `` gt `` |
| `goto_window_center` | 光标移动到窗口中央 | normal: `` gc ``, select: `` gc `` |
| `goto_window_bottom` | 光标移动到窗口底部 | normal: `` gb ``, select: `` gb `` |
| `goto_last_accessed_file` | 切换到最近访问过的文件 | normal: `` ga ``, select: `` ga `` |
| `goto_last_modified_file` | 切换到最近修改过的文件 | normal: `` gm ``, select: `` gm `` |
| `goto_last_modification` | 跳转到上次修改的位置 | normal: `` g. ``, select: `` g. `` |
| `goto_line` | 跳转到指定行 | normal: `` G ``, select: `` G `` |
| `goto_last_line` | 跳转到最后一行 | normal: `` ge `` |
| `extend_to_last_line` | 扩展选区到最后一行 | select: `` ge `` |
| `goto_first_diag` | 跳转到第一个诊断信息 | normal: `` [D ``, select: `` [D `` |
| `goto_last_diag` | 跳转到最后一个诊断信息 | normal: `` ]D ``, select: `` ]D `` |
| `goto_next_diag` | 跳转到下一个诊断信息 | normal: `` ]d ``, select: `` ]d `` |
| `goto_prev_diag` | 跳转到上一个诊断信息 | normal: `` [d ``, select: `` [d `` |
| `goto_next_change` | 跳转到下一个变更（git diff） | normal: `` ]g ``, select: `` ]g `` |
| `goto_prev_change` | 跳转到上一个变更 | normal: `` [g ``, select: `` [g `` |
| `goto_first_change` | 跳转到第一个变更 | normal: `` [G ``, select: `` [G `` |
| `goto_last_change` | 跳转到最后一个变更 | normal: `` ]G ``, select: `` ]G `` |
| `goto_line_start` | 光标移到行首 | normal: `` gh ``, `` <home> ``, select: `` gh ``, insert: `` <home> `` |
| `goto_line_end` | 光标移到行尾 | normal: `` gl ``, `` <end> ``, select: `` gl `` |
| `goto_column` | 跳转到指定列 | normal: `` g\| `` |
| `extend_to_column` | 扩展选区到指定列 | select: `` g\| `` |
| `goto_next_buffer` | 切换到下一个缓冲区 | normal: `` gn ``, select: `` gn `` |
| `goto_previous_buffer` | 切换到上一个缓冲区 | normal: `` gp ``, select: `` gp `` |
| `goto_line_end_newline` | 光标移到行尾的换行符处 | insert: `` <end> `` |
| `goto_first_nonwhitespace` | 光标移到行中第一个非空白字符 | normal: `` gs ``, select: `` gs `` |
| `trim_selections` | 删除选区中多余的空白 | normal: `` _ ``, select: `` _ `` |
| `extend_to_line_start` | 扩展选区到行首 | select: `` <home> `` |
| `extend_to_first_nonwhitespace` | 扩展选区到行中第一个非空白字符 |  |
| `extend_to_line_end` | 扩展选区到行尾 | select: `` <end> `` |
| `extend_to_line_end_newline` | 扩展选区到行尾（含换行符） |  |
| `signature_help` | 显示函数签名提示 |  |
| `smart_tab` | 若光标左侧均为空白则插入制表符，否则执行其他命令 | insert: `` <tab> `` |
| `insert_tab` | 插入制表符 | insert: `` <S-tab> `` |
| `insert_newline` | 插入换行符 | insert: `` <C-j> ``, `` <ret> `` |
| `insert_char_interactive` | 交互式选择一个字符并插入 |  |
| `append_char_interactive` | 交互式选择一个字符并追加 |  |
| `delete_char_backward` | 删除前一个字符 | insert: `` <C-h> ``, `` <backspace> ``, `` <S-backspace> `` |
| `delete_char_forward` | 删除后一个字符 | insert: `` <C-d> ``, `` <del> `` |
| `delete_word_backward` | 删除前一个单词 | insert: `` <C-w> ``, `` <A-backspace> `` |
| `delete_word_forward` | 删除后一个单词 | insert: `` <A-d> ``, `` <A-del> `` |
| `kill_to_line_start` | 删除光标到行首的内容 | insert: `` <C-u> `` |
| `kill_to_line_end` | 删除光标到行尾的内容 | insert: `` <C-k> `` |
| `undo` | 撤销 | normal: `` u ``, select: `` u `` |
| `redo` | 重做 | normal: `` U ``, select: `` U `` |
| `earlier` | 在历史中向后回退 | normal: `` <A-u> ``, select: `` <A-u> `` |
| `later` | 在历史中向前前进 | normal: `` <A-U> ``, select: `` <A-U> `` |
| `commit_undo_checkpoint` | 提交当前状态为撤销检查点 | insert: `` <C-s> `` |
| `yank` | 复制选区内容 | normal: `` y ``, select: `` y `` |
| `yank_to_clipboard` | 将选区复制到系统剪贴板 | normal: `` <space>y ``, select: `` <space>y `` |
| `yank_to_primary_clipboard` | 将选区复制到主剪贴板（X11 选中即复制） |  |
| `yank_joined` | 合并选区行并复制 |  |
| `yank_joined_to_clipboard` | 合并选区行并复制到系统剪贴板 |  |
| `yank_main_selection_to_clipboard` | 将主选区复制到系统剪贴板 | normal: `` <space>Y ``, select: `` <space>Y `` |
| `yank_joined_to_primary_clipboard` | 合并选区行并复制到主剪贴板 |  |
| `yank_main_selection_to_primary_clipboard` | 将主选区复制到主剪贴板 |  |
| `replace_with_yanked` | 用已复制的内容替换当前选区 | normal: `` R ``, select: `` R `` |
| `replace_selections_with_clipboard` | 用系统剪贴板内容替换选区 | normal: `` <space>R ``, select: `` <space>R `` |
| `replace_selections_with_primary_clipboard` | 用主剪贴板内容替换选区 |  |
| `paste_after` | 在选区后粘贴 | normal: `` p ``, select: `` p `` |
| `paste_before` | 在选区前粘贴 | normal: `` P ``, select: `` P `` |
| `paste_clipboard_after` | 在选区后粘贴系统剪贴板内容 | normal: `` <space>p ``, select: `` <space>p `` |
| `paste_clipboard_before` | 在选区前粘贴系统剪贴板内容 | normal: `` <space>P ``, select: `` <space>P `` |
| `paste_primary_clipboard_after` | 在选区后粘贴主剪贴板内容 |  |
| `paste_primary_clipboard_before` | 在选区前粘贴主剪贴板内容 |  |
| `indent` | 缩进选区 | normal: `` <gt> ``, select: `` <gt> `` |
| `unindent` | 取消缩进 | normal: `` <lt> ``, select: `` <lt> `` |
| `format_selections` | 格式化选区 | normal: `` = ``, select: `` = `` |
| `join_selections` | 合并选区中的行 | normal: `` J ``, select: `` J `` |
| `join_selections_space` | 合并行并用空格连接 | normal: `` <A-J> ``, select: `` <A-J> `` |
| `keep_selections` | 保留匹配正则的选区 | normal: `` K ``, select: `` K `` |
| `remove_selections` | 移除匹配正则的选区 | normal: `` <A-K> ``, select: `` <A-K> `` |
| `align_selections` | 按列对齐选区 | normal: `` & ``, select: `` & `` |
| `keep_primary_selection` | 只保留主选区 | normal: `` , ``, select: `` , `` |
| `remove_primary_selection` | 移除主选区 | normal: `` <A-,> ``, select: `` <A-,> `` |
| `completion` | 触发自动补全 | insert: `` <C-x> `` |
| `hover` | 显示光标下内容的文档提示 | normal: `` <space>k ``, select: `` <space>k `` |
| `toggle_comments` | 注释/取消注释当前选区 | normal: `` <C-c> ``, `` <space>c ``, select: `` <C-c> ``, `` <space>c `` |
| `toggle_line_comments` | 行注释/取消注释 | normal: `` <space><A-c> ``, select: `` <space><A-c> `` |
| `toggle_block_comments` | 块注释/取消注释 | normal: `` <space>C ``, select: `` <space>C `` |
| `rotate_selections_forward` | 向前轮换选区的顺序 | normal: `` ) ``, select: `` ) `` |
| `rotate_selections_backward` | 向后轮换选区的顺序 | normal: `` ( ``, select: `` ( `` |
| `rotate_selection_contents_forward` | 向前轮换选区内容 | normal: `` <A-)> ``, select: `` <A-)> `` |
| `rotate_selection_contents_backward` | 向后轮换选区内容 | normal: `` <A-(> ``, select: `` <A-(> `` |
| `reverse_selection_contents` | 反转选区内容的顺序 |  |
| `expand_selection` | 将选区扩展到父级语法节点 | normal: `` <A-o> ``, `` <A-up> ``, select: `` <A-o> ``, `` <A-up> `` |
| `shrink_selection` | 将选区收缩到之前扩展的节点 | normal: `` <A-i> ``, `` <A-down> ``, select: `` <A-i> ``, `` <A-down> `` |
| `select_next_sibling` | 选择语法树中的下一个兄弟节点 | normal: `` <A-n> ``, `` <A-right> ``, select: `` <A-n> ``, `` <A-right> `` |
| `select_prev_sibling` | 选择语法树中的上一个兄弟节点 | normal: `` <A-p> ``, `` <A-left> ``, select: `` <A-p> ``, `` <A-left> `` |
| `select_all_siblings` | 选择当前节点的所有兄弟节点 | normal: `` <A-a> ``, select: `` <A-a> `` |
| `select_all_children` | 选择当前节点的所有子节点 | normal: `` <A-I> ``, `` <S-A-down> ``, select: `` <A-I> ``, `` <S-A-down> `` |
| `jump_forward` | 在跳转列表中向前跳转 | normal: `` <C-i> ``, `` <tab> ``, select: `` <C-i> ``, `` <tab> `` |
| `jump_backward` | 在跳转列表中向后跳转 | normal: `` <C-o> ``, select: `` <C-o> `` |
| `save_selection` | 将当前位置保存到跳转列表 | normal: `` <C-s> ``, select: `` <C-s> `` |
| `jump_view_right` | 跳转到右侧的窗口 | normal: `` <C-w>l ``, `` <space>wl ``, `` <C-w><C-l> ``, `` <C-w><right> ``, `` <space>w<C-l> ``, `` <space>w<right> ``, select: `` <C-w>l ``, `` <space>wl ``, `` <C-w><C-l> ``, `` <C-w><right> ``, `` <space>w<C-l> ``, `` <space>w<right> `` |
| `jump_view_left` | 跳转到左侧的窗口 | normal: `` <C-w>h ``, `` <space>wh ``, `` <C-w><C-h> ``, `` <C-w><left> ``, `` <space>w<C-h> ``, `` <space>w<left> ``, select: `` <C-w>h ``, `` <space>wh ``, `` <C-w><C-h> ``, `` <C-w><left> ``, `` <space>w<C-h> ``, `` <space>w<left> `` |
| `jump_view_up` | 跳转到上方的窗口 | normal: `` <C-w>k ``, `` <C-w><up> ``, `` <space>wk ``, `` <C-w><C-k> ``, `` <space>w<up> ``, `` <space>w<C-k> ``, select: `` <C-w>k ``, `` <C-w><up> ``, `` <space>wk ``, `` <C-w><C-k> ``, `` <space>w<up> ``, `` <space>w<C-k> `` |
| `jump_view_down` | 跳转到下方的窗口 | normal: `` <C-w>j ``, `` <space>wj ``, `` <C-w><C-j> ``, `` <C-w><down> ``, `` <space>w<C-j> ``, `` <space>w<down> ``, select: `` <C-w>j ``, `` <space>wj ``, `` <C-w><C-j> ``, `` <C-w><down> ``, `` <space>w<C-j> ``, `` <space>w<down> `` |
| `swap_view_right` | 与右侧窗口交换 | normal: `` <C-w>L ``, `` <space>wL ``, select: `` <C-w>L ``, `` <space>wL `` |
| `swap_view_left` | 与左侧窗口交换 | normal: `` <C-w>H ``, `` <space>wH ``, select: `` <C-w>H ``, `` <space>wH `` |
| `swap_view_up` | 与上方窗口交换 | normal: `` <C-w>K ``, `` <space>wK ``, select: `` <C-w>K ``, `` <space>wK `` |
| `swap_view_down` | 与下方窗口交换 | normal: `` <C-w>J ``, `` <space>wJ ``, select: `` <C-w>J ``, `` <space>wJ `` |
| `transpose_view` | 转置窗口布局 | normal: `` <C-w>t ``, `` <space>wt ``, `` <C-w><C-t> ``, `` <space>w<C-t> ``, select: `` <C-w>t ``, `` <space>wt ``, `` <C-w><C-t> ``, `` <space>w<C-t> `` |
| `rotate_view` | 切换到下一个窗口 | normal: `` <C-w>w ``, `` <space>ww ``, `` <C-w><C-w> ``, `` <space>w<C-w> ``, select: `` <C-w>w ``, `` <space>ww ``, `` <C-w><C-w> ``, `` <space>w<C-w> `` |
| `rotate_view_reverse` | 切换到上一个窗口 |  |
| `hsplit` | 水平分割窗口（新窗口在下方） | normal: `` <C-w>s ``, `` <space>ws ``, `` <C-w><C-s> ``, `` <space>w<C-s> ``, select: `` <C-w>s ``, `` <space>ws ``, `` <C-w><C-s> ``, `` <space>w<C-s> `` |
| `hsplit_new` | 水平分割并创建暂存缓冲区 | normal: `` <C-w>ns ``, `` <space>wns ``, `` <C-w>n<C-s> ``, `` <space>wn<C-s> ``, select: `` <C-w>ns ``, `` <space>wns ``, `` <C-w>n<C-s> ``, `` <space>wn<C-s> `` |
| `vsplit` | 垂直分割窗口（新窗口在右侧） | normal: `` <C-w>v ``, `` <space>wv ``, `` <C-w><C-v> ``, `` <space>w<C-v> ``, select: `` <C-w>v ``, `` <space>wv ``, `` <C-w><C-v> ``, `` <space>w<C-v> `` |
| `vsplit_new` | 垂直分割并创建暂存缓冲区 | normal: `` <C-w>nv ``, `` <space>wnv ``, `` <C-w>n<C-v> ``, `` <space>wn<C-v> ``, select: `` <C-w>nv ``, `` <space>wnv ``, `` <C-w>n<C-v> ``, `` <space>wn<C-v> `` |
| `wclose` | 关闭当前窗口 | normal: `` <C-w>q ``, `` <space>wq ``, `` <C-w><C-q> ``, `` <space>w<C-q> ``, select: `` <C-w>q ``, `` <space>wq ``, `` <C-w><C-q> ``, `` <space>w<C-q> `` |
| `wonly` | 关闭其他窗口，仅保留当前窗口 | normal: `` <C-w>o ``, `` <space>wo ``, `` <C-w><C-o> ``, `` <space>w<C-o> ``, select: `` <C-w>o ``, `` <space>wo ``, `` <C-w><C-o> ``, `` <space>w<C-o> `` |
| `select_register` | 选择寄存器 | normal: `` " ``, select: `` " `` |
| `insert_register` | 插入寄存器内容 | insert: `` <C-r> `` |
| `copy_between_registers` | 在两个寄存器间复制内容 |  |
| `align_view_middle` | 将视图滚动到文档中间位置 | normal: `` Zm ``, `` zm ``, select: `` Zm ``, `` zm `` |
| `align_view_top` | 将视图滚动到文档顶部 | normal: `` Zt ``, `` zt ``, select: `` Zt ``, `` zt `` |
| `align_view_center` | 将视图滚动到文档中心 | normal: `` Zc ``, `` Zz ``, `` zc ``, `` zz ``, select: `` Zc ``, `` Zz ``, `` zc ``, `` zz `` |
| `align_view_bottom` | 将视图滚动到文档底部 | normal: `` Zb ``, `` zb ``, select: `` Zb ``, `` zb `` |
| `scroll_up` | 向上滚动视图 | normal: `` Zk ``, `` zk ``, `` Z<up> ``, `` z<up> ``, select: `` Zk ``, `` zk ``, `` Z<up> ``, `` z<up> `` |
| `scroll_down` | 向下滚动视图 | normal: `` Zj ``, `` zj ``, `` Z<down> ``, `` z<down> ``, select: `` Zj ``, `` zj ``, `` Z<down> ``, `` z<down> `` |
| `match_brackets` | 跳转到匹配的括号 | normal: `` mm ``, select: `` mm `` |
| `surround_add` | 添加环绕符号 | normal: `` ms ``, select: `` ms `` |
| `surround_replace` | 替换环绕符号 | normal: `` mr ``, select: `` mr `` |
| `surround_delete` | 删除环绕符号 | normal: `` md ``, select: `` md `` |
| `select_textobject_around` | 选中文本对象（含外层） | normal: `` ma ``, select: `` ma `` |
| `select_textobject_inner` | 选中文本对象（内部） | normal: `` mi ``, select: `` mi `` |
| `goto_next_function` | 跳转到下一个函数 | normal: `` ]f ``, select: `` ]f `` |
| `goto_prev_function` | 跳转到上一个函数 | normal: `` [f ``, select: `` [f `` |
| `goto_next_class` | 跳转到下一个类型定义 | normal: `` ]t ``, select: `` ]t `` |
| `goto_prev_class` | 跳转到上一个类型定义 | normal: `` [t ``, select: `` [t `` |
| `goto_next_parameter` | 跳转到下一个参数 | normal: `` ]a ``, select: `` ]a `` |
| `goto_prev_parameter` | 跳转到上一个参数 | normal: `` [a ``, select: `` [a `` |
| `goto_next_comment` | 跳转到下一个注释 | normal: `` ]c ``, select: `` ]c `` |
| `goto_prev_comment` | 跳转到上一个注释 | normal: `` [c ``, select: `` [c `` |
| `goto_next_test` | 跳转到下一个测试 | normal: `` ]T ``, select: `` ]T `` |
| `goto_prev_test` | 跳转到上一个测试 | normal: `` [T ``, select: `` [T `` |
| `goto_next_xml_element` | 跳转到下一个（X）HTML 元素 | normal: `` ]x ``, select: `` ]x `` |
| `goto_prev_xml_element` | 跳转到上一个（X）HTML 元素 | normal: `` [x ``, select: `` [x `` |
| `goto_next_entry` | 跳转到下一个配对项 | normal: `` ]e ``, select: `` ]e `` |
| `goto_prev_entry` | 跳转到上一个配对项 | normal: `` [e ``, select: `` [e `` |
| `goto_next_paragraph` | 跳转到下一个段落 | normal: `` ]p ``, select: `` ]p `` |
| `goto_prev_paragraph` | 跳转到上一个段落 | normal: `` [p ``, select: `` [p `` |
| `dap_launch` | 启动调试目标 | normal: `` <space>Gl ``, select: `` <space>Gl `` |
| `dap_restart` | 重新启动调试会话 | normal: `` <space>Gr ``, select: `` <space>Gr `` |
| `dap_toggle_breakpoint` | 切换断点 | normal: `` <space>Gb ``, select: `` <space>Gb `` |
| `dap_continue` | 继续执行程序 | normal: `` <space>Gc ``, select: `` <space>Gc `` |
| `dap_pause` | 暂停程序执行 | normal: `` <space>Gh ``, select: `` <space>Gh `` |
| `dap_step_in` | 单步进入 | normal: `` <space>Gi ``, select: `` <space>Gi `` |
| `dap_step_out` | 单步跳出 | normal: `` <space>Go ``, select: `` <space>Go `` |
| `dap_next` | 单步跳过 | normal: `` <space>Gn ``, select: `` <space>Gn `` |
| `dap_variables` | 列出调试变量 | normal: `` <space>Gv ``, select: `` <space>Gv `` |
| `dap_terminate` | 终止调试会话 | normal: `` <space>Gt ``, select: `` <space>Gt `` |
| `dap_edit_condition` | 编辑当前行的断点条件 | normal: `` <space>G<C-c> ``, select: `` <space>G<C-c> `` |
| `dap_edit_log` | 编辑当前行的断点日志信息 | normal: `` <space>G<C-l> ``, select: `` <space>G<C-l> `` |
| `dap_switch_thread` | 切换当前线程 | normal: `` <space>Gst ``, select: `` <space>Gst `` |
| `dap_switch_stack_frame` | 切换栈帧 | normal: `` <space>Gsf ``, select: `` <space>Gsf `` |
| `dap_enable_exceptions` | 启用异常断点 | normal: `` <space>Ge ``, select: `` <space>Ge `` |
| `dap_disable_exceptions` | 禁用异常断点 | normal: `` <space>GE ``, select: `` <space>GE `` |
| `shell_pipe` | 通过 Shell 命令处理选区 | normal: `` \| ``, select: `` \| `` |
| `shell_pipe_to` | 将选区传给 Shell 命令，忽略输出 | normal: `` <A-\|> ``, select: `` <A-\|> `` |
| `shell_insert_output` | 在选区前插入 Shell 命令的输出 | normal: `` ! ``, select: `` ! `` |
| `shell_append_output` | 在选区后追加 Shell 命令的输出 | normal: `` <A-!> ``, select: `` <A-!> `` |
| `shell_keep_pipe` | 用 Shell 命令过滤选区（保留匹配项） | normal: `` $ ``, select: `` $ `` |
| `suspend` | 挂起编辑器并返回 Shell | normal: `` <C-z> ``, select: `` <C-z> `` |
| `rename_symbol` | 重命名符号 | normal: `` <space>r ``, select: `` <space>r `` |
| `increment` | 增加光标下的数字 | normal: `` <C-a> ``, select: `` <C-a> `` |
| `decrement` | 减少光标下的数字 | normal: `` <C-x> ``, select: `` <C-x> `` |
| `record_macro` | 开始录制宏 | normal: `` Q ``, select: `` Q `` |
| `replay_macro` | 回放宏 | normal: `` q ``, select: `` q `` |
| `command_palette` | 打开命令面板 | normal: `` <space>? ``, select: `` <space>? `` |
| `goto_word` | 跳转到双字符标签 | normal: `` gw `` |
| `extend_to_word` | 扩展选区到双字符标签 | select: `` gw `` |
| `goto_next_tabstop` | 跳转到下一个代码片段占位符 |  |
| `goto_prev_tabstop` | 跳转到上一个代码片段占位符 |  |
| `rotate_selections_first` | 将第一个选区设为主选区 |  |
| `rotate_selections_last` | 将最后一个选区设为主选区 |  |