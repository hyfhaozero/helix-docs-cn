## 从包管理器安装

- [Linux](#linux)
  - [Debian](#debian)
  - [Ubuntu/Mint](#ubuntumint)
  - [Fedora/RHEL](#fedorarhel)
  - [Arch Linux extra](#arch-linux-extra)
  - [NixOS](#nixos)
  - [Flatpak](#flatpak)
  - [Snap](#snap)
  - [AppImage](#appimage)
  - [Linux Homebrew Core](#linux-homebrew-core)
- [macOS](#macos)
  - [Homebrew Core](#homebrew-core)
  - [MacPorts](#macports)
- [Windows](#windows)
  - [Winget](#winget)
  - [Scoop](#scoop)
  - [Chocolatey](#chocolatey)
  - [Packably](#packably)
  - [MSYS2](#msys2)

[![打包状态](https://repology.org/badge/vertical-allrepos/helix-editor.svg)](https://repology.org/project/helix-editor/versions)

## Linux

以下第三方仓库可用：

### Debian

```sh
sudo apt install hx
```

如果你的系统版本低于 Debian 13，请按照 [Ubuntu/Mint](#ubuntumint) 的步骤操作。

### Ubuntu/Mint

从[发布页面](https://github.com/helix-editor/helix/releases/latest)安装 Debian 软件包。

如果你的系统版本低于 Ubuntu 22.04、Mint 21 或 Debian 12，你可以在本地[从源码构建](./building-from-source.md#building-the-debian-package)构建 `.deb` 文件。

### Fedora/RHEL

```sh
sudo dnf install helix
```

### Arch Linux extra

发布版本可在 `extra` 软件源中找到：
```sh
sudo pacman -S helix
```

> 💡 从 Arch Linux `extra` 仓库安装后，运行 Helix 时请使用 `helix` 而不是 `hx`。
>
> 例如:
> ```sh
> helix --health
> ```
> 检查 Helix 健康状态

此外，AUR 中还有一个 [helix-git](https://aur.archlinux.org/packages/helix-git/) 包，它从 master 分支构建。

### NixOS

Helix 可通过 `helix` 属性在 [nixpkgs](https://github.com/nixos/nixpkgs) 中获得，
不稳定通道通常携带最新版本。

Helix 在项目根目录中也可作为 [flake](https://wiki.nixos.org/wiki/Flakes) 使用。
使用 `nix develop` 启动一个可复现的开发环境。
每次推送到 master 分支的输出都会使用 [Cachix](https://www.cachix.org/) 进行缓存。
flake 已配置为自动使用此缓存，前提是用户首次使用时接受新设置。

如果你使用的 Nix 版本未启用 flakes，
请[安装 Cachix CLI](https://docs.cachix.org/installation) 并使用
`cachix use helix` 配置 Nix，以便在可能的情况下使用缓存的输出。

### Flatpak

Helix 可在 [Flathub](https://flathub.org/en-GB/apps/com.helix_editor.Helix) 上获取：

```sh
flatpak install flathub com.helix_editor.Helix
flatpak run com.helix_editor.Helix
```

### Snap

Helix 可在 [Snapcraft](https://snapcraft.io/helix) 上获取，可以通过以下命令安装：

```sh
snap install --classic helix
```

这将把 Helix 安装为 `/snap/bin/helix` 和 `/snap/bin/hx`，因此请确保 `/snap/bin` 在你的 `PATH` 中。

### AppImage

Install Helix using the Linux [AppImage](https://appimage.org/) 格式。
从 [最新发布版本](https://github.com/helix-editor/helix/releases/latest) 页面下载官方 Helix AppImage。

```sh
chmod +x helix-*.AppImage # change permission for executable mode
./helix-*.AppImage # run helix
```

你可以选择[添加 `.desktop` 文件](./building-from-source.md#configure-the-desktop-shortcut)。Helix 必须安装在 `PATH` 中，且名称为 `hx`。例如：
```sh
mkdir -p "$HOME/.local/bin"
mv helix-*.AppImage "$HOME/.local/bin/hx"
并确保 ~/.local/bin 在你的 PATH 中。

### Linux Homebrew Core

请查看下面的 [macOS](#homebrew-core) 安装说明。

## macOS

### Homebrew Core

安装最新发布版本：

```sh
brew install helix
```

或者，安装最新的 nightly 版本：

```sh
brew install --HEAD helix
```

### MacPorts

```sh
sudo port install helix
```

## Windows

在 Windows 上可使用 [Winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/)、[Scoop](https://scoop.sh/)、[Chocolatey](https://chocolatey.org/)、[Packably](https://www.packably.com.br/) 或 [MSYS2](https://msys2.org/) 进行安装。

### Winget
Windows Package Manager（winget）命令行工具默认作为应用安装程序的一部分，在 Windows 11 和现代版本的 Windows 10 上可用。
你可以从 [Microsoft Store 获取应用安装程序](https://www.microsoft.com/p/app-installer/9nblggh4nns1#activetab=pivot:overviewtab)。如果已安装，请确保将其更新到最新版本。

```sh
winget install Helix.Helix
```

### Scoop

```sh
scoop install helix
```

### Chocolatey

```sh
choco install helix
```

### Packably

```sh
packl install helix
```

### MSYS2

对于 64 位的 Windows 8.1 或更高版本：

```sh
pacman -S mingw-w64-ucrt-x86_64-helix
```
