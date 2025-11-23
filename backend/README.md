# Groww Clone — Backend


## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies: `npm install`
3. Start local MongoDB (or use Atlas and update MONGO_URI)
4. Run dev server: `npm run dev` (nodemon) or `npm start`


## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/stocks/quote/:symbol
- GET /api/stocks/candles/:symbol?from=&to=&resolution=
- POST /api/portfolio/trade (auth)
- GET /api/portfolio/holdings (auth)
- GET /api/portfolio/transactions (auth)