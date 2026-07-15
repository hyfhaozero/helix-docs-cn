#!/usr/bin/env node

/**
 * 生成 sitemap.xml 脚本
 * 用于在 mdbook 构建后扫描所有 HTML 文件并生成完整的 sitemap
 */

const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// 配置
const BASE_URL = 'https://zero2one.de5.net/helix-docs-cn';
const BUILD_DIR = './book';
const SITEMAP_OUTPUT = './book/sitemap.xml';
const EXCLUDE_PATTERNS = [
  /\/search\.html$/,
  /\/print\.html$/,
  /404\.html$/,
];

/**
 * 递归扫描目录找到所有 HTML 文件
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 跳过特殊目录
      if (!['node_modules', '.git', '.github'].includes(file)) {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * 将文件路径转换为 URL
 */
function filePathToUrl(filePath) {
  let relativePath = path.relative(BUILD_DIR, filePath);
  // 将反斜杠转换为正斜杠（Windows 兼容性）
  relativePath = relativePath.replace(/\\/g, '/');
  // index.html 转换为目录 URL
  if (relativePath.endsWith('index.html')) {
    relativePath = relativePath.replace('index.html', '');
  }
  return `${BASE_URL}/${relativePath}`;
}

/**
 * 获取文件修改时间
 */
function getLastModified(filePath) {
  const stat = fs.statSync(filePath);
  return stat.mtime.toISOString().split('T')[0];
}

/**
 * 检查是否应该排除该 URL
 */
function shouldExclude(url) {
  return EXCLUDE_PATTERNS.some((pattern) => pattern.test(url));
}

/**
 * 生成 sitemap
 */
function generateSitemap() {
  try {
    // 检查构建目录
    if (!fs.existsSync(BUILD_DIR)) {
      console.error(`❌ 构建目录不存在: ${BUILD_DIR}`);
      console.error('请先运行: mdbook build');
      process.exit(1);
    }

    // 查找所有 HTML 文件
    const htmlFiles = findHtmlFiles(BUILD_DIR);
    console.log(`📄 找到 ${htmlFiles.length} 个 HTML 文件`);

    // 生成 URL 条目
    const urls = htmlFiles
      .map((file) => {
        const url = filePathToUrl(file);
        return { url, file, lastmod: getLastModified(file) };
      })
      .filter((item) => !shouldExclude(item.url))
      .sort((a, b) => a.url.localeCompare(b.url));

    console.log(`✅ 有效 URL 数: ${urls.length}`);

    // 构建 XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach((item) => {
      xml += '  <url>\n';
      xml += `    <loc>${escapeXml(item.url)}</loc>\n`;
      xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += `    <priority>${calculatePriority(item.url)}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>\n';

    // 写入文件
    fs.writeFileSync(SITEMAP_OUTPUT, xml);
    console.log(`\n✨ Sitemap 已生成: ${SITEMAP_OUTPUT}`);
    console.log(`📊 总共包含 ${urls.length} 个 URL`);

  } catch (error) {
    console.error('❌ 生成 sitemap 失败:', error.message);
    process.exit(1);
  }
}

/**
 * 转义 XML 特殊字符
 */
function escapeXml(str) {
  const xmlChars = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  };
  return str.replace(/[&<>"']/g, (char) => xmlChars[char]);
}

/**
 * 根据 URL 路径计算优先级
 */
function calculatePriority(url) {
  const relativePath = url.replace(BASE_URL, '');
  const depth = (relativePath.match(/\//g) || []).length;

  if (relativePath === '/' || relativePath === '') return '1.0';
  if (depth === 1) return '0.8';
  if (depth === 2) return '0.6';
  return '0.4';
}

// 运行
generateSitemap();
