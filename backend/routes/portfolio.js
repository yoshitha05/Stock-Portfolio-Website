const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');
const Holding = require('../models/Holding');
const Transaction = require('../models/Transaction');


// POST /api/portfolio/trade
// body: { symbol, qty, price, type: 'BUY'|'SELL' }
router.post('/trade', auth, async (req, res) => {
	try {
		const userId = req.user.id;
		let { symbol, qty, price, type } = req.body;
		if (!symbol || !qty || !price || !type) return res.status(400).json({ msg: 'Missing fields' });
		symbol = String(symbol).toUpperCase();
		qty = Number(qty);
		price = Number(price);
		if (!qty || qty <= 0 || !price || price <= 0) return res.status(400).json({ msg: 'Invalid qty or price' });
		if (!['BUY', 'SELL'].includes(type)) return res.status(400).json({ msg: 'Invalid trade type' });

		// Create transaction record
		const tx = new Transaction({ user: userId, symbol, qty, price, type });
		await tx.save();

		// Update holdings
		let holding = await Holding.findOne({ user: userId, symbol });

		if (type === 'BUY') {
			if (holding) {
				// Recalculate average price
				const existingQty = holding.qty;
				const newQty = existingQty + qty;
				const totalCost = (holding.avgPrice * existingQty) + (price * qty);
				holding.avgPrice = totalCost / newQty;
				holding.qty = newQty;
				await holding.save();
			} else {
				holding = new Holding({ user: userId, symbol, qty, avgPrice: price });
				await holding.save();
			}
		} else if (type === 'SELL') {
			if (!holding) return res.status(400).json({ msg: 'No holdings to sell' });
			if (qty > holding.qty) return res.status(400).json({ msg: 'Not enough quantity' });
			holding.qty = holding.qty - qty;
			if (holding.qty === 0) {
				await Holding.deleteOne({ _id: holding._id });
			} else {
				await holding.save();
			}
		}

		return res.json({ success: true, tx });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


// GET /api/portfolio/holdings
router.get('/holdings', auth, async (req, res) => {
	try {
		const userId = req.user.id;
		const holdings = await Holding.find({ user: userId });

		// Fetch live prices in parallel (best-effort)
		const enriched = await Promise.all(holdings.map(async h => {
			try {
				const quote = await axios.get(`${process.env.STOCK_API_URL}/quote?symbol=${encodeURIComponent(h.symbol)}&token=${process.env.STOCK_API_KEY}`);
				const current = quote.data.c || null;
				const pnl = current ? ((current - h.avgPrice) * h.qty) : null;
				return {
					_id: h._id,
					symbol: h.symbol,
					qty: h.qty,
					avgPrice: h.avgPrice,
					currentPrice: current,
					pnl
				};
			} catch (err) {
				return { _id: h._id, symbol: h.symbol, qty: h.qty, avgPrice: h.avgPrice, currentPrice: null, pnl: null };
			}
		}));

		res.json(enriched);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


// GET /api/portfolio/transactions
router.get('/transactions', auth, async (req, res) => {
	try {
		const userId = req.user.id;
		const txs = await Transaction.find({ user: userId }).sort({ date: -1 }).limit(200);
		res.json(txs);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


module.exports = router;