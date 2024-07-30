const mongoose = require('mongoose');
const IndianStockMarket = require('./indianStockMarket');
const MutualFund = require('./mutualFund');
const Fd = require('./fixedDeposit');

const MutualFund = new mongoose.Schema({
    mutualFund: { type: toString},
    amount: { type: Number}
});

const IndianStockMarket = new mongoose.Schema({
    companyName: { type: String },
    units: { type: Number },
    amount: { type: Number }
});

const Fd = new mongoose.Schema({
    bankName: { type: String},
    amount: { type: Number}
});

const UserSchema = new mongoose.Schema({
    phoneNumber: { type: String },
    amount: { type: Number },
    indianStockMarketInvestment: [{ type: IndianStockMarket }],
    mutualFundInvestment: [{ type: MutualFund }],
    fdInvestment: [{ type: Fd }]
});

module.exports = mongoose.model('User', UserSchema);
