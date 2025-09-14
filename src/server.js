/**
 * filecraft – Web server
 * ----------------------------------------
 * Provides a simple API + static frontend
 * to create file/folder structures from a
 * JSON blueprint and download as a ZIP.
 */

import express from "express";
import bodyParser from "body-parser";
import archiver from "archiver";
import path from "path";
import { fileURLToPath } from "url";

// --------------------------------------------------
// 1️⃣ Setup
// --------------------------------------------------
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(bodyParser.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "..", "public"))); // Serve the UI

// --------------------------------------------------
// 2️⃣ Routes
// --------------------------------------------------

/**
 * POST /generate
 * ---------------------------
 * Accepts:
 *   - files: [ "path/to/file.js", "README.md" ]
 *   - baseDir (optional): root folder for files
 *
 * Returns:
 *   - A ZIP archive with empty files and folders.
 */
app.post("/generate", async (req, res) => {
  const { files, baseDir } = req.body;

  // Validate input
  if (!Array.isArray(files)) {
    return res.status(400).json({ error: "Body must contain an array: files" });
  }

  // Sanitize baseDir (remove leading/trailing slashes)
  const root =
    baseDir && typeof baseDir === "string" && baseDir.trim() !== ""
      ? baseDir.replace(/^\/+/, "").replace(/\/+$/, "")
      : "";

  // Set response headers for ZIP
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=files.zip");

  // Create archive
  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.pipe(res);

  // Append each file (empty content)
  files.forEach((relPath) => {
    if (typeof relPath !== "string") return;
    const safeRel = relPath.replace(/^\/+/, "");
    const nameInZip = root ? `${root}/${safeRel}` : safeRel;
    archive.append("", { name: nameInZip });
  });

  // Finalize archive
  await archive.finalize();
});

// --------------------------------------------------
// 3️⃣ Start server
// --------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 filecraft server running at http://localhost:${PORT}`)
);
