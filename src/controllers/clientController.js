const Client = require("../models/client");
const crypt = require("../middleware/crypt")
const auth = require("../middleware/authentication")

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getClientById = async (req, res) => {
    res.json(res.client);
}

const createClient = async (req, res) => {
    let hashedPassword = await crypt.createCrypt(req.body.password)
    const client = new Client({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        surname: req.body.surname,
        payment: req.body.payment,
        classes: req.body.classes
    });
    
    try {
        const newClient = await client.save();
        const token = auth.create(newClient);
        res.status(201).json({newClient, token: token});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateClient = async (req, res) => {
    if (req.body.password !== null) {
        let hashedPassword = await crypt.createCrypt(req.body.password)
        req.body.password = hashedPassword
    }

    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndRemove(res.client);
        res.json({ message: 'Client deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const login = async (req, res) => {
    try {
        const clientFound = await Client.findOne({ email: req.body.email});
        if (!clientFound) return res.status(404).json({ message: 'Cannot find client' });
        
        const validPassword = await crypt.compareCrypt(req.body.password, clientFound.password)
        if (!validPassword) return res.status(401).json({ message: 'Invalid password' })
        
        const token = auth.create(clientFound);
        res.status(201).json({clientFound, token: token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    login
}