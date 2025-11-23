const mongoose = require('mongoose');


const txSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
symbol: { type: String, required: true },
qty: { type: Number, required: true },
price: { type: Number, required: true },
type: { type: String, enum: ['BUY', 'SELL'], required: true },
date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Transaction', txSchema);