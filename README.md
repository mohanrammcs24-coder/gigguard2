# 🛡️ GigGuard  
### AI-Powered Parametric Income Insurance for India’s Gig Economy  

> *“Because the rain doesn’t care about your rent.”*

---

## 🌍 Overview

GigGuard is a next-generation **AI-powered parametric insurance platform** designed for gig workers who face unpredictable income disruptions caused by environmental and external factors.

Unlike traditional insurance systems that rely on manual claims, GigGuard introduces a **zero-claim, event-driven payout system**, where compensation is triggered automatically using real-time data signals.

---

## ⚠️ Problem Statement

Gig workers (Zomato, Swiggy, etc.) lose **20–30% of their monthly income** due to:

- 🌧️ Heavy rainfall & floods  
- 🌫️ High air pollution (AQI)  
- 🔥 Extreme heat conditions  
- 🚧 Traffic disruptions & strikes  

There is currently **no instant, automated financial protection system** available.

---

## 💡 Solution

GigGuard leverages:

- Real-time environmental data  
- AI-based risk scoring  
- Parametric insurance triggers  

to automatically:

✔ Detect disruption  
✔ Validate user presence  
✔ Trigger payout  
✔ Notify user instantly  

---

## 🧠 Core Architecture
Data Sources → Risk Engine → Fraud Detection → Decision Engine → Payout System → Notification Layer
---

## ⚡ Key Innovations

### 🔐 TrustGPS Engine (Anti-Fraud System)
- Multi-signal GPS validation  
- Motion + behavioral analysis  
- Platform activity cross-check  

### 🌍 HyperZone Intelligence Engine
- City divided into **500m × 500m grids**  
- Dynamic Disruption Risk Score (DRS)  

---

### 🤖 AI-Powered Decision System

| Module | Model | Purpose |
|------|------|--------|
| Premium Engine | XGBoost | Dynamic pricing |
| Fraud Detection | Isolation Forest | Detect anomalies |
| Risk Forecasting | Prophet | Predict disruptions |
| TrustGPS | Classifier | Validate location |

---

## ⚡ Parametric Triggers

| ID | Trigger | Condition | Payout |
|----|--------|----------|--------|
| T-01 | 🌧️ Rainfall | > 50mm | 50–100% |
| T-02 | 🔥 Heat | > 43°C | 30–60% |
| T-03 | ☁️ AQI | > 300 | 40–80% |
| T-04 | 🌊 Flood | IMD Alert | 100% |
| T-05 | 🚫 Lockdown | Strike/Curfew | 60–100% |

---

## 💰 Dynamic Pricing Model

| Plan | Weekly Premium | Max Payout |
|------|--------------|-----------|
| 🟢 Basic | ₹29 | ₹350 |
| 🔵 Standard | ₹49 | ₹700 |
| 🟣 Pro | ₹79 | ₹1400 |

### Formula:
Final Premium = Base + Risk + Forecast - Loyalty Discount
---

## ⚡ Automated Payout Pipeline
Disruption Detected (DRS > 70)
↓
TrustGPS Validation
↓
Fraud Detection (TruthNet)
↓
Auto Approval
↓
UPI Transfer
↓
WhatsApp Notification

⏱️ **Average payout time: < 5 minutes**

---

## 📊 Example Impact

| Event | Loss (Without) | With GigGuard |
|------|--------------|--------------|
| Rain Shutdown | ₹500 | ₹480 paid instantly |
| AQI Spike | ₹700 | ₹490 covered |
| Strike | ₹600 | ₹420 paid |

---

## 🏗️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- shadcn/ui

### Backend
- FastAPI (Python)
- REST APIs

### AI/ML
- XGBoost
- Scikit-learn
- Facebook Prophet

### Database
- PostgreSQL (Supabase)

### Integrations
- OpenWeather API  
- OpenAQ API  
- NewsAPI  
- Razorpay (UPI simulation)  

---

## 🔄 Workflow

### 🧑‍💻 Onboarding
1. Phone OTP login  
2. Select platform  
3. Choose location  
4. Select plan  

---

### 🔁 Weekly Cycle
- Premium recalculated  
- Risk updated  
- Notifications sent  

---

### ⚡ Real-Time Monitoring
- Data updated every 30 mins  
- Automatic claim trigger  

---

## 🔐 Privacy & Security

- No raw GPS stored  
- Zone-level tracking only  
- User-controlled data visibility  
- DPDPA compliant  

---

## 👥 Team

| Name | Role |
|------|-----|
| Mohan Ram | Team Lead |
| Sitharth | Member |
| Nandhakumar | Member |
| Malaravan | Member |
| Gavutham | Member |

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-org/gigguard.git
cd gigguard
open:
gigguard_phase2.html
