# 🛡️ GigGuard — Full Stack Project

## 📁 Folder Structure
```
GigGuard/
├── frontend/
│   └── index.html          ← Your complete UI (all screens)
├── backend/
│   ├── server.js           ← Express + MySQL API
│   ├── package.json        ← Node dependencies
│   └── .env                ← DB config (edit your password here)
├── database/
│   └── schema.sql          ← MySQL tables + seed data
├── GigGuard.code-workspace ← Open this in VS Code
├── setup-windows.bat       ← One-click setup (Windows)
└── setup-mac-linux.sh      ← One-click setup (Mac/Linux)
```

---

## ⚡ STEP BY STEP — Run in VS Code

### Step 1 — Install Requirements (one time only)

**Node.js**
→ Download from https://nodejs.org (choose LTS version)

**MySQL**
- Windows: https://dev.mysql.com/downloads/installer → pick "MySQL Server"
- Mac: open Terminal → `brew install mysql` → `brew services start mysql`
- Linux: `sudo apt install mysql-server -y` → `sudo service mysql start`

---

### Step 2 — Open Project in VS Code

1. Unzip / move the `GigGuard` folder somewhere on your computer
2. Open VS Code
3. **File → Open Workspace from File** → select `GigGuard.code-workspace`

---

### Step 3 — Set Your MySQL Password

Open `backend/.env` and change the `DB_PASSWORD` line:

```
DB_PASSWORD=your_mysql_password_here
```

> If MySQL has no password (fresh install), leave it blank: `DB_PASSWORD=`

---

### Step 4 — Create the Database

Open a **New Terminal** in VS Code (Terminal → New Terminal) and run:

**Windows:**
```
mysql -u root -p < database\schema.sql
```

**Mac / Linux:**
```
mysql -u root -p < database/schema.sql
```

Type your MySQL password when asked. You should see:
```
✅ GigGuard database ready!
zones   : 8
workers : 7
payouts : 8
```

---

### Step 5 — Install & Start the Backend

In the VS Code terminal:
```bash
cd backend
npm install
node server.js
```

You will see:
```
╔══════════════════════════════════════════╗
║   🛡️  GigGuard Backend  — RUNNING         ║
║   http://localhost:3001                  ║
╚══════════════════════════════════════════╝
```

---

### Step 6 — Open the App

Open your browser and go to:
```
http://localhost:3001
```

**That's it — the full app is running!**

---

## 🎮 How to Use the App

### As a New Worker
1. Go to **Onboarding** (first screen)
2. Enter any phone number → click **Get OTP**
3. The OTP appears on screen (yellow box) — type it in
4. Select platform → pick a plan → click **Activate**
5. Your data is saved to MySQL → Dashboard loads

### As a Returning Worker (pre-seeded)
| Name | Phone | Plan |
|---|---|---|
| Ravi Kumar | +919876543210 | Standard |
| Priya Devi | +919876543211 | Pro |
| Anbu Raj | +919876543212 | Basic |

### As Admin
| Phone | Role |
|---|---|
| +910000000000 | Admin |

Login with admin phone → Admin View tab appears with real DB stats

### Simulate a Payout
1. Go to **Simulate Event**
2. Click **Cyclone Rain** (or drag sliders up)
3. Watch the pipeline run → payout saved to MySQL
4. Check Admin → payouts to see it recorded

---

## 🔍 Test the API directly (optional)

Open a second terminal while server is running:

```bash
# Health check
curl http://localhost:3001/api/health

# Send OTP
curl -X POST http://localhost:3001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d "{\"phone\": \"+919876543210\"}"

# All zones
curl http://localhost:3001/api/zones
```

---

## ❌ Common Errors

| Error | Fix |
|---|---|
| `ECONNREFUSED 3306` | MySQL not running → start it |
| `ER_ACCESS_DENIED` | Wrong password in `.env` |
| `Cannot find module 'mysql2'` | Run `npm install` inside `backend/` |
| `ER_BAD_DB_ERROR` | Schema not loaded → run Step 4 again |
| Page shows but API fails | Backend not started → run Step 5 |

---

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal where the server is running.
