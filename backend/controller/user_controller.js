const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

async function addIndianStocks(req, res) {
    if(!req.user) {
        return res.status(401).send({message: "Jhoothi soorbhi"});
    }
    const user = await User.findById(req.user._id);
    const { companyName, units, amount } = req.body;
    user.indianStockMarketInvestment.push({ companyName, units, amount });
    user.save();
    res.status(201).send(user);
}

async function addMutualFund(req, res) {
    if(!req.user) {
        return res.status(401).send({message: "Jhoothi soorbhi"});
    }
    const user = await User.findById(req.user._id);
    const { mutualFund, amount } = req.body;
    user.mutualFundInvestment.push({ mutualFund, amount });
    user.save();
    res.status(201).send(user);
}

async function addFd(req, res) {
    if(!req.user) {
        return res.status(401).send({message: "Jhoothi soorbhi"});
    }
    const user = await User.findById(req.user._id);
    const { bankName, amountInvested, date, tenure, interestRate } = req.body;
    user.fdInvestment.push({ bankName, amountInvested, date, tenure, interestRate });
    user.save();
    res.status(201).send(user);
}

async function addUsShares(req, res) {
    if(!req.user) {
        return res.status(401).send({message: "Jhoothi soorbhi"});
    }
    const user = await User.findById(req.user._id);
    const { companyName, units, amount } = req.body;
    user.usSharesInvestment.push({ companyName, units, amount });
    user.save();
    res.status(201).send(user);
}

async function addRbiBonds(req, res) {
    if(!req.user) {
        return res.status(401).send({message: "Jhoothi soorbhi"});
    }
    const user = await User.findById(req.user._id);
    const { units, date } = req.body;
    user.rbiBondsInvestment.push({ units, date });
    user.save();
    res.status(201).send(user);
}

async function addSgbBonds(req, res) {
    // if(!req.user) {
    //     return res.status(401).send({message: "Jhoothi soorbhi"});
    // }
    const user = await User.findById("66a95a558fef8ce6b4567db1");
    const { units, date } = req.body;
    user.sgbBondsInvestment.push({ units, date });
    user.save();
    res.status(201).send(user);
}

async function signUp(req, res) {
    const { phoneNumber, password } = req.body;
    const user = new User({ phoneNumber, password });
    try {
        await user.save();

        const token = jwt.sign({ phoneNumber }, secret_key, { expiresIn: '30d' });
        res.status(201).send({
            ...user,
            token
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

// async function add(req, res) {
//     const user = usermodel.find(req.body._id);
// }
module.exports = {signUp,
    addIndianStocks,
    addMutualFund,
    addFd,
    addUsShares,
    addRbiBonds,
    addSgbBonds
};