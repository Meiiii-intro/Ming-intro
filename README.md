# BI YIMING / 毕一铭 — Portfolio

可以直接发布到 GitHub Pages 的静态网站，无需安装依赖或运行构建命令。

包含最新版四个计算艺术项目、项目图片与视频链接、黑白线路开场动画，以及最新首页文案。

## 文件结构

- `index.html`：页面、样式、项目内容与交互。
- `intro.js`：约 6 秒的线路开场动画，支持跳过与减少动态效果。
- `assets/`：网站实际使用的 16 张图片，请保留文件名和目录结构。
- `.nojekyll`：让 GitHub Pages 直接发布静态文件。
- `.gitignore`：忽略操作系统产生的辅助文件。

## 上传并公开

1. 解压文件包。进入你之前用于网站的 GitHub 仓库，先保留旧版备份；或者新建一个 Public 仓库。
2. 选择 Add file → Upload files，将本目录里面的文件和 assets 文件夹上传到仓库根目录，提交到 main 分支。不要只上传 ZIP，也不要将整个外层文件夹作为一层目录上传。上传完成后，在仓库首页应该能直接看到 index.html、intro.js 和 assets/。
3. `.nojekyll` 是隐藏文件，macOS Finder 可用 Command + Shift + . 显示。如果网页上传没有包含它，可以在 GitHub 用 Add file → Create new file 创建 `.nojekyll`。
4. 进入 Settings → Pages。在 Build and deployment 中选择 Deploy from a branch，然后选择 main 和 /(root)，点击 Save。
5. 等待发布完成，在 Pages 页面查看 GitHub 提供的网站地址。以后更新同一分支里的这些文件，网站会随之更新。

个人主页仓库通常命名为 用户名.github.io，对应 https://用户名.github.io/；其他仓库通常对应 https://用户名.github.io/仓库名/。本包使用相对资源路径，兼容这两种地址。

如果旧仓库本来从 docs 或其他分支发布，请把这次文件放入实际发布目录，或者按照上面的步骤切换到 main / 根目录。旧的自动构建工作流可能需要调整为这里的静态发布方式。

如果之前已绑定自定义域名，请保留你原仓库的 CNAME 文件和域名设置。本包不包含新的域名设置。

## 本地查看和维护

可以双击 index.html 查看，或在本目录运行 `python3 -m http.server 8000`，然后访问 http://localhost:8000。

修改项目文字、名字、联系方式、首页文案：编辑 index.html。修改开场时间、线路与文字效果：编辑 intro.js。

字体从 Google Fonts 加载，视频使用 YouTube / Vimeo，播放需要网络且受视频平台的可用性和嵌入设置影响。图片和开场动画由本包提供，不依赖原 Sites 托管服务。此包不包含 503 MB 原始 PDF，作品页面已转成适合网页使用的图片。

## 官方说明

https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites
