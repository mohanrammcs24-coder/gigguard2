



# 🛡️ GigGuard



### *"Because the rain doesn't care about your rent."*





**AI-Powered · Zero-Claim · Parametric Income Insurance · For India's 8M Gig Workers**



## &#x20;

## The Story That Started Everything





Cyclone Michaung was making landfall near Chennai. Zomato suspended operations across 11 zones. Swiggy followed within the hour.

**Kumar** — a Swiggy delivery partner with 4 years of experience and a 4.9 rating — sat at home watching the rain. He had ₹200 in his wallet, rent due in 3 days, and absolutely nothing he could do.



He didn't qualify for health insurance. His vehicle warranty didn't cover weather. There was no "weather disruption claim" form to fill. There was no one to call.

By the time the storm passed — **52 hours later** — kumar had lost **₹1,900** in income.

&#x20;

## 💡 The Insight That Changes Everything



Every insurance platform today asks the same question:



"What happened to you? Prove it. 

**GigGuard asks a different question:**



"We already know what happened. Here's your money. 



This is **parametric insurance** — taken further than anyone has before.

GigGuard doesn't wait for a claim. It doesn't ask for documents. It doesn't have a call centre. The moment a verified disruption hits a worker's zone — rainfall threshold crossed, AQI spiked, curfew declared — **GigGuard pays automatically, silently, and instantly.**



The worker gets a WhatsApp message:



🛡️ GigGuard: Heavy rain detected in your zone (Velachery, Chennai).
₹480 has been transferred to your UPI. Stay safe. — Team GigGuard


*That's it. That's the whole experience.*





## 👥 Who We're Building For

### Primary Persona: The Urban Food Delivery Partner (Zomato / Swiggy)



|Attribute|Detail|
|-|-|
|🏙️ Cities|Chennai, Bengaluru, Mumbai, Hyderabad, Delhi|
|⏱️ Work Hours|8–12 hrs/day, 5–7 days/week|
|💰 Daily Earnings|₹600 – ₹1,000|
|📆 Payment Cycle|Weekly platform settlements|
|📱 Tech Usage|Comfortable with apps, uses UPI daily|
|🗣️ Language|Prefers regional — Tamil, Hindi, Telugu, Kannada|
|😰 Biggest Fear|Losing a full day's income with no backup|
|🤝 Trust Level|Low trust in traditional insurance (complex, slow, expensive)|

### &#x20;

### We're Protecting



|Persona|City|Risk Profile|Biggest Threat|
|-|-|-|-|
|Kumar — Full-timer, sole earner|Chennai|High|Monsoon flooding, cyclones|
|Priya — Part-timer, student|Delhi|Medium|Winter AQI spikes (>400)|
|Rajan — Veteran, 6 yrs experience|Bengaluru|Medium|Sudden local strikes, traffic blackouts|

### 

### The World With vs Without GigGuard



|Situation|Without GigGuard|With GigGuard|
|-|-|-|
|Heavy rain shuts zone for 12 hrs|Worker loses ₹500. No recourse.|₹480 auto-transferred in 4 mins|
|Delhi AQI hits 380 for a day|Worker stays home. ₹700 lost.|70% daily average paid out instantly|
|Local strike blocks zone access|Worker finds out too late|SMS alert sent before worker leaves home|
|Worker tries to claim|10-step process, 7–14 days waiting|**There is no claim process**|
|Premium charged during sick week|Charged anyway|Premium auto-paused. Zero charge.|



## 🧠 HyperZone Intelligence Engine (HIE)



Every other solution works at the city level. We work at the street level.



GigGuard divides every Indian metro into a dynamic **500m × 500m grid**. Each cell gets a **Disruption Risk Score (DRS)** — a number from 0–100 — updated every 30 minutes, around the clock.


DRS = f(Rainfall, AQI, Temperature, Wind, Traffic, Social Alerts, Historical Patterns)



DRS > 70  →  Automatic claim pipeline begins
DRS > 90  →  Immediate payout, no additional validation needed




### Data Sources Powering the Engine



|Data Source|Signal|Frequency|
|-|-|-|
|OpenWeatherMap API|Rainfall mm, storm alerts|Every 30 mins|
|OpenAQ / CPCB API|AQI by pin code|Every 1 hour|
|IMD Alert RSS Feed|Red/Orange weather alerts|Real-time|
|NewsAPI + Google Alerts|Curfews, strikes, closures|Every 15 mins|
|HERE Maps Traffic API|Zone congestion index|Every 30 mins|
|Worker GPS History|Verified active delivery zones|On login|
|Platform API (Mock)|Zone suspension signals|Real-time|



## ⚡ The 5 Parametric Triggers



|ID|Trigger|Condition|Payout % of Daily Avg|Source|
|-|-|-|-|-|
|T-01|🌧️ Monsoon Blackout|Rainfall >50mm in 6hrs in worker's grid|50–100%|OpenWeatherMap + IMD|
|T-02|🔥 Heat Lockout|Temp >43°C + Heat index advisory|30–60%|IMD Red Alert|
|T-03|☁️ Toxic Air Day|AQI >300 for >4 consecutive hrs|40–80%|OpenAQ + CPCB|
|T-04|🌊 Flood Emergency|IMD Red Alert + zone GPS waterlogged|100%|IMD + Google Flood Hub|
|T-05|🚫 Zone Lockdown|Verified curfew/strike in pin code >3hrs|60–100%|NewsAPI + Govt RSS|

&#x20;



## 🛰️ GPS Anti-Spoofing Shield — TrustGPS Engine



A payout system is only as trustworthy as the location data it relies on.



Parametric insurance that pays based on worker zone presence has one critical attack surface: **GPS spoofing**. Bad actors can fake their GPS coordinates to appear inside a disruption zone without actually being there — collecting payouts fraudulently.



**GigGuard's TrustGPS Engine is a dedicated, multi-signal GPS verification layer that makes location fraud computationally expensive and statistically detectable.**





### 🔍 How GPS Spoofing is Detected



TrustGPS runs a composite trust score using **5 independent signal streams**, each validated against the others:


TrustGPS Score = Σ (Signal Weight × Signal Confidence)


               = \\\\\\\[Network Cell] + \\\\\\\[Accelerometer] + \\\\\\\[Historical Pattern]

&#x20;               + \\\\\\\[Platform Telemetry] + \\\\\\\[Beacon Cross-check]


#### Signal 1: Network Cell Tower Triangulation (Weight: 0.30)



* GPS location is cross-validated against the nearest **3–5 cell towers** via mobile network APIs



* If GPS says "Velachery, Chennai" but cell towers resolve to "Adyar, Chennai" (3.5 km away) → **anomaly flagged**



* Spoofed coordinates cannot fake cell tower signals without hardware-level interference



#### Signal 2: Accelerometer \& Motion Coherence (Weight: 0.25)



* Delivery workers in active zones exhibit **characteristic motion signatures**: stop-start patterns, speed 10–40 km/h, frequent GPS trajectory changes



* If GPS location updates are moving in a straight line or are perfectly static during an active shift → **physics anomaly detected**



* A parked spoofer cannot fake the erratic motion fingerprint of an actual delivery run



#### Signal 3: Historical Zone Footprint (Weight: 0.20)



* Every worker builds a **personal zone heatmap** over time from verified past sessions



* A trigger claim from a zone the worker has **never delivered in** (and is not their registered zone) → **location anomaly flag**



* New zones are allowed with lower initial trust score, requiring additional signals to confirm

#### Signal 4: Platform Delivery Telemetry (Weight: 0.15)



* Cross-referenced with Zomato/Swiggy mock API: was the worker **assigned orders in this zone** in the past 48 hours?



* A worker with zero platform activity in a zone who suddenly "appears" there during a disruption event → **high suspicion flag**



* Active delivery assignment is the strongest proof of legitimate zone presence



#### Signal 5: WiFi / Bluetooth Beacon Cross-check (Weight: 0.10)



* Ambient WiFi SSIDs and Bluetooth beacons are passively scanned (with consent) and matched to **known zone beacon fingerprints**



* A GPS location of "Phoenix MarketCity area, Chennai" should match known commercial WiFi patterns for that area



* Spoofed GPS cannot fake the physical RF environment of a location





### 📊 TrustGPS Score → Payout Decision


TrustGPS Score 80–100  →  ✅ High Confidence    — Payout auto-approved


TrustGPS Score 55–79   →  ⚠️  Medium Confidence — Payout delayed 90 mins, re-check


TrustGPS Score 30–54   →  🔶 Low Confidence     — Payout held, human review queue


TrustGPS Score 0–29    →  ❌ Fraud Suspected     — Auto-rejected, account flagged




### 🧩 TrustGPS Integration in Payout Pipeline




DISRUPTION EVENT DETECTED (DRS > 70)
           │
           ▼
    Worker in registered zone?
           │
        YES ▼
    TrustGPS Engine invoked
           │
    ┌──────┴──────────────────────────┐
    │  Cell Tower Check               │
    │  Accelerometer Coherence        │
    │  Historical Footprint Match     │
    │  Platform Telemetry             │
    │  Beacon Cross-check             │
    └──────┬──────────────────────────┘
           │
    Composite TrustGPS Score computed
           │
    ┌──────┴──────────┬──────────────┐
    ▼                 ▼              ▼
Score ≥ 80        Score 55–79    Score < 55
Auto-Approve      Hold 90min     Human Review
    │             Re-validate        │
    ▼                 │              ▼
UPI Transfer      ──►│          Fraud Queue
WhatsApp Sent         │
                      ▼
                  Re-score \\\\\\\&
                  Approve/Reject






### 🤖 TrustGPS ML Model




Model        : Gradient Boosted Classifier (XGBoost)


Inputs       : cell\\\\\\\_tower\\\\\\\_match\\\\\\\_score, motion\\\\\\\_pattern\\\\\\\_score,
               historical\\\\\\\_zone\\\\\\\_match, platform\\\\\\\_activity\\\\\\\_48h,
               beacon\\\\\\\_fingerprint\\\\\\\_confidence, gps\\\\\\\_jump\\\\\\\_velocity,
               coordinate\\\\\\\_precision\\\\\\\_anomaly, time\\\\\\\_in\\\\\\\_zone\\\\\\\_minutes


Output       : TrustGPS Score (0–100), Spoofing Risk Category


False Positive Target : < 2% (legitimate workers never blocked)


Retraining   : Weekly, incorporating newly confirmed fraud cases


### Key Detection Heuristics

|Anomaly Signal|What It Detects|Flag Weight|
|-|-|-|
|GPS velocity > 200 km/h between pings|Coordinate teleportation (spoofing app)|Critical|
|Zero accelerometer variance for >10 min|Static device faking movement|High|
|Cell tower city ≠ GPS city|Gross location fabrication|Critical|
|Zone first-visit during disaster window|Opportunistic zone-jumping|Medium|
|Identical GPS coords across multiple accounts|GPS value copy-pasting|High|
|GPS precision too perfect (no natural drift)|Emulated GPS signal|Medium|



### 🔐 Worker Privacy Commitment



GigGuard only collects location data **during active coverage windows** (when the worker has opted in and coverage is active). The TrustGPS system:



* ✅ Uses on-device processing where possible (no raw GPS stream sent to servers)



* ✅ Stores only **zone-level** location (not street-level coordinates)



* ✅ Provides workers a **"Location Audit Log"** — full transparency on what was recorded



* ✅ Complies with India's **Digital Personal Data Protection Act (DPDPA) 2023**



* ❌ Never sells location data to any third party



* ❌ Never monitors workers outside of active coverage windows







## 🤖 AI/ML Architecture — The Brain of GigGuard



### Module 1: Dynamic Premium Engine


Model        : XGBoost Regressor


Inputs       : zone\\\\\\\_flood\\\\\\\_score, aqi\\\\\\\_7day\\\\\\\_avg, temp\\\\\\\_forecast,
               worker\\\\\\\_tenure, claim\\\\\\\_history, activity\\\\\\\_score, season\\\\\\\_index


Output       : weekly\\\\\\\_premium (₹, personalized per worker)


Training Data: 3 years simulated weather + disruption events (Indian metros)


Retraining   : Every Sunday 2 AM IST


### Module 2: TruthNet — Fraud Detection Engine


Model        : Isolation Forest + Rule-Based Layer


Fraud Signals:


  \\\\\\\[0.35 weight] Worker GPS not in disrupted zone (enhanced by TrustGPS score)
  \\\\\\\[0.25 weight] Zero platform activity in 48hrs before trigger (ghost account)
  \\\\\\\[0.20 weight] Claim attempt on non-trigger day
  \\\\\\\[0.15 weight] Device fingerprint matches known fraud cluster
  \\\\\\\[0.05 weight] Multiple accounts linked to same UPI ID

Fraud Score Output:


  Score < 50  →  ✅ Auto-approve payout


  Score 50–75 →  ⚠️  Soft flag, payout held 2 hours


  Score > 75  →  ❌ Auto-reject + human review queue


### Module 3: TrustGPS Engine




Model        : XGBoost Classifier


Inputs       : cell\\\\\\\_tower\\\\\\\_match, motion\\\\\\\_coherence, historical\\\\\\\_footprint,
               platform\\\\\\\_telemetry, beacon\\\\\\\_fingerprint, gps\\\\\\\_anomaly\\\\\\\_flags


Output       : TrustGPS Score (0–100)


Threshold    : Score < 55 → Fraud queue; Score ≥ 80 → Auto-approve


Retraining   : Weekly with confirmed fraud case labels




### Module 4: Disruption Forecaster


Model        : Facebook Prophet (Time Series)


Purpose      : Predict high-disruption zones 7 days in advance


Use Cases    :
  → Adjust Monday premiums proactively
  → Send Sunday night alerts ("Risky week ahead 🌧️")
  → Help insurers manage reserve funds for expected claim volume


Output       : Disruption probability per zone per day (next 7 days)




### Module 5: Worker Risk Profiler (Onboarding)


Inputs       : City, zone GPS, platform (Zomato/Swiggy),
               avg daily hours, month of onboarding


Output       : Risk Tier (Low / Medium / High) → maps to starting premium


Logic        : Zone matched to 2yr historical disruption dataset,
               Zomato vs Swiggy order density patterns factored separately




## 💰 The Weekly Premium Model



### Why Weekly?



Dinesh doesn't think about next month. He thinks about **this week's rent, groceries, and EMI**. GigGuard is built around his reality — not a finance textbook.



### Plan Tiers

|Plan|Weekly Premium|Max Weekly Payout|Triggers Covered|
|-|-|-|-|
|🟢 Basic|₹29|₹350|Rainfall + AQI|
|🔵 Standard|₹49|₹700|All 5 triggers|
|🟣 Pro|₹79|₹1,400|All 5 + priority payout|

### 

### AI-Adjusted Pricing — Every Monday Morning


Final Premium = Base Tier Premium
              ± Zone Risk Adjustment       (2yr historical disruption data)


              ± 7-Day Weather Forecast     (IMD forecast for worker's zone)


              ± Loyalty Discount           (0 claims in last 8 weeks = -₹5)


              ± Seasonal Multiplier        (Monsoon months = higher base risk)


**Real example — Dinesh, Standard Plan, Velachery, October:**


Base Premium:                  ₹49
Zone risk (flood-prone area): +₹12
Cyclone forecast this week:   +₹18
Loyalty discount (8 weeks):    -₹5
──────────────────────────────────
Final Weekly Premium:          ₹74


### ✨ Auto-Pause: Our Boldest Feature



If our system detects a worker has been inactive for 5+ consecutive days, the premium is **automatically paused**. Zero charges. Resumes the moment they go active again.



No insurance product in India does this today.





## 🏗️ Tech Stack



|Layer|Technology|Why This Choice|
|-|-|-|
|Frontend|Next.js 14 (App Router)|SSR + PWA — one codebase for web and mobile browser|
|UI|Tailwind CSS + shadcn/ui|Fast, accessible, clean component library|
|Backend|FastAPI (Python)|Async, high-performance, native ML integration|
|AI/ML|XGBoost, scikit-learn, Prophet|Industry-grade, Python-native, well-documented|
|Primary DB|PostgreSQL via Supabase|Relational — policies, workers, payouts|
|Cache + Realtime|Redis|Live DRS scores, trigger event queue|
|Auth|Supabase Auth (Phone OTP)|Workers log in via mobile number, no email needed|
|Weather|OpenWeatherMap (Free tier)|Real rainfall, temperature, storm data|
|AQI|OpenAQ (Free, open)|Real Indian city AQI data|
|News/Alerts|NewsAPI + IMD RSS|Social disruption detection|
|Maps|Leaflet.js + OpenStreetMap|Zone visualization, no API key limits|
|Payments|Razorpay Test Mode|UPI payout simulation, realistic demo|
|Notifications|WhatsApp Cloud API / Twilio|Worker alerts via WhatsApp/SMS|
|Location Trust|TrustGPS Engine (custom)|Multi-signal GPS anti-spoofing|
|Hosting|Vercel (frontend) + Railway (backend)|Free tiers, instant CI/CD deploy|



🔄 Full Application Workflow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ONBOARDING  (One-time · Under 4 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
① Enter mobile number → receive OTP


② Select platform: Zomato / Swiggy


③ Drop pin on map → system assigns 500m zone


④ Declare average daily working hours


⑤ AI Risk Profiler runs → recommends best plan


⑥ Worker selects plan → links UPI ID


⑦ First week premium deducted


⑧ Coverage active immediately ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVERY SUNDAY NIGHT  (Fully Automated)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Premium Engine recalculates for each worker


→ WhatsApp sent: "Your coverage this week:
  ₹700 max payout. Premium: ₹62. Stay safe! 🛡️"


→ Premium auto-debited Monday morning

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
24/7 DISRUPTION MONITORING  (Every 30 Minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ HIE polls all data sources


→ DRS updated for every active zone


→ If DRS > 70 in a worker's zone:
   ├─ Was worker active in last 48hrs?
   ├─ TrustGPS Engine validates location authenticity
   │   ├─ Cell tower cross-check ✓
   │   ├─ Motion coherence analysis ✓
   │   ├─ Historical zone footprint ✓
   │   ├─ Platform telemetry match ✓
   │   └─ Beacon fingerprint ✓
   ├─ TrustGPS Score ≥ 80 → High confidence
   ├─ TruthNet fraud score run
   └─ If all clear:


      → Razorpay API triggered (mock)


      → UPI transfer initiated


      → WhatsApp notification sent


      → Dashboard updated in real-time

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORKER DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ This week's max payout + active plan


→ Live zone risk: "Your area: LOW RISK 🟢"


→ Payout history with event details


→ TrustGPS score for last session (transparency)


→ Weekly premium history


→ Next week disruption forecast

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN / INSURER DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Live disruption heatmap across all cities


→ Claims triggered today / this week


→ Loss ratio by zone, city, and plan tier


→ TruthNet + TrustGPS fraud flagged queue


→ GPS spoofing attempt heatmap (real-time)


→ 7-day forecasted claim volume by zone


→ Premium pool health indicator






## 📅 6-Week Execution Plan



|Week|Theme|Deliverables|
|-|-|-|
|**Week 1**|Foundation|Repo, DB schema, API integrations (weather/AQI), onboarding UI|
|**Week 2**|HIE Engine|500m zone scoring system, DRS calculation, trigger detection|
|**Week 3**|Premium \& Policy|Weekly pricing engine, AI model v1, policy management|
|**Week 4**|Automation|Auto-claim pipeline, Razorpay mock payout, WhatsApp alerts|
|**Week 5**|AI, Fraud \& TrustGPS|TruthNet model, TrustGPS Engine, Disruption Forecaster, Worker Risk Profiler|
|**Week 6**|Polish \& Submit|Dual dashboard, demo simulation, 5-min video, pitch deck|



## 👥 Team



|Name|Role|College|
|-|-|-|
|MOHAN RAM M|TEAM LEADER|Bannari Amman Institute of Technology, Sathyamangalam|
|SITHARTH R|MEMBER|Bannari Amman Institute of Technology, Sathyamangalam|
|NANDHAKUMAR S|MEMBER|Bannari Amman Institute of Technology, Sathyamangalam|
|MALARAVAN E|MEMBER|Bannari Amman Institute of Technology, Sathyamangalam|
|*GAVUTHAM D*|MEMBER|Bannari Amman Institute of Technology, Sathyamangalam|



&#x20;                                                                         



&#x20;                                                                                     THANK YOU!



