# 命令行

- [引号](#quoting)
- [标志](#flags)
- [展开](#expansions)
- [例外](#exceptions)

命令行用于执行[可键入命令](./commands.md#typable-commands)，例如 `:write` 或 `:quit`。按 `:` 键激活命令行。

可键入命令可选择接受参数。例如 `:write` 接受一个可选路径来写入文件内容。命令行还支持参数的引号语法、用于修改命令行为的标志，以及*展开*——一种从编辑器插入值的方式。大多数命令支持这些功能，但有些命令具有自定义解析规则（请参见下面的[例外](#exceptions)）。

## 引号 {#quoting}

默认情况下，可键入命令参数按制表符和空格字符分割。例如 `:open README.md CHANGELOG.md` 应打开两个文件：`README.md` 和 `CHANGELOG.md`。包含空格的参数可以用单引号（`'`）或反引号（`` ` ``）括起来，以防止空格分隔参数，例如 `:open 'a b.txt'`。

双引号的使用方式相同，但双引号会*展开*其内部内容。例如 `:echo "%{cursor_line}"` 可能会打印 `1`，因为 `cursor_line` 变量被展开了。而 `:echo '%{cursor_line}'` 则按字面意思打印 `%{cursor_line}`：单引号或反引号内的内容按原样解释。

在 Unix 系统上，反斜杠字符可用于转义某些字符，具体取决于使用位置。在未用引号括起来的参数中，反斜杠可用于转义空格或制表符：`:open a\ b.txt` 等同于 `:open 'a b.txt'`。反斜杠也可用于转义引号字符（`'`、`` ` ``、`"`）或参数开头使用的百分号（`%`）。例如 `:echo \%sh{foo}` 打印 `%sh{foo}` 而不是调用 `foo` shell 命令，而 `:echo \"quote` 打印 `"quote`。在 Unix 系统上的任何其他情况下，反斜杠按字面意思处理；在 Windows 上始终按字面意思处理：`:echo \n` 始终打印 `\n`。

## 标志 {#flags}

命令标志是可选的开关，用于改变命令的行为。例如 `:sort` 命令接受一个可选的 `--reverse`（或简写 `-r`）标志，使排序命令反转排序方向。键入 `-` 字符会显示当前命令可用标志的补全（如果有的话）。

`--` 标志表示标志的结束。`--` 之后的所有参数都被视为位置参数：`:open -- -a.txt` 打开一个名为 `-a.txt` 的文件。

## 展开 {#expansions}

展开是 Helix 在命令行中识别并替换的模式。Helix 将以百分号（`%`）开头的任何内容识别为展开，例如 `%sh{echo hi!}`。展开在 `:echo` 或 `:noop` 等命令中执行简单脚本时特别有用。例如：

```toml
[keys.normal]
# 将当前行的 git blame 信息打印到状态行。
space.B = ":echo %sh{git blame -L %{cursor_line},+1 %{buffer_name}}"
```

展开的形式为 `%[<kind>]<open><contents><close>`。例如在 `%sh{echo hi!}` 中，kind 为 `sh`（shell 展开），内容为 "echo hi!"，`{` 和 `}` 分别作为开闭分隔符。以下开/关字符被识别为展开分隔符对：`(`/`)`、`[`/`]`、`{`/`}` 和 `<`/`>`。此外，也可以使用单个字符 `'`、`"` 或 `|` 代替：`%{cursor_line}` 等同于 `%<cursor_line>`、`%[cursor_line]` 或 `%|cursor_line|`。

要转义百分号（`%`），请连续使用两个百分号。例如，要执行 shell 命令 `date -u +'%Y-%m-%d'`，请使用 `:echo %sh{date -u +'%%Y-%%m-%%d'}`。

当未提供 `<kind>` 时，Helix 将展开一个**变量**。例如 `%{cursor_line}` 可用作参数来插入行号。例如 `:echo %{cursor_line}` 可能会在状态行打印 `1`。

下列变量是可用的：

| 变量名 | 描述 |
| --- | --- |
| `cursor_line` | 当前焦点文档中主光标所在的行号，从 1 开始计数。 |
| `cursor_column` | 当前焦点文档中主光标所在的列号，从 1 开始计数。按从行首开始的字形簇数量计算，而非字节或码点。 |
| `buffer_name` | 当前焦点文档的相对路径。对于暂存缓冲区，则展开为 `[scratch]`。 |
| `file_path_absolute` | 当前焦点文档的绝对路径。对于暂存缓冲区，默认为当前工作目录。 |
| `line_ending` | 包含当前焦点文档换行符的字符串。例如在 Unix 系统上通常为换行符（`\n`），但在 Windows 系统上可能为回车加换行（`\r\n`）。当前焦点文档的换行符类型可通过 `:line-ending` 命令查看。 |
| `current_working_directory` | 当前工作目录。 |
| `workspace_directory` | 当前工作目录的最近祖先目录，该目录包含 `.git`、`.svn`、`jj` 或 `.helix`。 |
| `language` | 包含当前焦点文档语言名称的字符串。 |
| `selection` | 包含当前焦点文档主选区内容的字符串。 |
| `selection_line_start` | 当前焦点文档中主选区起始行号，从 1 开始计数。 |
| `selection_line_end` | 当前焦点文档中主选区结束行号，从 1 开始计数。 |

除编辑器变量外，还可使用以下展开：

* Unicode `%u{..}`。内容可包含最多六个十六进制数字，对应一个 Unicode 码点值。例如 `:echo %u{25CF}` 会在状态行打印 `●`。
* Shell `%sh{..}`。内容将传递给配置的 shell 命令。例如 `:echo %sh{echo "20 * 5" | bc}` 在使用安装了 `echo` 和 `bc` 计算器的 shell 时，可能会在状态行打印 `100`。Shell 展开会递归求值。例如 `%sh{echo '%{buffer_name}:%{cursor_line}'}` 会执行类似 `echo 'README.md:1'` 的命令：在执行 shell 命令之前，`%sh{..}` 展开内的变量会先被求值。
* 寄存器 `%reg{..}`。内容应为单个字符，代表寄存器名称。例如先执行 `:set-register a hello world`，再执行 `echo %reg{a}`，会在状态行打印 `hello world`。

如上所述，双引号可用于括起包含空格的参数，但与单引号或反引号不同，双引号内的内容也支持展开。例如 `:echo "circle: %u{25CF}"` 会在状态行打印 `circle: ●`，而 `:echo 'circle: %u{25CF}'` 则打印 `circle: %u{25CF}`。

请注意，展开仅在命令模式下按下 Enter 键时才会被求值。

## 例外 {#exceptions}

以下命令支持展开，但不会解释引号，而是将给定参数直接传递给 shell 程序：

* `:insert-output`
* `:append-output`
* `:pipe`
* `:pipe-to`
* `:run-shell-command`

例如执行 `:sh echo "%{buffer_name}:%{cursor_column}"` 会将类似 `echo "README.md:1"` 的文本作为参数传递给 shell 程序：展开会被求值，但引号不会被解释。如上所述，在 shell 命令中可以通过将百分号加倍来使用百分号字符。要插入类似 `date -u +'%Y-%m-%d'` 这样的命令输出，可使用 `:insert-output date -u +'%%Y-%%m-%%d'`。

`:set-option` 和 `:toggle-option` 命令对第一个参数（配置选项名称）使用常规解析，并根据配置选项的类型解析其余部分。`:set-option` 将第二个参数解释为字符串（用于字符串类型的配置选项），其余内容则解析为 JSON。

`:toggle-option` 的行为取决于作为第一个参数提供的配置选项的 JSON 类型：

* 布尔值：只需提供配置选项名称。例如 `:toggle-option auto-format` 会翻转 `auto-format` 选项。
* 字符串：命令行的其余部分按常规引号规则解析。例如 `:toggle-option indent-heuristic hybrid tree-sitter simple` 会在每次调用该命令时在 "hybrid"、"tree-sitter" 和 "simple" 值之间循环。
* 数字、数组和对象：命令行的其余部分解析为 JSON 值流。例如 `:toggle-option rulers [81] [51, 73]` 会在 `[81]` 和 `[51, 73]` 之间循环。

向 `:toggle-option` 提供多个值时，不应有重复项。例如 `:toggle-option indent-heuristic hybrid simple tree-sitter simple` 只会在 "hybrid" 和 "tree-sitter" 之间切换。

`:lsp-workspace-command` 的工作方式与 `:toggle-option` 类似。第一个参数（如果存在）按常规规则解析。行中的其余部分解析为 JSON 值。与 `:toggle-option` 不同，命令的字符串参数必须加引号。例如 `:lsp-workspace-command lsp.Command "foo" "bar"`。