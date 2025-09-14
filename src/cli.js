#!/usr/bin/env node
/**
 * filecraft – CLI
 * ----------------------------------------
 * Command-line tool to create file/folder
 * structures from a JSON file.
 *
 * Usage:
 *   filecraft <jsonFile> [baseDir]
 *
 * Example:
 *   filecraft files.json my-app
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --------------------------------------------------
// 1️⃣ Helpers
// --------------------------------------------------

/**
 * Ensure that a directory exists; create it if not.
 * @param {string} dirPath
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Create an empty file at the given path.
 * If parent directories don’t exist, create them.
 * @param {string} filePath
 */
function createFile(filePath) {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  fs.writeFileSync(filePath, "");
}

// --------------------------------------------------
// 2️⃣ Main logic
// --------------------------------------------------

/**
 * Parse CLI arguments:
 *   [0] node
 *   [1] cli.js
 *   [2] jsonFile
 *   [3] baseDir (optional)
 */
const args = process.argv.slice(2);

if (args.length < 1) {
  console.log("Usage: filecraft <jsonFile> [baseDir]");
  process.exit(1);
}

const jsonFile = args[0];
const baseDir = args[1] ? args[1].replace(/^\/+/, "").replace(/\/+$/, "") : "";

// --------------------------------------------------
// 3️⃣ Read & validate JSON
// --------------------------------------------------
let files;
try {
  const data = fs.readFileSync(jsonFile, "utf8");
  files = JSON.parse(data);

  if (!Array.isArray(files)) {
    console.error("❌ JSON file must contain an array of file paths.");
    process.exit(1);
  }
} catch (err) {
  console.error("❌ Error reading or parsing JSON:", err.message);
  process.exit(1);
}

// --------------------------------------------------
// 4️⃣ Create files
// --------------------------------------------------
console.log("📁 Creating files...");

files.forEach((relPath) => {
  if (typeof relPath !== "string") return;

  const safeRel = relPath.replace(/^\/+/, "");
  const fullPath = baseDir ? path.join(baseDir, safeRel) : safeRel;

  createFile(fullPath);
  console.log(`✅ Created: ${fullPath}`);
});

console.log("🎉 All files created successfully.");
