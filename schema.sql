-- ============================================================
--  GigGuard — MySQL Schema + Seed Data
--  Run: mysql -u root -p < database/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS gigguard CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gigguard;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS fraud_flags;
DROP TABLE IF EXISTS payouts;
DROP TABLE IF EXISTS sensor_readings;
DROP TABLE IF EXISTS workers;
DROP TABLE IF EXISTS zones;
SET FOREIGN_KEY_CHECKS = 1;

-- ZONES
CREATE TABLE zones (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  city        VARCHAR(80)  NOT NULL DEFAULT 'Chennai',
  zone_code   VARCHAR(20)  NOT NULL UNIQUE,
  lat         DECIMAL(10,7),
  lng         DECIMAL(10,7),
  current_drs TINYINT UNSIGNED DEFAULT 0,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- WORKERS
CREATE TABLE workers (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(120),
  phone            VARCHAR(20) NOT NULL UNIQUE,
  platform         VARCHAR(40) DEFAULT 'swiggy',
  plan             ENUM('basic','standard','pro') DEFAULT 'standard',
  upi_id           VARCHAR(100),
  zone_id          INT UNSIGNED,
  weekly_premium   SMALLINT UNSIGNED DEFAULT 62,
  max_payout       SMALLINT UNSIGNED DEFAULT 700,
  trust_gps_score  TINYINT UNSIGNED DEFAULT 94,
  status           ENUM('active','suspended','churned','pending') DEFAULT 'active',
  role             ENUM('worker','admin') DEFAULT 'worker',
  total_earned     INT UNSIGNED DEFAULT 0,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- SENSOR READINGS
CREATE TABLE sensor_readings (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  zone_id        INT UNSIGNED,
  rainfall_mm    DECIMAL(6,2) DEFAULT 0,
  aqi            SMALLINT UNSIGNED DEFAULT 0,
  temperature_c  DECIMAL(5,2) DEFAULT 30.00,
  wind_speed_kmh DECIMAL(6,2) DEFAULT 0,
  drs_score      TINYINT UNSIGNED DEFAULT 0,
  source         VARCHAR(40) DEFAULT 'api',
  recorded_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- PAYOUTS
CREATE TABLE payouts (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  worker_id         INT UNSIGNED,
  zone_id           INT UNSIGNED,
  sensor_reading_id INT UNSIGNED,
  amount            SMALLINT UNSIGNED NOT NULL,
  trigger_type      VARCHAR(30) NOT NULL,
  drs_at_trigger    TINYINT UNSIGNED,
  status            ENUM('pending','approved','rejected','paid') DEFAULT 'approved',
  upi_ref           VARCHAR(80),
  transfer_time_sec SMALLINT UNSIGNED,
  is_simulation     TINYINT(1) DEFAULT 0,
  triggered_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  paid_at           DATETIME,
  FOREIGN KEY (worker_id)         REFERENCES workers(id) ON DELETE CASCADE,
  FOREIGN KEY (zone_id)           REFERENCES zones(id),
  FOREIGN KEY (sensor_reading_id) REFERENCES sensor_readings(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- FRAUD FLAGS
CREATE TABLE fraud_flags (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  worker_id   INT UNSIGNED,
  payout_id   INT UNSIGNED,
  reason      TEXT NOT NULL,
  score       TINYINT UNSIGNED DEFAULT 50,
  status      ENUM('pending','approved','rejected') DEFAULT 'pending',
  resolved_by INT UNSIGNED,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  resolved_at DATETIME,
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- INDEXES
CREATE INDEX idx_workers_phone  ON workers(phone);
CREATE INDEX idx_payouts_worker ON payouts(worker_id);
CREATE INDEX idx_payouts_time   ON payouts(triggered_at);
CREATE INDEX idx_sensor_zone    ON sensor_readings(zone_id);
CREATE INDEX idx_fraud_status   ON fraud_flags(status);

-- ── SEED: Zones ────────────────────────────────────
INSERT INTO zones (name, city, zone_code, lat, lng, current_drs) VALUES
  ('Velachery, Chennai',   'Chennai', 'GG-CHN-0042', 12.9816, 80.2209, 28),
  ('T Nagar, Chennai',     'Chennai', 'GG-CHN-0018', 13.0418, 80.2341, 42),
  ('Anna Nagar, Chennai',  'Chennai', 'GG-CHN-0031', 13.0850, 80.2101, 15),
  ('Tambaram, Chennai',    'Chennai', 'GG-CHN-0056', 12.9249, 80.1000, 71),
  ('Adyar, Chennai',       'Chennai', 'GG-CHN-0009', 13.0012, 80.2565, 55),
  ('Guindy, Chennai',      'Chennai', 'GG-CHN-0022', 13.0067, 80.2206, 33),
  ('Kodambakkam, Chennai', 'Chennai', 'GG-CHN-0037', 13.0524, 80.2253, 60),
  ('Perambur, Chennai',    'Chennai', 'GG-CHN-0048', 13.1165, 80.2483, 82);

-- ── SEED: Workers ──────────────────────────────────
INSERT INTO workers (name, phone, platform, plan, upi_id, zone_id, weekly_premium, max_payout, trust_gps_score, total_earned, role) VALUES
  ('Ravi Kumar',    '+919876543210', 'swiggy', 'standard', 'ravi@upi',  1, 62, 700,  94, 2340, 'worker'),
  ('Priya Devi',    '+919876543211', 'zomato', 'pro',      'priya@upi', 2, 79, 1400, 91, 4200, 'worker'),
  ('Anbu Raj',      '+919876543212', 'rapido', 'basic',    'anbu@upi',  3, 29, 350,  88, 800,  'worker'),
  ('Selvi Nair',    '+919876543213', 'swiggy', 'standard', 'selvi@upi', 4, 62, 700,  96, 1750, 'worker'),
  ('Murugan S',     '+919876543214', 'zomato', 'standard', 'muru@upi',  5, 62, 700,  82, 1200, 'worker'),
  ('Deepa Krishnan','+919876543215', 'rapido', 'pro',      'deepa@upi', 6, 79, 1400, 99, 3600, 'worker'),
  ('Admin User',    '+910000000000', 'admin',  'pro',       NULL,       1, 0,  0,   100, 0,    'admin');

-- ── SEED: Sensor Readings ──────────────────────────
INSERT INTO sensor_readings (zone_id, rainfall_mm, aqi, temperature_c, wind_speed_kmh, drs_score) VALUES
  (1,  8, 142, 34.0, 18, 28), (2, 12, 198, 35.0, 22, 42),
  (3,  2, 110, 33.0, 12, 15), (4, 55, 260, 36.0, 45, 71),
  (5, 25, 220, 35.0, 30, 55), (6,  5, 155, 34.0, 20, 33),
  (7, 30, 190, 36.0, 28, 60), (8, 68, 310, 37.0, 55, 82);

-- ── SEED: Historical Payouts (Ravi Kumar) ─────────
INSERT INTO payouts (worker_id, zone_id, sensor_reading_id, amount, trigger_type, drs_at_trigger, status, transfer_time_sec, paid_at) VALUES
  (1,1,1, 960, 'rain',   94, 'paid', 240, DATE_SUB(NOW(),INTERVAL 27 DAY)),
  (1,1,1, 490, 'aqi',    78, 'paid', 180, DATE_SUB(NOW(),INTERVAL 34 DAY)),
  (1,1,1, 420, 'rain',   81, 'paid', 300, DATE_SUB(NOW(),INTERVAL 47 DAY)),
  (1,1,1, 350, 'heat',   75, 'paid', 120, DATE_SUB(NOW(),INTERVAL 83 DAY)),
  (1,1,1, 120, 'general',72, 'paid', 240, DATE_SUB(NOW(),INTERVAL 90 DAY)),
  (2,2,2,1200, 'rain',   91, 'paid', 210, DATE_SUB(NOW(),INTERVAL 27 DAY)),
  (3,3,3, 280, 'aqi',    74, 'paid', 195, DATE_SUB(NOW(),INTERVAL 34 DAY)),
  (4,4,4, 595, 'rain',   88, 'paid', 165, DATE_SUB(NOW(),INTERVAL 5  DAY));

-- Update total_earned
UPDATE workers SET total_earned = (
  SELECT COALESCE(SUM(amount),0) FROM payouts
  WHERE payouts.worker_id = workers.id AND status IN ('approved','paid')
);

-- ── SEED: Fraud Flags ─────────────────────────────
INSERT INTO fraud_flags (worker_id, reason, score) VALUES
  (4, 'Cell tower mismatch 3.2km · new zone claim',         81),
  (5, 'Static GPS during active shift · motion anomaly',    76),
  (3, 'Zero platform activity 72hrs · AQI claim',           62),
  (6, 'WiFi beacon fingerprint mismatch',                   55);

-- ── Verify ────────────────────────────────────────
SELECT '✅ GigGuard database ready!' AS status;
SELECT COUNT(*) AS zones FROM zones;
SELECT COUNT(*) AS workers FROM workers;
SELECT COUNT(*) AS payouts FROM payouts;
SELECT COUNT(*) AS fraud_flags FROM fraud_flags;
