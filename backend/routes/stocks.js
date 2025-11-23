const express = require("express");
const axios = require("axios");
const router = express.Router();

const FINNHUB_URL = process.env.STOCK_API_URL || "https://finnhub.io/api/v1";
const FINNHUB_KEY = process.env.STOCK_API_KEY;

if (!FINNHUB_KEY) {
  console.warn("Warning: STOCK_API_KEY not set in .env");
}

// 1) Search symbols
// GET /api/stocks/search?q=INFY
router.get("/search", async (req, res) => {
  const q = (req.query.q || "").toString().trim();
  if (!q) return res.json({ result: [] });

  try {
    const r = await axios.get(`${FINNHUB_URL}/search`, {
      params: { q, token: FINNHUB_KEY },
    });
    // Finnhub returns { count, result: [] }
    return res.json(r.data);
  } catch (err) {
    console.error("stocks/search err:", err.message || err);
    return res.status(500).json({ error: "Failed to search symbols" });
  }
});

// 2) Quote (current price)
// GET /api/stocks/quote/:symbol
router.get("/quote/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  if (!symbol) return res.status(400).json({ error: "Missing symbol" });

  try {
    const r = await axios.get(`${FINNHUB_URL}/quote`, {
      params: { symbol, token: FINNHUB_KEY },
    });
    // returns {c: current, h, l, o, pc, t}
    return res.json(r.data);
  } catch (err) {
    console.error("stocks/quote err:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// 3) Candles (historical data)
// GET /api/stocks/candles/:symbol?from=1635724800&to=1638316800&resolution=D
router.get("/candles/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const { from, to, resolution = "D" } = req.query;

  if (!symbol) return res.status(400).json({ error: "Missing symbol" });

  // If from/to not provided, default to last 30 days (server will compute)
  let fromTs = Number(from || 0);
  let toTs = Number(to || 0);
  if (!fromTs || !toTs) {
    const toNow = Math.floor(Date.now() / 1000);
    const days = 30;
    toTs = toNow;
    fromTs = toNow - days * 24 * 60 * 60;
  }

  try {
    const r = await axios.get(`${FINNHUB_URL}/stock/candle`, {
      params: {
        symbol,
        resolution,
        from: fromTs,
        to: toTs,
        token: FINNHUB_KEY,
      },
    });
    // Finnhub returns { s: "ok"/"no_data", t:[], c:[], h:[], l:[], o:[], v:[] }
    return res.json(r.data);
  } catch (err) {
    console.error("stocks/candles err:", err.message || err);
    return res.status(500).json({ error: "Failed to fetch candles" });
  }
});

module.exports = router;