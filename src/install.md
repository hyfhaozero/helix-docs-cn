# 安装Helix

Helix通常通过您系统使用的包管理器[包管理器](./package-managers.md)进行安装. 
请注意:

- 获取最新的Nightly版本的Helix, 您需要
  [从源代码构建Helix](./building-from-source.md).

- 为了充分利用Helix的功能, 请您安装您首选的编程语言的语言服务器. (可在
  [wiki](https://github.com/helix-editor/helix/wiki/Language-Server-Configurations)
  查看说明)

## 下载预构建的二进制文件

从[GitHub Releases page](https://github.com/helix-editor/helix/releases).下载最新的预构建二进制文件.
预构建二进制文件包含二进制文件 `hx` 和一个 `runtime` 目录.
设置Helix:

1. 将系统中的 `hx` 二进制文件添加到 `$PATH`.
2. 将 `runtime` 目录复制到 `hx` 搜索运行时文件的路径. 在Linux/macOS上, `runtime`目录通常是 `~/.config/helix/runtime`.

要查看 `hx` 搜索的运行时目录, 请运行命令 `hx --health`. 如果需要, 您可以设置环境变量
  `HELIX_RUNTIME`.
