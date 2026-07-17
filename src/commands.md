# 命令

- [可键入命令](#typable-commands)
- [无参命令](#static-commands)

## 可键入命令 {#typable-commands}

可键入命令可以接受参数。可通过按 `:` 进入。内置命令有：

{{#include ./generated/typable-cmd.md}}

## 静态命令 {#static-commands}

静态命令不接受参数，可以绑定到按键上。静态命令也可以通过命令选取器（`<space>?`）执行。内置命令有：

{{#include ./generated/static-cmd.md}}
