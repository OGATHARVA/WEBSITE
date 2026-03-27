---
description: Start both the portfolio website and the Quote Genie hackathon project live locally
---

// turbo-all

## Live Both Websites

This workflow starts:
- **Portfolio website** on http://localhost:3000
- **Quote Genie frontend** (Vite/React) on http://localhost:8080
- **Quote Genie backend** (Express/tsx) on http://localhost:3001

### Step 1 – Start the Portfolio Website
Run the portfolio server (serves index.html, style.css, script.js):
```
npx -y http-server "c:\Users\athar\Downloads\MY WEBSITE" -p 3000 -o
```

### Step 2 – Start the Quote Genie Backend
Run in the backend folder:
```
npm run dev
```
Working directory: `c:\Users\athar\Downloads\MY WEBSITE\quote-genie-main\backend`

### Step 3 – Start the Quote Genie Frontend
Run in the frontend folder (opens browser automatically at http://localhost:5173):
```
npm run dev -- --open
```
Working directory: `c:\Users\athar\Downloads\MY WEBSITE\quote-genie-main\quote-genie-main`
