const Admin = require("../models/admin");
const emailValidator = require("./emailValidator")

const getAdmin = async (req, res, next) => {
    let admin
    try {
        admin = await Admin.findById(req.params.id)

        if (admin == null)
            return res.status(404).json({ message: 'Cannot find admin' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.admin = admin
    next()
}

const checkEmailExists = async (req, res, next) => {
    const {valid, reason, validators} = await emailValidator.isEmailValid(req.body.email);

    if (!valid) return res.status(400).json({ message: "Email not valid" });

    let admin
    try {
        admin = await Admin.find({ email: req.body.email})

        if (admin.length != 0) {
            return res.status(409).json({ message: 'Email already exists in DB' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    next();
}

module.exports = {
    getAdmin,
    checkEmailExists
}