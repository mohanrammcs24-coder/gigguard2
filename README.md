🛡️ GigGuard
"Because the rain doesn't care about your rent."
AI-Powered · Zero-Claim · Parametric Income Insurance · For India's 8M Gig Workers

Built for the Guidewire Hackathon — Phase 3 by Team BIT Sathyamangalam


📖 The Problem
Cyclone Michaung made landfall near Chennai. Zomato suspended operations across 11 zones. Swiggy followed within the hour.
Kumar — a Swiggy delivery partner with 4 years of experience and a 4.9 rating — sat at home watching the rain. He had ₹200 in his wallet, rent due in 3 days, and absolutely nothing he could do.
By the time the storm passed — 52 hours later — Kumar had lost ₹1,900 in income. No insurance. No claim form. No one to call.

💡 What GigGuard Does Differently
Every insurance platform today asks: "What happened to you? Prove it."
GigGuard asks: "We already know what happened. Here's your money."
This is parametric insurance — fully automated, event-triggered, and instant. The moment a verified disruption hits a worker's zone, GigGuard pays automatically with zero claim filing.
The worker receives a WhatsApp message:
🛡️ GigGuard: Heavy rain detected in your zone (Velachery, Chennai).
₹480 has been transferred to your UPI. Stay safe. — Team GigGuard
That's it. That's the whole experience.

🖥️ Application Screens
The full frontend is a single-page application (gigguard_phase2.html) with 7 screens accessible via the top navigation bar:
ScreenDescriptionOnboarding4-step wizard — phone OTP → platform selection → zone pin-drop → plan selectionDashboardLive DRS score, TrustGPS score, payout history, 7-day forecastSimulateFire real disruption triggers (rain/AQI/heat/flood) and watch the live payout pipelinePremium EngineAI-adjusted weekly premium calculator with full breakdownPolicy ManagementView, modify, upgrade, pause, or cancel active policiesClaims ManagementFull claims history — all auto-initiated, zero manual filingAdmin DashboardInsurer view — live disruption heatmap, TruthNet fraud queue, KPIs

👥 Who We're Building For
Primary Persona: Urban Food Delivery Partner (Zomato / Swiggy)
AttributeDetail🏙️ CitiesChennai, Bengaluru, Mumbai, Hyderabad, Delhi⏱️ Work Hours8–12 hrs/day, 5–7 days/week💰 Daily Earnings₹600 – ₹1,000📱 Tech UsageComfortable with apps, uses UPI daily😰 Biggest FearLosing a full day's income with no backup🤝 Trust LevelLow trust in traditional insurance (complex, slow, expensive)
The World With vs Without GigGuard
SituationWithout GigGuardWith GigGuardHeavy rain shuts zone for 12 hrsWorker loses ₹500. No recourse.₹480 auto-transferred in 4 minsDelhi AQI hits 380 for a dayWorker stays home. ₹700 lost.70% daily average paid instantlyLocal strike blocks zone accessWorker finds out too lateSMS alert sent before worker leaves homeWorker tries to claim10-step process, 7–14 days waitingThere is no claim processPremium during sick weekCharged anywayPremium auto-paused. Zero charge.

🧠 HyperZone Intelligence Engine (HIE)
GigGuard divides every Indian metro into a dynamic 500m × 500m grid. Each cell gets a Disruption Risk Score (DRS) — a number from 0–100 — updated every 30 minutes.
DRS = f(Rainfall, AQI, Temperature, Wind, Traffic, Social Alerts, Historical Patterns)

DRS > 70  →  Automatic claim pipeline begins
DRS > 90  →  Immediate payout, no additional validation needed
Data Sources
SourceSignalFrequencyOpenWeatherMap APIRainfall mm, storm alertsEvery 30 minsOpenAQ / CPCB APIAQI by pin codeEvery 1 hourIMD Alert RSS FeedRed/Orange weather alertsReal-timeNewsAPI + Google AlertsCurfews, strikes, closuresEvery 15 minsHERE Maps Traffic APIZone congestion indexEvery 30 minsWorker GPS HistoryVerified active delivery zonesOn loginPlatform API (Mock)Zone suspension signalsReal-time

⚡ The 5 Parametric Triggers
IDTriggerConditionPayout % of Daily AvgSourceT-01🌧️ Monsoon BlackoutRainfall >50mm in 6hrs in worker's grid50–100%OpenWeatherMap + IMDT-02🔥 Heat LockoutTemp >43°C + Heat index advisory30–60%IMD Red AlertT-03☁️ Toxic Air DayAQI >300 for >4 consecutive hrs40–80%OpenAQ + CPCBT-04🌊 Flood EmergencyIMD Red Alert + zone GPS waterlogged100%IMD + Google Flood HubT-05🚫 Zone LockdownVerified curfew/strike in pin code >3hrs60–100%NewsAPI + Govt RSS

📍 TrustGPS Engine — Anti-Spoofing Shield
Parametric insurance has one critical attack surface: GPS spoofing. TrustGPS is a multi-signal GPS verification layer that makes location fraud computationally expensive and statistically detectable.
TrustGPS Score = [Network Cell] + [Accelerometer] + [Historical Pattern]
               + [Platform Telemetry] + [Beacon Cross-check]
5 Signal Streams
SignalWeightHow It WorksCell Tower Triangulation0.30GPS cross-validated against 3–5 nearest cell towersAccelerometer & Motion Coherence0.25Delivery workers exhibit stop-start motion patterns; static GPS during active shift = anomalyHistorical Zone Footprint0.20Worker's personal zone heatmap built over time; first-visit during disaster = flagPlatform Delivery Telemetry0.15Cross-referenced with Zomato/Swiggy: was the worker assigned orders in this zone?WiFi / Bluetooth Beacon Cross-check0.10Ambient WiFi SSIDs matched to known zone beacon fingerprints
Payout Decision Matrix
TrustGPS ScoreDecision80–100✅ High Confidence — Payout auto-approved55–79⚠️ Medium Confidence — Payout delayed 90 mins, re-check30–54🔶 Low Confidence — Payout held, human review queue0–29❌ Fraud Suspected — Auto-rejected, account flagged
Key Anomaly Signals
SignalWhat It DetectsFlag WeightGPS velocity >200 km/h between pingsCoordinate teleportation (spoofing app)CriticalZero accelerometer variance >10 minStatic device faking movementHighCell tower city ≠ GPS cityGross location fabricationCriticalZone first-visit during disaster windowOpportunistic zone-jumpingMediumIdentical GPS coords across multiple accountsGPS value copy-pastingHighGPS precision too perfect (no natural drift)Emulated GPS signalMedium

🤖 AI/ML Architecture
Module 1: Dynamic Premium Engine
Model   : XGBoost Regressor
Inputs  : zone_flood_score, aqi_7day_avg, temp_forecast,
          worker_tenure, claim_history, activity_score, season_index
Output  : weekly_premium (₹, personalized per worker)
Retrain : Every Sunday 2 AM IST
Module 2: TruthNet — Fraud Detection Engine
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
Module 3: TrustGPS Engine
Model     : XGBoost Classifier
Inputs    : cell_tower_match, motion_coherence, historical_footprint,
            platform_telemetry, beacon_fingerprint, gps_anomaly_flags
Output    : TrustGPS Score (0–100)
Retrain   : Weekly with confirmed fraud case labels
Module 4: Disruption Forecaster
Model    : Facebook Prophet (Time Series)
Purpose  : Predict high-disruption zones 7 days in advance
Use Cases:
  → Adjust Monday premiums proactively
  → Send Sunday night alerts ("Risky week ahead 🌧️")
  → Help insurers manage reserve funds
Output   : Disruption probability per zone per day (next 7 days)
Module 5: Worker Risk Profiler (Onboarding)
Inputs  : City, zone GPS, platform, avg daily hours, month of onboarding
Output  : Risk Tier (Low / Medium / High) → maps to starting premium

💰 Weekly Premium Model
Plan Tiers
PlanWeekly PremiumMax Weekly PayoutTriggers Covered🟢 Basic₹29₹350Rainfall + AQI🔵 Standard₹49₹700All 5 triggers🟣 Pro₹79₹1,400All 5 + priority payout
AI-Adjusted Pricing (Every Monday Morning)
Final Premium = Base Tier Premium
              ± Zone Risk Adjustment       (2yr historical disruption data)
              ± 7-Day Weather Forecast     (IMD forecast for worker's zone)
              ± Loyalty Discount           (0 claims in last 8 weeks = -₹5)
              ± Seasonal Multiplier        (Monsoon months = higher base risk)
Real example — Kumar, Standard Plan, Velachery, October:
Base Premium:                  ₹49
Zone risk (flood-prone area): +₹12
Cyclone forecast this week:   +₹18
Loyalty discount (8 weeks):    -₹5
──────────────────────────────────
Final Weekly Premium:          ₹74
✨ Auto-Pause
If a worker is inactive for 5+ consecutive days, the premium is automatically paused. Zero charges. Resumes the moment they go active again. No insurance product in India does this today.

⚡ Full Payout Pipeline
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

📊 Live Demo — Claim Records
Claim IDEventDateDRSFraud ScorePayoutTimeCLM-0041🌧️ Monsoon Blackout — Cyclone MichaungNov 4, 20249414/100₹9604 min 12 secCLM-0039☁️ Toxic Air Day — AQI 340Oct 28, 20248122/100₹4903 min 01 secCLM-0036🌧️ Heavy Rainfall — 58mm in 6hrsOct 15, 20247718/100₹4205 min 08 secCLM-0028🔥 Heat Lockout — 44°C, IMD Red AlertMay 22, 2024729/100₹3502 min 50 secCLM-0022🚫 Zone Lockdown — Local StrikeApr 10, 20247031/100₹1204 min 30 sec
Total paid to Kumar: ₹2,340 across 5 events. Zero claims rejected. Zero forms filed.

🏗️ Tech Stack
LayerTechnologyWhyFrontendNext.js 14 (App Router)SSR + PWA — one codebase for web and mobileUITailwind CSS + shadcn/uiFast, accessible, clean componentsBackendFastAPI (Python)Async, high-performance, native ML integrationAI/MLXGBoost, scikit-learn, ProphetIndustry-grade, Python-nativePrimary DBPostgreSQL via SupabaseRelational — policies, workers, payoutsCache + RealtimeRedisLive DRS scores, trigger event queueAuthSupabase Auth (Phone OTP)Workers log in via mobile, no email neededWeatherOpenWeatherMap (Free tier)Real rainfall, temperature, storm dataAQIOpenAQ (Free, open)Real Indian city AQI dataNews/AlertsNewsAPI + IMD RSSSocial disruption detectionMapsLeaflet.js + OpenStreetMapZone visualization, no API key limitsPaymentsRazorpay Test ModeUPI payout simulationNotificationsWhatsApp Cloud API / TwilioWorker alerts via WhatsApp/SMSLocation TrustTrustGPS Engine (custom)Multi-signal GPS anti-spoofingHostingVercel (frontend) + Railway (backend)Free tiers, instant CI/CD deploy

🔄 Application Workflow
Onboarding (One-time · Under 4 minutes)

Enter mobile number → receive OTP
Select platform: Zomato / Swiggy
Drop pin on map → system assigns 500m zone
Declare average daily working hours
AI Risk Profiler runs → recommends best plan
Worker selects plan → links UPI ID
First week premium deducted
✅ Coverage active immediately

Every Sunday Night (Fully Automated)

Premium Engine recalculates for each worker
WhatsApp sent: "Your coverage this week: ₹700 max payout. Premium: ₹62. Stay safe! 🛡️"
Premium auto-debited Monday morning

24/7 Disruption Monitoring (Every 30 Minutes)

HIE polls all data sources
DRS updated for every active zone
If DRS > 70 in worker's zone → TrustGPS + TruthNet validation → UPI transfer + WhatsApp


📅 6-Week Execution Plan
WeekThemeDeliverablesWeek 1FoundationRepo, DB schema, API integrations (weather/AQI), onboarding UIWeek 2HIE Engine500m zone scoring, DRS calculation, trigger detectionWeek 3Premium & PolicyWeekly pricing engine, AI model v1, policy managementWeek 4AutomationAuto-claim pipeline, Razorpay mock payout, WhatsApp alertsWeek 5AI, Fraud & TrustGPSTruthNet model, TrustGPS Engine, Disruption Forecaster, Risk ProfilerWeek 6Polish & SubmitDual dashboard, demo simulation, 5-min video, pitch deck

🔐 Privacy Commitment
GigGuard collects location data only during active coverage windows (worker opted in). The TrustGPS system:

✅ Uses on-device processing where possible (no raw GPS stream to servers)
✅ Stores only zone-level location (not street-level coordinates)
✅ Provides workers a "Location Audit Log" — full transparency on what was recorded
✅ Complies with India's Digital Personal Data Protection Act (DPDPA) 2023
❌ Never sells location data to any third party
❌ Never monitors workers outside active coverage windows


👥 Team
NameRoleCollegeMohan Ram MTeam LeaderBannari Amman Institute of Technology, SathyamangalamSitharth RMemberBannari Amman Institute of Technology, SathyamangalamNandhakumar SMemberBannari Amman Institute of Technology, SathyamangalamMalaravan EMemberBannari Amman Institute of Technology, SathyamangalamGavutham DMemberBannari Amman Institute of Technology, Sathyamangalam

🚀 Running the Demo
bash# Clone the repository
git clone https://github.com/your-org/gigguard.git
cd gigguard

# Open the frontend prototype
open gigguard_phase2.html

# Navigate using the top bar:
# Onboarding → Dashboard → Simulate → Premium Engine
#  → Policy Management → Claims → Admin Dashboard
The Simulate screen lets you:

Adjust rainfall, AQI, temperature, and wind sliders to compute a live DRS score
Fire preset triggers (🌧️ Cyclone Rain, ☁️ Toxic Air, 🔥 Heat Lockout, 🌊 Flood Alert)
Watch the full 6-step payout pipeline animate in real time
See the exact WhatsApp notification the worker would receive


GigGuard — Protecting India's gig workers, one rainstorm at a time.
