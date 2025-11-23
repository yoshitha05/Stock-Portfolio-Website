const mongoose = require('mongoose');


const holdingSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
symbol: { type: String, required: true },
qty: { type: Number, required: true, default: 0 },
avgPrice: { type: Number, required: true, default: 0 },
});


module.exports = mongoose.model('Holding', holdingSchema);