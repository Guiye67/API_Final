const Admin = require("../models/admin");
const crypt = require("../middleware/crypt")
const auth = require("../middleware/authentication")

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAdminById = async (req, res) => {
    res.json(res.admin);
}

const createAdmin = async (req, res) => {
    let hashedPassword = await crypt.createCrypt(req.body.password)
    const admin = new Admin({
        email: req.body.email,
        password: hashedPassword
    });
    
    try {
        const newAdmin = await admin.save();
        const token = auth.create(newAdmin);
        res.status(201).json({newAdmin, token: token});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateAdmin = async (req, res) => {
    if (req.body.password !== null) {
        let hashedPassword = await crypt.createCrypt(req.body.password)
        req.body.password = hashedPassword
    }

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedAdmin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndRemove(res.admin);
        res.json({ message: 'Admin deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const adminFound = await Admin.findOne({ email: req.body.email});
        if (!adminFound) return res.status(404).json({ message: 'Cannot find admin' });
        
        const validPassword = await crypt.compareCrypt(req.body.password, adminFound.password)
        if (!validPassword) return res.status(401).json({ message: 'Invalid password' })
        
        const token = auth.create(adminFound);
        res.status(200).json({adminFound, token: token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    login
}