# AI Learning Blog

一个简约的个人博客，专门用于记录 AI 学习心得。

## 功能特点

- 简约设计，专注于内容阅读
- 深色/浅色模式自动切换
- 支持 Markdown 格式文章
- 支持代码高亮
- 支持图片展示
- **支持 Codex/AI 自动发布**

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 手动添加文章

在 `posts/` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2026-03-15"
excerpt: "文章摘要"
tags: ["AI", "LLM"]
cover: "https://example.com/cover.jpg"
---

# 文章内容

正文内容...
```

## Codex/AI 自动发布

### 步骤 1: 配置 GitHub Token

1. 打开 [GitHub Settings](https://github.com/settings/tokens)
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 复制生成的 Token

### 步骤 2: 设置环境变量

```bash
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
export REPO_OWNER="your_username"
export REPO_NAME="ai-learning-blog"
```

### 步骤 3: 使用脚本发布

```bash
python publish_bot.py \
  --title "Transformer 架构详解" \
  --content "## 概述\n\nTransformer 是..." \
  --tags "AI" "深度学习" \
  --excerpt "深入理解 Transformer 架构" \
  --cover "https://example.com/image.jpg"
```

### Codex 集成示例

在你的 Codex 配置中添加：

```json
{
  "tools": [{
    "name": "publish_blog",
    "command": "python publish_bot.py --title \"{{title}}\" --content \"{{content}}\" --tags {{tags}}"
  }]
}
```

## 部署

项目使用 Vercel 部署：推送到 GitHub 后自动构建并发布。

推荐设置：
1. Framework: Vite
2. Build Command: `pnpm build`
3. Output Directory: `dist`
4. Install Command: `pnpm install`

## 项目结构

```
ai-learning-blog/
├── posts/              # 文章目录 (Markdown)
├── src/
│   ├── components/     # React 组件
│   ├── pages/          # 页面组件
│   └── lib/           # 工具函数
├── publish_bot.py      # 自动发布脚本
└── tailwind.config.js  # 样式配置
```
