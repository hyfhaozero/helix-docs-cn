#!/bin/bash

# 将 sitemap.xml 复制到 book 输出目录
# 这样 mdbook 构建后就会包含 sitemap

if [ -f "sitemap.xml" ]; then
  echo "📋 复制 sitemap.xml 到构建目录..."
  cp sitemap.xml book/sitemap.xml
  echo "✅ sitemap.xml 已复制"
fi

# 生成更新的 sitemap
echo "🔄 生成完整的 sitemap..."
node scripts/generate-sitemap.js

echo "✨ 完成!"
