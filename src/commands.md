# 命令

- [Typable commands](#typable-commands)
- [Static commands](#static-commands)

## 可输入命令

可输入命令用于命令模式，可以接受参数。命令模式可通过按 `:` 进入。内置的可输入命令有：

{{#include ./generated/typable-cmd.md}}

## 静态命令

静态命令不接受参数，可以绑定到按键上。静态命令也可以通过命令选取器（`<space>?`）执行。内置的静态命令有：

{{#include ./generated/static-cmd.md}}
