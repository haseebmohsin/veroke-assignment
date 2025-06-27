# 📈 Stock Tracker App

A lightweight Next.js 15 app to search stocks, manage a watchList, view live prices, and see historical charts.

---

## 🚀 Features

- 🔍 Search stocks by name or ticker
- ⭐ Add/remove items in your personal watchList
- ⏱ Live price updates (polling)
- 📊 Historical price charts using Alpha Vantage

---

## 🔧 Setup

1. Clone the repo:
   ```bash
   git clone <repo-url> && cd veroke-assignment
   ```
2. Install dependencies:
   npm install
3. Create .env and add the below key values
   NEXT_PUBLIC_BASE_API_URL="https://www.alphavantage.co/query"
   ALPHA_VANTAGE_KEY=YOUR_API_KEY
4. Run in dev mode:
   npm run dev
5. Open your browser at http://localhost:3000
