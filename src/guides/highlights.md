## 添加高亮查询

`highlights.scm` 查询为语法树中的节点分配高亮作用域（`@function`、`@type`、`@keyword` 等）；然后主题将每个作用域映射为一种颜色。高亮查询是每种语言都需要的查询文件。

在为 Helix 贡献代码时，查询文件应放置在 `runtime/queries/{language}/highlights.scm` 中。

## 作用域

完整的高亮作用域列表及其各自用途在[主题页面]中有文档说明。匹配最适合该节点的最特定作用域——例如方法调用是 `@function.method`，而普通字段访问是 `@variable.other.member`。

查询文件可以在第一行使用 `; inherits: <lang>` 来复用其他语言的查询（例如 `tsx` 继承 `typescript`，而 `typescript` 继承 `ecma`）。继承的文件会针对*每个*继承语法进行编译，因此每个捕获在那里也必须有效。

## 优先级

当多个匹配项同时匹配同一段文本时，由两条规则决定哪个捕获获胜：

1. **相同跨度：最后一个匹配获胜。** 在覆盖相同字节的捕获中，文件中出现较晚的模式获胜。将通用规则放在*之前*，将应覆盖它的特定规则放在之后。
2. **嵌套节点：最内层获胜。** 当父节点和子节点都覆盖该文本时，子节点的捕获获胜，无论文件顺序如何。

规则 2 的一个常见结果：捕获你指代的*叶子节点*。包裹节点上的调用捕获会输给内部标识符上的基础 `(identifier) @variable`，因此将 `@function` 放在标识符本身上。

在语法无法区分作用域的情况下，通常使用命名约定作为启发式方法：

```scm
((identifier) @constant
 (#match? @constant "^[A-Z][A-Z_]*$"))
```

## 测试

`cargo xtask query-check [language]` 确认查询文件针对该语法是否有效。`cargo xtask highlight-check [language]` 在 `tests/query/highlights/<language-id>/<name>.<ext>` 中的测试用例上运行真正的高亮器，其中插入符注释行（`// ^ @capture`）断言其上方列处的获胜作用域；这可以捕获 `query-check` 无法看到的优先级错误。`cargo xtask highlight-check --dump <language> <file>` 打印任意文件中每个跨度的获胜捕获。

[themes page]: https://docs.helix-editor.com/themes.html#scopes
