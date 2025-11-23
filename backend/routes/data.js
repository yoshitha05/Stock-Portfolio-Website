const router = require("express").Router();
const auth = require("../middleware/auth"); // JWT verification middleware

// Get all stocks
router.get("/stocks", async (req, res) => {
  try {
    const stocks = [
      { symbol: "AAPL", name: "Apple Inc.", price: 173 },
      { symbol: "INFY", name: "Infosys Ltd.", price: 1200 },
      { symbol: "TSLA", name: "Tesla Inc.", price: 280 },
    ];
    res.json(stocks);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get logged-in user's portfolio
router.get("/portfolio", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const portfolio = await Portfolio.find({ user: userId }); // Your MongoDB model
    res.json(portfolio);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;