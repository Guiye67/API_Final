const Client = require("../models/client");
const emailValidator = require("./emailValidator")

const getClient = async (req, res, next) => {
    let client;
    try {
        client = await Client.findById(req.params.id);

        if (client == null) 
            return res.status(404).json({ message: 'Cannot find client' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.client = client;
    next();
}

const checkEmailExists = async (req, res, next) => {
    const {valid, reason, validators} = await emailValidator.isEmailValid(req.body.email);

    if (!valid) return res.status(400).json({ message: "Email not valid" });

    let client;
    try {
        client = await Client.find({ email: req.body.email});

        if (client.length != 0) {
            return res.status(409).json({ message: 'Email already exists in DB' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    next();
}

module.exports = {
    getClient,
    checkEmailExists
};