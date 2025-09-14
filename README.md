# filecraft

> Create project file structures from a JSON blueprint — via CLI or Web UI.

---

## ✨ Features

* 🖥️ **CLI Tool** – Generate empty files & folders from a JSON list.
* 🌐 **Web UI** – Paste JSON, choose a base folder, download a ready-made ZIP.
* 📁 Auto-creates nested directories.
* ⚡ Minimal dependencies.

---

## 📦 Installation (CLI)

1. Clone & install globally:

```bash
git clone https://github.com/<your-username>/filecraft.git
cd filecraft
npm install -g .
```

2. Use anywhere:

```bash
filecraft <jsonFile> [baseDir]
```

Example:

```bash
filecraft files.json my-app
```

---

## 🖥️ CLI Usage

* `<jsonFile>` → Path to a JSON file containing an **array of file paths**.
* `[baseDir]` → *(optional)* Root directory where files will be created (default = current working directory).

Example JSON (`files.json`):

```json
[
  "src/index.js",
  "src/utils/helper.js",
  "README.md"
]
```

Run:

```bash
filecraft files.json my-app
```

Result:

```
my-app/
├── src/
│   ├── index.js
│   └── utils/helper.js
└── README.md
```

---

## 🌐 Web UI

Run the included server for a browser interface.

### 1️⃣ Start server

```bash
npm start
```

### 2️⃣ Open

Visit [http://localhost:3000](http://localhost:3000).

You’ll see:

* A text area to paste your JSON
* An optional **Base Directory** field
* A **Generate & Download** button

You’ll receive a ZIP with:

```
<baseDir>/
└── (all files from JSON)
```

---

## 📂 Project Structure

```
filecraft/
├── src/
│   ├── cli.js        # CLI script
│   └── server.js     # Express server for UI
├── public/
│   └── index.html    # Frontend page
├── package.json
└── README.md
```

---

## 🚀 Deployment

Easily deploy the Web UI:

* [Render](https://render.com/)
* [Railway](https://railway.app/)
* [Heroku](https://heroku.com)
* [Vercel](https://vercel.com/) *(convert `server.js` to an API route)*

---

## 🤝 Contributing

PRs, bug reports, and feature suggestions are welcome!
Ideas: drag-and-drop JSON, upload `.json` file, `--dry-run` / `--force` flags for CLI.

---

## 📄 License

MIT © 2025 Parth Shah(https://github.com/parthshah07)
