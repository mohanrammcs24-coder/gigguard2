/**
 * GigGuard — Backend Server
 * Node.js + Express + MySQL (mysql2)
 */

const express = require('express');
const cors    = require('cors');
const mysql   = require('mysql2/promise');
const jwt     = require('jsonwebtoken');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'gigguard_secret_key_2025';

// ── MySQL Pool ─────────────────────────────────────
const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               process.env.DB_PORT     || 3306,
  database:           process.env.DB_NAME     || 'gigguard',
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',   // ← set your MySQL password here
  waitForConnections: true,
  connectionLimit:    10,
});

async function q(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// ── Middleware ─────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve frontend from /frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// ── Auth Middleware ────────────────────────────────
function authWorker(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid token' }); }
}

function authAdmin(req, res, next) {
  authWorker(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    next();
  });
}

// In-memory OTP store
const otpStore = new Map();

// ════════════════════════════════════════════════════
//  HEALTH
// ════════════════════════════════════════════════════
app.get('/api/health', async (req, res) => {
  try {
    await q('SELECT 1');
    res.json({ status: 'ok', db: 'MySQL connected ✅', time: new Date().toLocaleString() });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// ════════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════════

// POST /api/auth/send-otp
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone required' });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore.set(phone, { otp, exp: Date.now() + 5 * 60 * 1000 });

  console.log(`📱 OTP for ${phone} → ${otp}`);
  // In production: send via MSG91 / Twilio here

  res.json({ success: true, demo_otp: otp }); // demo_otp shown on UI only
});

// POST /api/auth/verify-otp
app.post('/api/auth/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  const stored = otpStore.get(phone);

  if (!stored || stored.otp !== otp || Date.now() > stored.exp)
    return res.status(400).json({ error: 'Invalid or expired OTP' });

  otpStore.delete(phone);

  const rows = await q('SELECT * FROM workers WHERE phone = ?', [phone]);
  if (rows.length > 0) {
    const w = rows[0];
    const token = jwt.sign({ id: w.id, phone, role: w.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, worker: w, isNewUser: false });
  }

  const tempToken = jwt.sign({ phone, role: 'pending' }, JWT_SECRET, { expiresIn: '30m' });
  res.json({ success: true, tempToken, isNewUser: true });
});

// ════════════════════════════════════════════════════
//  WORKERS
// ════════════════════════════════════════════════════

// POST /api/workers/register
app.post('/api/workers/register', async (req, res) => {
  const { tempToken, name, platform, plan, upi_id, zone_name } = req.body;

  let decoded;
  try {
    decoded = jwt.verify(tempToken, JWT_SECRET);
    if (decoded.role !== 'pending') throw new Error();
  } catch { return res.status(401).json({ error: 'Invalid token' }); }

  const phone = decoded.phone;

  // Get or create zone
  let zones = await q('SELECT id FROM zones WHERE name = ?', [zone_name || 'Velachery, Chennai']);
  let zone_id;
  if (zones.length === 0) {
    const r = await q('INSERT INTO zones (name, city, zone_code, lat, lng) VALUES (?,?,?,?,?)',
      [zone_name || 'Velachery, Chennai', 'Chennai', 'GG-CHN-0042', 12.9816, 80.2209]);
    zone_id = r.insertId;
  } else {
    zone_id = zones[0].id;
  }

  const planCfg = { basic:{p:29,m:350}, standard:{p:62,m:700}, pro:{p:79,m:1400} };
  const cfg = planCfg[plan] || planCfg.standard;

  try {
    const r = await q(
      `INSERT INTO workers (name,phone,platform,plan,upi_id,zone_id,weekly_premium,max_payout,trust_gps_score,status,role)
       VALUES (?,?,?,?,?,?,?,?,94,'active','worker')`,
      [name, phone, platform||'swiggy', plan||'standard', upi_id||null, zone_id, cfg.p, cfg.m]
    );
    const worker = (await q('SELECT * FROM workers WHERE id = ?', [r.insertId]))[0];
    const token = jwt.sign({ id: worker.id, phone, role: 'worker' }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, token, worker });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Phone already registered' });
    throw e;
  }
});

// GET /api/workers/me
app.get('/api/workers/me', authWorker, async (req, res) => {
  const rows = await q(
    `SELECT w.*, z.name AS zone_name, z.zone_code
     FROM workers w LEFT JOIN zones z ON w.zone_id = z.id WHERE w.id = ?`,
    [req.user.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// PATCH /api/workers/me
app.patch('/api/workers/me', authWorker, async (req, res) => {
  const { name, upi_id, plan } = req.body;
  await q(
    `UPDATE workers SET name=COALESCE(?,name), upi_id=COALESCE(?,upi_id), plan=COALESCE(?,plan) WHERE id=?`,
    [name||null, upi_id||null, plan||null, req.user.id]
  );
  res.json((await q('SELECT * FROM workers WHERE id=?', [req.user.id]))[0]);
});

// ════════════════════════════════════════════════════
//  ZONES & SENSORS
// ════════════════════════════════════════════════════

app.get('/api/zones', async (req, res) => {
  res.json(await q('SELECT * FROM zones ORDER BY name'));
});

app.get('/api/zones/:id/sensors', async (req, res) => {
  const rows = await q(
    'SELECT * FROM sensor_readings WHERE zone_id=? ORDER BY recorded_at DESC LIMIT 1',
    [req.params.id]
  );
  res.json(rows[0] || null);
});

// POST /api/zones/:id/sensors — push weather data, auto-triggers payouts
app.post('/api/zones/:id/sensors', async (req, res) => {
  const { rainfall_mm=0, aqi=0, temperature_c=30, wind_speed_kmh=0 } = req.body;
  const zone_id = req.params.id;
  const drs = calcDRS(rainfall_mm, aqi, temperature_c, wind_speed_kmh);

  const r = await q(
    `INSERT INTO sensor_readings (zone_id,rainfall_mm,aqi,temperature_c,wind_speed_kmh,drs_score) VALUES (?,?,?,?,?,?)`,
    [zone_id, rainfall_mm, aqi, temperature_c, wind_speed_kmh, drs]
  );
  await q('UPDATE zones SET current_drs=? WHERE id=?', [drs, zone_id]);

  const sensor = { id: r.insertId, zone_id, rainfall_mm, aqi, temperature_c, wind_speed_kmh, drs_score: drs };
  if (drs >= 70) await autoTriggerPayouts(zone_id, sensor);

  res.json(sensor);
});

// ════════════════════════════════════════════════════
//  PAYOUTS
// ════════════════════════════════════════════════════

function calcDRS(r, a, t, w) {
  let s = 0;
  s += Math.min(50, (r/50)*50);
  s += Math.min(25, Math.max(0, (a-150)/150*25));
  s += Math.min(15, Math.max(0, (t-38)/7*15));
  s += Math.min(10, (w/80)*10);
  return Math.min(100, Math.round(s));
}

async function autoTriggerPayouts(zone_id, sensor) {
  const workers = await q(`SELECT * FROM workers WHERE zone_id=? AND status='active'`, [zone_id]);
  const today = new Date().toISOString().split('T')[0];
  for (const w of workers) {
    const exist = await q(
      `SELECT id FROM payouts WHERE worker_id=? AND DATE(triggered_at)=? AND status!='rejected'`,
      [w.id, today]
    );
    if (exist.length > 0) continue;
    const ttype = sensor.rainfall_mm>50 ? 'rain' : sensor.aqi>300 ? 'aqi' : sensor.temperature_c>43 ? 'heat' : 'general';
    const amount = sensor.drs_score>=90 ? w.max_payout
      : sensor.rainfall_mm>50  ? Math.round(w.max_payout*0.85)
      : sensor.aqi>300         ? Math.round(w.max_payout*0.70)
      : sensor.temperature_c>43? Math.round(w.max_payout*0.60)
      : Math.round(w.max_payout*0.50);
    await q(
      `INSERT INTO payouts (worker_id,zone_id,sensor_reading_id,amount,trigger_type,drs_at_trigger,status) VALUES (?,?,?,?,?,?,'approved')`,
      [w.id, zone_id, sensor.id, amount, ttype, sensor.drs_score]
    );
    console.log(`💸 Auto-payout ₹${amount} → worker ${w.id}`);
  }
}

// GET /api/payouts/me
app.get('/api/payouts/me', authWorker, async (req, res) => {
  const limit  = parseInt(req.query.limit||20);
  const offset = parseInt(req.query.offset||0);
  const payouts = await q(
    `SELECT p.*, z.name AS zone_name FROM payouts p LEFT JOIN zones z ON p.zone_id=z.id
     WHERE p.worker_id=? ORDER BY p.triggered_at DESC LIMIT ? OFFSET ?`,
    [req.user.id, limit, offset]
  );
  const [summary] = await q(
    `SELECT COALESCE(SUM(amount),0) AS total, COUNT(*) AS count FROM payouts WHERE worker_id=? AND status IN ('approved','paid')`,
    [req.user.id]
  );
  res.json({ payouts, summary });
});

// POST /api/payouts/simulate
app.post('/api/payouts/simulate', authWorker, async (req, res) => {
  const { rainfall_mm=0, aqi=100, temperature_c=34, wind_speed_kmh=15 } = req.body;
  const drs = calcDRS(rainfall_mm, aqi, temperature_c, wind_speed_kmh);
  const [w] = await q('SELECT * FROM workers WHERE id=?', [req.user.id]);
  if (!w) return res.status(404).json({ error: 'Worker not found' });

  const triggered = drs >= 70;
  const ttype = rainfall_mm>50?'rain':aqi>300?'aqi':temperature_c>43?'heat':'general';
  const amount = drs>=90?w.max_payout
    :rainfall_mm>50?Math.round(w.max_payout*0.85)
    :aqi>300?Math.round(w.max_payout*0.70)
    :temperature_c>43?Math.round(w.max_payout*0.60)
    :Math.round(w.max_payout*0.50);

  if (triggered) {
    const sr = await q(
      `INSERT INTO sensor_readings (zone_id,rainfall_mm,aqi,temperature_c,wind_speed_kmh,drs_score) VALUES (?,?,?,?,?,?)`,
      [w.zone_id, rainfall_mm, aqi, temperature_c, wind_speed_kmh, drs]
    );
    await q(
      `INSERT INTO payouts (worker_id,zone_id,sensor_reading_id,amount,trigger_type,drs_at_trigger,status,is_simulation) VALUES (?,?,?,?,?,?,'approved',1)`,
      [req.user.id, w.zone_id, sr.insertId, amount, ttype, drs]
    );
  }
  res.json({ drs, triggered, amount: triggered ? amount : 0 });
});

// ════════════════════════════════════════════════════
//  ADMIN
// ════════════════════════════════════════════════════

app.get('/api/admin/stats', authAdmin, async (req, res) => {
  const [workers]  = await q(`SELECT COUNT(*) AS total, SUM(status='active') AS active FROM workers WHERE role='worker'`);
  const [payouts]  = await q(`SELECT COUNT(*) AS total, COALESCE(SUM(amount),0) AS total_amount,
    COALESCE(SUM(CASE WHEN triggered_at > DATE_SUB(NOW(),INTERVAL 7 DAY) THEN amount ELSE 0 END),0) AS week_amount
    FROM payouts WHERE status='approved'`);
  const [fraud]    = await q(`SELECT COUNT(*) AS total FROM fraud_flags WHERE status='pending'`);
  const [zones]    = await q(`SELECT COUNT(*) AS total, AVG(current_drs) AS avg_drs FROM zones`);
  const [pool]     = await q(`SELECT COALESCE(SUM(weekly_premium),0) AS pool FROM workers WHERE status='active'`);
  res.json({ workers, payouts, fraud, zones, premium_pool: pool.pool,
    loss_ratio: payouts.week_amount>0 ? Math.round((payouts.week_amount/(pool.pool||1))*100) : 0 });
});

app.get('/api/admin/workers', authAdmin, async (req, res) => {
  const { page=1, limit=20 } = req.query;
  const rows = await q(
    `SELECT w.*, z.name AS zone_name FROM workers w LEFT JOIN zones z ON w.zone_id=z.id
     WHERE w.role='worker' ORDER BY w.created_at DESC LIMIT ? OFFSET ?`,
    [parseInt(limit), (parseInt(page)-1)*parseInt(limit)]
  );
  res.json({ workers: rows });
});

app.get('/api/admin/payouts', authAdmin, async (req, res) => {
  const { page=1, limit=20 } = req.query;
  const rows = await q(
    `SELECT p.*, w.name AS worker_name, w.phone, z.name AS zone_name
     FROM payouts p LEFT JOIN workers w ON p.worker_id=w.id LEFT JOIN zones z ON p.zone_id=z.id
     ORDER BY p.triggered_at DESC LIMIT ? OFFSET ?`,
    [parseInt(limit), (parseInt(page)-1)*parseInt(limit)]
  );
  res.json({ payouts: rows });
});

app.get('/api/admin/fraud', authAdmin, async (req, res) => {
  const rows = await q(
    `SELECT f.*, w.name AS worker_name, w.phone FROM fraud_flags f LEFT JOIN workers w ON f.worker_id=w.id
     WHERE f.status='pending' ORDER BY f.score DESC`
  );
  res.json(rows);
});

app.patch('/api/admin/fraud/:id', authAdmin, async (req, res) => {
  const { action } = req.body;
  const status = action==='approve' ? 'approved' : 'rejected';
  await q(`UPDATE fraud_flags SET status=?, resolved_at=NOW(), resolved_by=? WHERE id=?`,
    [status, req.user.id, req.params.id]);
  if (action === 'reject') {
    const [flag] = await q('SELECT * FROM fraud_flags WHERE id=?', [req.params.id]);
    if (flag) await q(`UPDATE workers SET status='suspended' WHERE id=?`, [flag.worker_id]);
  }
  res.json({ success: true, action });
});

// ── Global error handler ───────────────────────────
app.use((err, req, res, next) => {
  console.error('❌', err.message);
  res.status(500).json({ error: err.message });
});

// ── Start ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   🛡️  GigGuard Backend  — RUNNING         ║');
  console.log(`║   http://localhost:${PORT}                   ║`);
  console.log(`║   Health: /api/health                    ║`);
  console.log('╚══════════════════════════════════════════╝\n');
  console.log('📂 Frontend served at http://localhost:3001');
  console.log('🗃️  MySQL → localhost:3306/gigguard\n');
});
