## 使用文本对象选择和操作文本

在 Helix 中，文本对象是一种以结构化方式选择、操作和处理文本的方式。它们允许你根据文本的结构或用途来引用文本块，例如单词、句子、段落，甚至是函数或代码块。

![文本对象演示](https://user-images.githubusercontent.com/23398472/124231131-81a4bb00-db2d-11eb-9d10-8e577ca7b177.gif)
![文本对象 tree-sitter 演示](https://user-images.githubusercontent.com/23398472/132537398-2a2e0a54-582b-44ab-a77f-eb818942203d.gif)

- `ma` - 选择对象周围（Vim 中的 `va`，Kakoune 中的 `<alt-a>`）
- `mi` - 选择对象内部（Vim 中的 `vi`，Kakoune 中的 `<alt-i>`）

| `mi` 或 `ma` 后的按键 | 所选文本对象         |
| ---                    | ---                 |
| `w`                    | 单词                |
| `W`                    | 长单词（仅按空白分隔） |
| `p`                    | 段落                |
| `(`, `[`, `'`, 等     | 指定的成对环绕符号   |
| `m`                    | 最近的成对环绕符号   |
| `f`                    | 函数                |
| `t`                    | 类型（或类）         |
| `a`                    | 参数                |
| `c`                    | 注释                |
| `T`                    | 测试                |
| `g`                    | 变更（diff）        |
| `x`                    | （X）HTML 元素      |

> 💡 `f`、`t` 等功能需要当前文档激活 tree-sitter 语法，并且需要特殊的 tree-sitter 查询文件才能正常工作。目前[只有部分语法](./lang-support.md)实现了该查询文件。欢迎贡献！

## 使用 tree-sitter 文本对象进行导航

使用 tree-sitter 和文本对象查询，可以在函数、类、参数和其他元素之间导航。例如，使用 `]f` 移动到下一个函数，使用 `[t` 移动到上一个类型，以此类推。

![Tree-sitter 导航演示](https://user-images.githubusercontent.com/23398472/152332550-7dfff043-36a2-4aec-b8f2-77c13eb56d6f.gif)

完整参考请参见键绑定文档中的 [unimpaired](./keymap.md#unimpaired) 部分。

> 💡 此功能依赖于 tree-sitter 文本对象，并且需要相应的查询文件才能正常工作。

