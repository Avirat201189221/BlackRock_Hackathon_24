const mongoose = require('mongoose');


const MutualFund = new mongoose.Schema({
    mutualFund: { type: String },
    amount: { type: Number }
}, { timestamps: true });

const IndianStockMarket = new mongoose.Schema({
    companyName: { type: String },
    units: { type: Number },
    amount: { type: Number }
}, { timestamps: true });

const Fd = new mongoose.Schema({
    bankName: { type: String },
    amountInvested: { type: Number },
    tenure: { type: Number },
    interestRate: { type: Number }
}, { timestamps: true });

const usShares = new mongoose.Schema({
    companyName: { type: String },
    units: { type: Number },
    amount: { type: Number }
}, { timestamps: true });

const rbiBonds = new mongoose.Schema({
    units: { type: Number }
}, { timestamps: true });

const sgbBonds = new mongoose.Schema({
    units: { type: Number }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    phoneNumber: { type: String },
    password: {type: String},
    amount: { type: Number },
    indianStockMarketInvestment: [{ type: IndianStockMarket }],
    mutualFundInvestment: [{ type: MutualFund }],
    fdInvestment: [{ type: Fd }],
    usSharesInvestment: [{ type: usShares }],
    rbiBondsInvestment: [{ type: rbiBonds }],
    sgbBondsInvestment: [{ type: sgbBonds }],
});

module.exports = mongoose.model('User', UserSchema);