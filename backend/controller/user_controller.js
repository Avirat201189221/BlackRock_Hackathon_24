const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

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
module.exports = {signUp};