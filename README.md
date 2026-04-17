# SalesIQ — AI Analytics Dashboard

## What It Does
A full-stack analytics dashboard that visualizes 2 years of sales data and predicts revenue + profit using a trained machine learning model.

## Tech Stack
- Frontend: React, Vite, TailwindCSS, Recharts
- Backend: Python, Flask
- ML: scikit-learn (Random Forest)

## Project Structure

ai-analytics-dashboard/
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── data_loader.py
│   ├── requirements.txt
│   ├── sales_data.csv
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── CategoryBreakdown.jsx
│   │   │   ├── KPICard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── RegionChart.jsx
│   │   │   └── SalesLineChart.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Predictions.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md

## Local Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints
- GET /summary — aggregated KPIs and chart data
- GET /data — full dataset
- POST /predict — revenue and profit prediction

## Deployment
- Frontend → Vercel
- Backend → Render

## Environment Variables
Backend .env:
```
FLASK_ENV=development
PORT=5000
```
