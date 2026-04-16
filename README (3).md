# 🛡️ GigGuard
### *"Because the rain doesn't care about your rent."*

**AI-Powered · Zero-Claim · Parametric Income Insurance · For India's 8M Gig Workers**

> Built for the **Guidewire Hackathon — Phase 3** by Team BIT Sathyamangalam

---

## 📖 The Problem

Cyclone Michaung made landfall near Chennai. Zomato suspended operations across 11 zones. Swiggy followed within the hour.

**Kumar** — a Swiggy delivery partner with 4 years of experience and a 4.9 rating — sat at home watching the rain. He had ₹200 in his wallet, rent due in 3 days, and absolutely nothing he could do.

By the time the storm passed — **52 hours later** — Kumar had lost **₹1,900** in income. No insurance. No claim form. No one to call.

---

## 💡 What GigGuard Does Differently

Every insurance platform today asks: *"What happened to you? Prove it."*

**GigGuard asks: *"We already know what happened. Here's your money."***

This is **parametric insurance** — fully automated, event-triggered, and instant. The moment a verified disruption hits a worker's zone, GigGuard pays automatically with **zero claim filing**.

The worker receives a WhatsApp message:

```
🛡️ GigGuard: Heavy rain detected in your zone (Velachery, Chennai).
₹480 has been transferred to your UPI. Stay safe. — Team GigGuard
```

*That's it. That's the whole experience.*

---

## 🖥️ Application Screens

The full frontend is a single-page application (`gigguard_phase2.html`) with 7 screens accessible via the top navigation bar:

| Screen | Description |
|--------|-------------|
| **Onboarding** | 4-step wizard — phone OTP → platform selection → zone pin-drop → plan selection |
| **Dashboard** | Live DRS score, TrustGPS score, payout history, 7-day forecast |
| **Simulate** | Fire real disruption triggers (rain/AQI/heat/flood) and watch the live payout pipeline |
| **Premium Engine** | AI-adjusted weekly premium calculator with full breakdown |
| **Policy Management** | View, modify, upgrade, pause, or cancel active policies |
| **Claims Management** | Full claims history — all auto-initiated, zero manual filing |
| **Admin Dashboard** | Insurer view — live disruption heatmap, TruthNet fraud queue, KPIs |

---

## 👥 Who We're Building For

### Primary Persona: Urban Food Delivery Partner (Zomato / Swiggy)

| Attribute | Detail |
|-----------|--------|
| 🏙️ Cities | Chennai, Bengaluru, Mumbai, Hyderabad, Delhi |
| ⏱️ Work Hours | 8–12 hrs/day, 5–7 days/week |
| 💰 Daily Earnings | ₹600 – ₹1,000 |
| 📱 Tech Usage | Comfortable with apps, uses UPI daily |
| 😰 Biggest Fear | Losing a full day's income with no backup |
| 🤝 Trust Level | Low trust in traditional insurance (complex, slow, expensive) |

### The World With vs Without GigGuard

| Situation | Without GigGuard | With GigGuard |
|-----------|-----------------|---------------|
| Heavy rain shuts zone for 12 hrs | Worker loses ₹500. No recourse. | ₹480 auto-transferred in 4 mins |
| Delhi AQI hits 380 for a day | Worker stays home. ₹700 lost. | 70% daily average paid instantly |
| Local strike blocks zone access | Worker finds out too late | SMS alert sent before worker leaves home |
| Worker tries to claim | 10-step process, 7–14 days waiting | **There is no claim process** |
| Premium during sick week | Charged anyway | Premium auto-paused. Zero charge. |

---

## 🧠 HyperZone Intelligence Engine (HIE)

GigGuard divides every Indian metro into a dynamic **500m × 500m grid**. Each cell gets a **Disruption Risk Score (DRS)** — a number from 0–100 — updated every 30 minutes.

```
DRS = f(Rainfall, AQI, Temperature, Wind, Traffic, Social Alerts, Historical Patterns)

DRS > 70  →  Automatic claim pipeline begins
DRS > 90  →  Immediate payout, no additional validation needed
```

### Data Sources

| Source | Signal | Frequency |
|--------|--------|-----------|
| OpenWeatherMap API | Rainfall mm, storm alerts | Every 30 mins |
| OpenAQ / CPCB API | AQI by pin code | Every 1 hour |
| IMD Alert RSS Feed | Red/Orange weather alerts | Real-time |
| NewsAPI + Google Alerts | Curfews, strikes, closures | Every 15 mins |
| HERE Maps Traffic API | Zone congestion index | Every 30 mins |
| Worker GPS History | Verified active delivery zones | On login |
| Platform API (Mock) | Zone suspension signals | Real-time |

---

## ⚡ The 5 Parametric Triggers

| ID | Trigger | Condition | Payout % of Daily Avg | Source |
|----|---------|-----------|----------------------|--------|
| T-01 | 🌧️ Monsoon Blackout | Rainfall >50mm in 6hrs in worker's grid | 50–100% | OpenWeatherMap + IMD |
| T-02 | 🔥 Heat Lockout | Temp >43°C + Heat index advisory | 30–60% | IMD Red Alert |
| T-03 | ☁️ Toxic Air Day | AQI >300 for >4 consecutive hrs | 40–80% | OpenAQ + CPCB |
| T-04 | 🌊 Flood Emergency | IMD Red Alert + zone GPS waterlogged | 100% | IMD + Google Flood Hub |
| T-05 | 🚫 Zone Lockdown | Verified curfew/strike in pin code >3hrs | 60–100% | NewsAPI + Govt RSS |

---

## 📍 TrustGPS Engine — Anti-Spoofing Shield

Parametric insurance has one critical attack surface: **GPS spoofing**. TrustGPS is a multi-signal GPS verification layer that makes location fraud computationally expensive and statistically detectable.

```
TrustGPS Score = [Network Cell] + [Accelerometer] + [Historical Pattern]
               + [Platform Telemetry] + [Beacon Cross-check]
```

### 5 Signal Streams

| Signal | Weight | How It Works |
|--------|--------|-------------|
| Cell Tower Triangulation | 0.30 | GPS cross-validated against 3–5 nearest cell towers |
| Accelerometer & Motion Coherence | 0.25 | Delivery workers exhibit stop-start motion patterns; static GPS during active shift = anomaly |
| Historical Zone Footprint | 0.20 | Worker's personal zone heatmap built over time; first-visit during disaster = flag |
| Platform Delivery Telemetry | 0.15 | Cross-referenced with Zomato/Swiggy: was the worker assigned orders in this zone? |
| WiFi / Bluetooth Beacon Cross-check | 0.10 | Ambient WiFi SSIDs matched to known zone beacon fingerprints |

### Payout Decision Matrix

| TrustGPS Score | Decision |
|----------------|----------|
| 80–100 | ✅ High Confidence — Payout auto-approved |
| 55–79 | ⚠️ Medium Confidence — Payout delayed 90 mins, re-check |
| 30–54 | 🔶 Low Confidence — Payout held, human review queue |
| 0–29 | ❌ Fraud Suspected — Auto-rejected, account flagged |

### Key Anomaly Signals

| Signal | What It Detects | Flag Weight |
|--------|----------------|-------------|
| GPS velocity >200 km/h between pings | Coordinate teleportation (spoofing app) | Critical |
| Zero accelerometer variance >10 min | Static device faking movement | High |
| Cell tower city ≠ GPS city | Gross location fabrication | Critical |
| Zone first-visit during disaster window | Opportunistic zone-jumping | Medium |
| Identical GPS coords across multiple accounts | GPS value copy-pasting | High |
| GPS precision too perfect (no natural drift) | Emulated GPS signal | Medium |

---

## 🤖 AI/ML Architecture

### Module 1: Dynamic Premium Engine
```
Model   : XGBoost Regressor
Inputs  : zone_flood_score, aqi_7day_avg, temp_forecast,
          worker_tenure, claim_history, activity_score, season_index
Output  : weekly_premium (₹, personalized per worker)
Retrain : Every Sunday 2 AM IST
```

### Module 2: TruthNet — Fraud Detection Engine
```
Model   : Isolation Forest + Rule-Based Layer

Fraud Signals:
  [0.35] Worker GPS not in disrupted zone (enhanced by TrustGPS)
  [0.25] Zero platform activity in 48hrs (ghost account)
  [0.20] Claim attempt on non-trigger day
  [0.15] Device fingerprint matches known fraud cluster
  [0.05] Multiple accounts linked to same UPI ID

Score < 50   →  ✅ Auto-approve
Score 50–75  →  ⚠️  Hold 2 hours
Score > 75   →  ❌ Auto-reject + human review
```

### Module 3: TrustGPS Engine
```
Model     : XGBoost Classifier
Inputs    : cell_tower_match, motion_coherence, historical_footprint,
            platform_telemetry, beacon_fingerprint, gps_anomaly_flags
Output    : TrustGPS Score (0–100)
Retrain   : Weekly with confirmed fraud case labels
```

### Module 4: Disruption Forecaster
```
Model    : Facebook Prophet (Time Series)
Purpose  : Predict high-disruption zones 7 days in advance
Use Cases:
  → Adjust Monday premiums proactively
  → Send Sunday night alerts ("Risky week ahead 🌧️")
  → Help insurers manage reserve funds
Output   : Disruption probability per zone per day (next 7 days)
```

### Module 5: Worker Risk Profiler (Onboarding)
```
Inputs  : City, zone GPS, platform, avg daily hours, month of onboarding
Output  : Risk Tier (Low / Medium / High) → maps to starting premium
```

---

## 💰 Weekly Premium Model

### Plan Tiers

| Plan | Weekly Premium | Max Weekly Payout | Triggers Covered |
|------|---------------|-------------------|-----------------|
| 🟢 Basic | ₹29 | ₹350 | Rainfall + AQI |
| 🔵 Standard | ₹49 | ₹700 | All 5 triggers |
| 🟣 Pro | ₹79 | ₹1,400 | All 5 + priority payout |

### AI-Adjusted Pricing (Every Monday Morning)
```
Final Premium = Base Tier Premium
              ± Zone Risk Adjustment       (2yr historical disruption data)
              ± 7-Day Weather Forecast     (IMD forecast for worker's zone)
              ± Loyalty Discount           (0 claims in last 8 weeks = -₹5)
              ± Seasonal Multiplier        (Monsoon months = higher base risk)
```

**Real example — Kumar, Standard Plan, Velachery, October:**
```
Base Premium:                  ₹49
Zone risk (flood-prone area): +₹12
Cyclone forecast this week:   +₹18
Loyalty discount (8 weeks):    -₹5
──────────────────────────────────
Final Weekly Premium:          ₹74
```

### ✨ Auto-Pause
If a worker is inactive for 5+ consecutive days, the premium is **automatically paused**. Zero charges. Resumes the moment they go active again. No insurance product in India does this today.

---

## ⚡ Full Payout Pipeline

```
DISRUPTION EVENT DETECTED (DRS > 70)
            │
            ▼
    HIE Scan confirms event
            │
            ▼
    DRS Calculation (>70 gate)
            │
            ▼
    TrustGPS Engine
    ├─ Cell Tower Check ✓
    ├─ Accelerometer Coherence ✓
    ├─ Historical Footprint ✓
    ├─ Platform Telemetry ✓
    └─ Beacon Fingerprint ✓
            │
    TrustGPS Score ≥ 80?
            │
            ▼
    TruthNet Fraud Check
            │
    Score < 50 → Auto-approve
            │
            ▼
    Razorpay UPI Payout
            │
            ▼
    WhatsApp Notification Sent
    ─────────────────────────
    Avg pipeline time: 3.8 min
```

---

## 📊 Live Demo — Claim Records

| Claim ID | Event | Date | DRS | Fraud Score | Payout | Time |
|----------|-------|------|-----|-------------|--------|------|
| CLM-0041 | 🌧️ Monsoon Blackout — Cyclone Michaung | Nov 4, 2024 | 94 | 14/100 | ₹960 | 4 min 12 sec |
| CLM-0039 | ☁️ Toxic Air Day — AQI 340 | Oct 28, 2024 | 81 | 22/100 | ₹490 | 3 min 01 sec |
| CLM-0036 | 🌧️ Heavy Rainfall — 58mm in 6hrs | Oct 15, 2024 | 77 | 18/100 | ₹420 | 5 min 08 sec |
| CLM-0028 | 🔥 Heat Lockout — 44°C, IMD Red Alert | May 22, 2024 | 72 | 9/100 | ₹350 | 2 min 50 sec |
| CLM-0022 | 🚫 Zone Lockdown — Local Strike | Apr 10, 2024 | 70 | 31/100 | ₹120 | 4 min 30 sec |

**Total paid to Kumar: ₹2,340 across 5 events. Zero claims rejected. Zero forms filed.**

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 14 (App Router) | SSR + PWA — one codebase for web and mobile |
| UI | Tailwind CSS + shadcn/ui | Fast, accessible, clean components |
| Backend | FastAPI (Python) | Async, high-performance, native ML integration |
| AI/ML | XGBoost, scikit-learn, Prophet | Industry-grade, Python-native |
| Primary DB | PostgreSQL via Supabase | Relational — policies, workers, payouts |
| Cache + Realtime | Redis | Live DRS scores, trigger event queue |
| Auth | Supabase Auth (Phone OTP) | Workers log in via mobile, no email needed |
| Weather | OpenWeatherMap (Free tier) | Real rainfall, temperature, storm data |
| AQI | OpenAQ (Free, open) | Real Indian city AQI data |
| News/Alerts | NewsAPI + IMD RSS | Social disruption detection |
| Maps | Leaflet.js + OpenStreetMap | Zone visualization, no API key limits |
| Payments | Razorpay Test Mode | UPI payout simulation |
| Notifications | WhatsApp Cloud API / Twilio | Worker alerts via WhatsApp/SMS |
| Location Trust | TrustGPS Engine (custom) | Multi-signal GPS anti-spoofing |
| Hosting | Vercel (frontend) + Railway (backend) | Free tiers, instant CI/CD deploy |

---

## 🔄 Application Workflow

### Onboarding (One-time · Under 4 minutes)
1. Enter mobile number → receive OTP
2. Select platform: Zomato / Swiggy
3. Drop pin on map → system assigns 500m zone
4. Declare average daily working hours
5. AI Risk Profiler runs → recommends best plan
6. Worker selects plan → links UPI ID
7. First week premium deducted
8. ✅ Coverage active immediately

### Every Sunday Night (Fully Automated)
- Premium Engine recalculates for each worker
- WhatsApp sent: *"Your coverage this week: ₹700 max payout. Premium: ₹62. Stay safe! 🛡️"*
- Premium auto-debited Monday morning

### 24/7 Disruption Monitoring (Every 30 Minutes)
- HIE polls all data sources
- DRS updated for every active zone
- If DRS > 70 in worker's zone → TrustGPS + TruthNet validation → UPI transfer + WhatsApp

---

## 📅 6-Week Execution Plan

| Week | Theme | Deliverables |
|------|-------|-------------|
| **Week 1** | Foundation | Repo, DB schema, API integrations (weather/AQI), onboarding UI |
| **Week 2** | HIE Engine | 500m zone scoring, DRS calculation, trigger detection |
| **Week 3** | Premium & Policy | Weekly pricing engine, AI model v1, policy management |
| **Week 4** | Automation | Auto-claim pipeline, Razorpay mock payout, WhatsApp alerts |
| **Week 5** | AI, Fraud & TrustGPS | TruthNet model, TrustGPS Engine, Disruption Forecaster, Risk Profiler |
| **Week 6** | Polish & Submit | Dual dashboard, demo simulation, 5-min video, pitch deck |

---

## 🔐 Privacy Commitment

GigGuard collects location data **only during active coverage windows** (worker opted in). The TrustGPS system:

- ✅ Uses on-device processing where possible (no raw GPS stream to servers)
- ✅ Stores only **zone-level** location (not street-level coordinates)
- ✅ Provides workers a **"Location Audit Log"** — full transparency on what was recorded
- ✅ Complies with India's **Digital Personal Data Protection Act (DPDPA) 2023**
- ❌ Never sells location data to any third party
- ❌ Never monitors workers outside active coverage windows

---

## 👥 Team

| Name | Role | College |
|------|------|---------|
| **Mohan Ram M** | Team Leader | Bannari Amman Institute of Technology, Sathyamangalam |
| Sitharth R | Member | Bannari Amman Institute of Technology, Sathyamangalam |
| Nandhakumar S | Member | Bannari Amman Institute of Technology, Sathyamangalam |
| Malaravan E | Member | Bannari Amman Institute of Technology, Sathyamangalam |
| Gavutham D | Member | Bannari Amman Institute of Technology, Sathyamangalam |

---

## 🚀 Running the Demo

```bash
# Clone the repository
git clone https://github.com/your-org/gigguard.git
cd gigguard

# Open the frontend prototype
open gigguard_phase2.html

# Navigate using the top bar:
# Onboarding → Dashboard → Simulate → Premium Engine
#  → Policy Management → Claims → Admin Dashboard
```

The **Simulate** screen lets you:
- Adjust rainfall, AQI, temperature, and wind sliders to compute a live DRS score
- Fire preset triggers (🌧️ Cyclone Rain, ☁️ Toxic Air, 🔥 Heat Lockout, 🌊 Flood Alert)
- Watch the full 6-step payout pipeline animate in real time
- See the exact WhatsApp notification the worker would receive

---

*GigGuard — Protecting India's gig workers, one rainstorm at a time.*
