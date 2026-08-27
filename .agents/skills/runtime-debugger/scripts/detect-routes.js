#!/usr/bin/env node
/**
 * detect-routes.js
 * Tự động detect tất cả routes trong NextJS project (App Router + Pages Router)
 * Output: routes.json tại thư mục hiện tại
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CWD = process.cwd();
const OUTPUT_FILE = path.join(CWD, "routes.json");

// ─── Helpers ────────────────────────────────────────────────────────────────

function fileExists(p) {
  return fs.existsSync(p);
}

function readDir(p) {
  if (!fileExists(p)) return [];
  return fs.readdirSync(p, { withFileTypes: true });
}

// Các file/folder cần bỏ qua
const IGNORED = new Set([
  "node_modules",
  ".next",
  ".git",
  "public",
  "api", // API routes — không crawl như page
  "_components",
  "_lib",
  "_utils",
  "_hooks",
]);

const PAGE_FILES = new Set([
  "page.tsx",
  "page.ts",
  "page.jsx",
  "page.js",
  "index.tsx",
  "index.ts",
  "index.jsx",
  "index.js",
]);

// ─── App Router (app/) ──────────────────────────────────────────────────────

function walkAppDir(dir, prefix = "") {
  const routes = [];
  const entries = readDir(dir);

  for (const entry of entries) {
    if (IGNORED.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Route groups (folder) bọc trong () — không thêm vào URL
      const segment =
        entry.name.startsWith("(") && entry.name.endsWith(")")
          ? prefix
          : `${prefix}/${entry.name}`;

      routes.push(...walkAppDir(fullPath, segment));
    } else if (entry.isFile() && PAGE_FILES.has(entry.name)) {
      const route = prefix === "" ? "/" : prefix;
      routes.push(route);
    }
  }

  return routes;
}

// ─── Pages Router (pages/) ──────────────────────────────────────────────────

function walkPagesDir(dir, prefix = "") {
  const routes = [];
  const entries = readDir(dir);

  for (const entry of entries) {
    if (IGNORED.has(entry.name)) continue;
    if (entry.name.startsWith("_")) continue; // _app, _document, etc.

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      routes.push(...walkPagesDir(fullPath, `${prefix}/${entry.name}`));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (![".tsx", ".ts", ".jsx", ".js"].includes(ext)) continue;

      const base = path.basename(entry.name, ext);
      if (base === "index") {
        routes.push(prefix === "" ? "/" : prefix);
      } else {
        routes.push(`${prefix}/${base}`);
      }
    }
  }

  return routes;
}

// ─── next-intl locale detection ─────────────────────────────────────────────

function detectLocales() {
  const candidates = [
    "middleware.ts",
    "middleware.js",
    "src/middleware.ts",
    "src/middleware.js",
    "i18n.ts",
    "i18n.js",
    "src/i18n.ts",
    "src/i18n.js",
    "next.config.ts",
    "next.config.js",
  ];

  for (const candidate of candidates) {
    const fullPath = path.join(CWD, candidate);
    if (!fileExists(fullPath)) continue;

    const content = fs.readFileSync(fullPath, "utf8");

    // Match pattern: locales: ["en", "vi"] hoặc locales: ['en', 'vi']
    const match = content.match(/locales[:\s]+\[([^\]]+)\]/);
    if (match) {
      const locales = match[1]
        .split(",")
        .map((l) => l.trim().replace(/['"]/g, ""))
        .filter(Boolean);

      if (locales.length > 0) return locales;
    }
  }

  return null;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const appDir = path.join(CWD, "app");
  const srcAppDir = path.join(CWD, "src", "app");
  const pagesDir = path.join(CWD, "pages");
  const srcPagesDir = path.join(CWD, "src", "pages");

  let rawRoutes = [];
  let routerType = "unknown";

  if (fileExists(appDir) || fileExists(srcAppDir)) {
    routerType = "app-router";
    const dir = fileExists(appDir) ? appDir : srcAppDir;
    rawRoutes = walkAppDir(dir);
  } else if (fileExists(pagesDir) || fileExists(srcPagesDir)) {
    routerType = "pages-router";
    const dir = fileExists(pagesDir) ? pagesDir : srcPagesDir;
    rawRoutes = walkPagesDir(dir);
  } else {
    console.error("❌ Không tìm thấy thư mục app/ hoặc pages/");
    process.exit(1);
  }

  // Dedupe
  rawRoutes = [...new Set(rawRoutes)];

  // Detect locales và expand routes nếu có next-intl
  const locales = detectLocales();
  let routes = rawRoutes;
  let localePrefixed = false;

  if (locales && locales.length > 0) {
    localePrefixed = true;
    routes = locales.flatMap((locale) =>
      rawRoutes.map((r) => `/${locale}${r === "/" ? "" : r}`),
    );
    routes = [...new Set(routes)];
  }

  const output = {
    generated_at: new Date().toISOString(),
    router_type: routerType,
    locale_prefixed: localePrefixed,
    locales: locales || [],
    total: routes.length,
    routes,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`✅ Detected ${routes.length} routes (${routerType})`);
  if (locales) console.log(`🌐 Locales: ${locales.join(", ")}`);
  console.log(`📄 Saved to: ${OUTPUT_FILE}`);
}

main();
