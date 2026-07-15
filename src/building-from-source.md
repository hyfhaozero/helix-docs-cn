## Building from source

- [Configuring Helix's runtime files](#configuring-helixs-runtime-files)
  - [Linux and macOS](#linux-and-macos)
  - [Windows](#windows)
  - [Multiple runtime directories](#multiple-runtime-directories)
  - [Note to packagers](#note-to-packagers)
- [Validating the installation](#validating-the-installation)
- [Configure the desktop shortcut](#configure-the-desktop-shortcut)
- [Building the Debian package](#building-the-debian-package)

前置要求:

将Helix GitHub 仓库克隆到你选择的目录中. 本文档中的示例假设安装在 Linux 和 macOS 上的 `~/src/` 目录下，或在 Windows 上的 `%userprofile%\src\` 目录下。

- [Rust工具链](https://www.rust-lang.org/tools/install)
- [Git版本控制系统](https://git-scm.com/)
- 一个兼容 C++14 兼容的编译器，例如 GCC, Clang

如果您使用的是 `musl-libc` 标准库而不是 `glibc`，则在构建时必须设置环境变量 `RUSTFLAGS` 来确保tree-sitter语法分析器可以被正确加载。

```sh
RUSTFLAGS="-C target-feature=-crt-static"
```

1. 克隆Helix仓库:

   ```sh
   git clone https://github.com/helix-editor/helix
   cd helix
   ```

2. 从源代码编译Helix:

   ```sh
   # Reproducible
   cargo install --path helix-term --locked
   ```
   ```sh
   # Optimized
   cargo install \
      --profile opt \
      --config 'build.rustflags=["-C", "target-cpu=native"]' \
      --path helix-term \
      --locked
   ```

   任选一条命令执行都会生成 `hx` 可执行文件，并在本地 `runtime` 文件夹中构建 tree-sitter 语法解析库。

> 💡 如果你不想拉取或构建语法解析库，可以设置环境变量 `HELIX_DISABLE_AUTO_GRAMMAR_BUILD`。

> 💡 如果未预打包 Tree-sitter grammars，可以自行拉取并编译。使用 `hx --grammar fetch` 拉取 grammars，使用 `hx --grammar build` 进行编译。它们会被安装到用户 Helix 配置目录下的 `runtime` 目录中（更多[详情见下文](#multiple-runtime-directories)）。

> 💡 如果你只想构建部分语法解析库，可以查看 [`use-grammars`](./languages.md#choosing-grammars)

### 配置 Helix 的运行时文件

#### Linux / macOS

**runtime** 目录位于 Helix 源码目录的下一级，因此你可以导出 `HELIX_RUNTIME` 环境变量指向该目录，并将其添加到 `~/.bashrc` 或等效的配置文件中：

```sh
export HELIX_RUNTIME=~/src/helix/runtime
```

或者你也可以选择创建一个符号链接，指向 Helix 源码目录下的 `runtime` 目录：

```sh
ln -Tsf $PWD/runtime ~/.config/helix/runtime
```

#### Windows

可以通过 Windows 设置（搜索“编辑账户的环境变量”）将 `HELIX_RUNTIME` 环境变量指向 runtime 文件，或者在 Cmd 中使用 `setx` 命令：

```sh
setx HELIX_RUNTIME "%userprofile%\src\helix\runtime"
```

> 💡 `%userprofile%` 会解析为用户目录，例如 `C:\Users\Your-Name\`。

或者，在 `%appdata%\helix\` 中创建一个指向源码目录的符号链接：

| 方法         | 命令                                                                                   |
| ----------   | -------------------------------------------------------------------------------------- |
| PowerShell  | `New-Item -ItemType Junction -Target "runtime" -Path "$Env:AppData\helix\runtime"`     |
| Cmd         | `cd %appdata%\helix` <br/> `mklink /D runtime "%userprofile%\src\helix\runtime"`       |

> 💡 在 Windows 上创建符号链接需要在 PowerShell 或 Cmd 中运行，且需要管理员权限。

#### 多个运行时目录

当 Helix 发现多个运行时目录时，它会按以下顺序搜索文件：

1. `$CARGO_MANIFEST_DIR` 目录同级的 `runtime/` 目录（仅用于 Helix 开发和测试）。
2. 操作系统相关的 Helix 用户配置目录下的 `runtime/` 子目录。
3. `$HELIX_RUNTIME`
4. 发行版特定的后备目录（在编译时通过 `HELIX_DEFAULT_RUNTIME` 环境变量设置，而非运行时）。
5. Helix 可执行文件所在路径下的 `runtime/` 子目录。

> 💡 如果多个运行时目录有相同文件名的文件，Helix 会优先使用第一个发现的文件。

#### 包管理器的注意事项

如果你要为最终用户打包 Helix，为了提供良好的开箱即用体验，你应该在构建时（在调用 `cargo build` 之前）将 `HELIX_DEFAULT_RUNTIME` 环境变量设置为安装后存放最终 runtime 文件的目录。例如，假设你要将 runtime 打包到 `/usr/lib/helix/runtime`，构建脚本大致可按以下步骤执行：

1. `export HELIX_DEFAULT_RUNTIME=/usr/lib/helix/runtime`
2. `cargo build --profile opt --locked`
3. `cp -r runtime $BUILD_DIR/usr/lib/helix/`
4. `cp target/opt/hx $BUILD_DIR/usr/bin/hx`

这样，如果用户在 `~/.config/helix` 或 `HELIX_RUNTIME` 中没有自定义 runtime，生成的 `hx` 二进制文件将始终在 `/usr/lib/helix/runtime` 中查找其 runtime 目录。

### 验证安装

为确保一切按预期设置，你应当进行 Helix 健康检查.
检查:

```sh
hx --health
```

> 💡 有关健康检查结果的更多信息，请参阅 [健康检查](https://github.com/helix-editor/helix/wiki/Healthcheck)。

### 配置桌面快捷方式

如果你的桌面环境支持 [XDG desktop menu](https://specifications.freedesktop.org/menu-spec/menu-spec-latest.html)，可以通过将提供的 `.desktop` 和图标文件复制到正确的文件夹，将 Helix 配置为在应用程序菜单中显示：

```sh
cp contrib/Helix.desktop ~/.local/share/applications
cp contrib/helix.png ~/.icons # or ~/.local/share/icons
```
建议将 `.desktop` 文件中的链接转换为绝对路径，以避免潜在问题：

```sh
sed -i -e "s|Exec=hx %F|Exec=$(readlink -f ~/.cargo/bin/hx) %F|g" \
  -e "s|Icon=helix|Icon=$(readlink -f ~/.icons/helix.png)|g" ~/.local/share/applications/Helix.desktop
```

如果要使用系统默认终端以外的终端，可以修改 `.desktop` 文件。例如，使用 `kitty`：

```sh
sed -i "s|Exec=hx %F|Exec=kitty hx %F|g" ~/.local/share/applications/Helix.desktop
sed -i "s|Terminal=true|Terminal=false|g" ~/.local/share/applications/Helix.desktop
```

### 构建 Debian 包

如果发布页上提供的 `.deb` 文件使用的 `libc` 版本高于你的 Debian、Ubuntu 或 Mint 系统所使用的版本，你可以从源码构建软件包以匹配系统的依赖关系。

安装 `cargo-deb`，用于构建 `.deb` 文件:

```sh
cargo install cargo-deb
```

按照前述步骤克隆并进入 Helix 仓库后，使用以下命令一步构建发布二进制文件并将其打包为 `.deb` 文件：

```sh
cargo deb -- --locked
```

> 💡 这会将你锁定在 `--release` 配置中。但你也可以用任何方式构建 Helix。
> 只要保留 `target/release/hx` 文件，它就会通过 `cargo deb --no-build` 被打包。

> 💡 不用担心以下警告：
> ```
> warning: Failed to find dependency specification
> ```
> Cargo deb 只是报告哪些打包文件没有推导出依赖关系。但到目前为止，依赖推导看起来非常好，即使某些语法文件被跳过。

你可以在 `target/debian/` 中找到生成的 `.deb` 文件。它应包含所需的一切，包括：

- bash、fish、zsh 的补全
- .desktop 文件
- 图标（不过桌面环境可能会使用自己的图标，因为软件包名称正确地是 `helix`）
- 带有 runtime 的二进制启动器
