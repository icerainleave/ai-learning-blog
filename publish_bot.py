#!/usr/bin/env python3
"""
AI Learning Blog - Auto Publish Bot
===================================
这个脚本允许你的 Codex/AI 自动向博客提交新文章。

使用方法:
1. 手动运行: python publish_bot.py --title "文章标题" --content "文章内容"
2. Codex 集成: 在 Codex 中调用此脚本自动发布

配置步骤:
1. 在 GitHub Settings -> Developer settings -> Personal access tokens 创建 token
2. 设置环境变量: export GITHUB_TOKEN="your_token_here"
3. 设置环境变量: export REPO_OWNER="your_username"
4. 设置环境变量: export REPO_NAME="your_repo_name"
"""

import os
import sys
import argparse
import requests
import json
import base64
from datetime import datetime
from pathlib import Path

# 配置
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN', '')
REPO_OWNER = os.environ.get('REPO_OWNER', '')
REPO_NAME = os.environ.get('REPO_NAME', '')
REPO_BRANCH = os.environ.get('REPO_BRANCH', 'main')

def generate_slug(title: str) -> str:
    """从标题生成 URL 友好的 slug"""
    import re
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    slug = slug.strip('-')
    if not slug:
        slug = f"post-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    return slug

def create_markdown_content(title: str, content: str, tags: list = None, excerpt: str = "", cover: str = None) -> str:
    """生成符合博客格式的 Markdown 文件"""
    date = datetime.now().strftime('%Y-%m-%d')

    tags_str = ', '.join(tags) if tags else ''
    tags_yaml = f'\ntags: [{tags_str}]' if tags_str else ''

    cover_yaml = f'\ncover: "{cover}"' if cover else ''

    markdown = f"""---
title: "{title}"
date: "{date}"
excerpt: "{excerpt}"{tags_yaml}{cover_yaml}
---

# {title}

{content}
"""
    return markdown

def publish_to_github(title: str, content: str, tags: list = None, excerpt: str = "", cover: str = None) -> bool:
    """通过 GitHub API 提交新文章"""
    if not all([GITHUB_TOKEN, REPO_OWNER, REPO_NAME]):
        print("错误: 请设置环境变量 GITHUB_TOKEN, REPO_OWNER, REPO_NAME")
        print("示例:")
        print('  export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"')
        print('  export REPO_OWNER="your_username"')
        print('  export REPO_NAME="ai-learning-blog"')
        return False

    slug = generate_slug(title)
    filename = f"posts/{slug}.md"
    markdown_content = create_markdown_content(title, content, tags, excerpt, cover)

    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{filename}"

    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }

    data = {
        "message": f"Add new post: {title}",
        "content": base64.b64encode(markdown_content.encode("utf-8")).decode("ascii"),
        "branch": REPO_BRANCH
    }

    try:
        response = requests.put(url, headers=headers, json=data)

        if response.status_code in [200, 201]:
            print(f"✓ 文章发布成功!")
            print(f"  标题: {title}")
            print(f"  文件: {filename}")
            print(f"  链接: https://github.com/{REPO_OWNER}/{REPO_NAME}/blob/main/{filename}")
            print("\nVercel 将在 1-2 分钟内自动部署...")
            return True
        else:
            print(f"✗ 发布失败: {response.status_code}")
            print(response.text)
            return False

    except Exception as e:
        print(f"✗ 发生错误: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='AI Learning Blog Auto Publish Bot')
    parser.add_argument('--title', '-t', required=True, help='文章标题')
    parser.add_argument('--content', '-c', required=True, help='文章内容 (支持 Markdown)')
    parser.add_argument('--tags', '-g', nargs='+', default=[], help='文章标签，如: AI LLM')
    parser.add_argument('--excerpt', '-e', default='', help='文章摘要')
    parser.add_argument('--cover', '-i', default='', help='封面图片 URL')

    args = parser.parse_args()

    print("=" * 50)
    print("  AI Learning Blog - Auto Publish Bot")
    print("=" * 50)
    print()

    success = publish_to_github(
        title=args.title,
        content=args.content,
        tags=args.tags,
        excerpt=args.excerpt,
        cover=args.cover if args.cover else None
    )

    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
