## 使用语法感知移动来移动选区

`Alt-p`、`Alt-o`、`Alt-i` 和 `Alt-n`（或 `Alt` 加方向键）允许你根据选区在语法树中的位置来移动选区。例如，许多语言都有以下函数调用的语法：

```js
func(arg1, arg2, arg3);
```

tree-sitter 可能会将函数调用解析为如下所示的树。

```tsq
(call
  function: (identifier) ; func
  arguments:
    (arguments           ; (arg1, arg2, arg3)
      (identifier)       ; arg1
      (identifier)       ; arg2
      (identifier)))     ; arg3
```

使用 `:tree-sitter-subtree` 查看主选区的语法树。以更直观的树形格式表示：

```text
            ┌────┐
            │call│
      ┌─────┴────┴─────┐
      │                │
┌─────▼────┐      ┌────▼────┐
│identifier│      │arguments│
│  "func"  │ ┌────┴───┬─────┴───┐
└──────────┘ │        │         │
             │        │         │
   ┌─────────▼┐  ┌────▼─────┐  ┌▼─────────┐
   │identifier│  │identifier│  │identifier│
   │  "arg1"  │  │  "arg2"  │  │  "arg3"  │
   └──────────┘  └──────────┘  └──────────┘
```

如果你的选区包裹了 `arg1`（见上方的树形图），使用 `Alt-n` 将会选择语法树中的下一个兄弟节点：`arg2`。

```js
// 原来
func([arg1], arg2, arg3)
// 现在
func(arg1, [arg2], arg3);
```

同样地，`Alt-o` 会将选区展开到父节点，在此例中即为 `arguments` 节点。

```js
func[(arg1, arg2, arg3)];
```

此外，还有一些精细的行为设计，可以防止你因为节点没有兄弟节点而被卡住。当你的选区在 `arg1` 上并使用 `Alt-p` 时，会选则前一个子节点。如果 `arg1` 没有前一个兄弟节点，选区会向上移动到语法树并选择前一个元素。因此，在选区位于 `arg1` 上时使用 `Alt-p`，会将选区移动到 `identifier` 节点 `"func"` 上。

[lang-support]: ./lang-support.md
