# 🚀 Setup — Portfolio v2

## Why `npm run dev` failed

The ZIP does NOT include `node_modules/` (industry standard — they are rebuilt per machine).
You must install dependencies first.

---

## ✅ Correct setup order (run these in terminal, inside the portfolio folder)

```bash
# Step 1 — Install all dependencies (only needed once)
npm install

# Step 2 — Start development server
npm run dev
```

Then open → http://localhost:5173

---

## Build for production

```bash
npm run build
npm run preview   # preview the built site locally
```

---

## If `npm install` is slow or fails

```bash
# Option A — try npm with legacy peer deps flag
npm install --legacy-peer-deps

# Option B — use yarn instead
npm install -g yarn
yarn install
yarn dev
```

---

## Quick checklist before starting

- [ ] Node.js 18+ installed (`node -v` to check)
- [ ] Inside the correct folder (the one with `package.json`)
- [ ] Run `npm install` FIRST before any other command

