const Client = require("../models/client")
const GymClass = require("../models/class")
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
        await updateClassesSignedUp(newClient.id, newClient.classes)
        const token = auth.create(newClient);
        res.status(201).json({newClient, token: token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateClient = async (req, res) => {
    if (req.body.password != null) {
        let hashedPassword = await crypt.createCrypt(req.body.password)
        req.body.password = hashedPassword
    }

    if (req.body.payment == '1999-12-31') {
        req.body.payment = '0'
    }
    
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {new:true});
        await updateClassesSignedUp(updatedClient.id, updatedClient.classes)
        res.json(updatedClient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndRemove(res.client);
        await removeFromClassesSignedUp(res.client.id)
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
        res.status(200).json({clientFound, token: token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateClassesSignedUp = async (id, clientClasses) => {
    const classes = await GymClass.find();

    classes.forEach(async (item) => {
        if (clientClasses.includes(item.name) && !item.signedUp.includes(id)) {
            item.signedUp.push(id)
            await GymClass.findByIdAndUpdate(item.id, item, {new:true})
        } else if (!clientClasses.includes(item.name) && item.signedUp.includes(id)) {
            item.signedUp = item.signedUp.filter((x) => x != id)
            await GymClass.findByIdAndUpdate(item.id, item, {new:true})
        }
    })
}

const removeFromClassesSignedUp = async (id) => {
    const classes = await GymClass.find();

    classes.forEach(async (item) => {
        if (item.signedUp.includes(id)) {
            item.signedUp = item.signedUp.filter((x) => x != id && x != "")
            await GymClass.findByIdAndUpdate(item.id, item, {new:true})
        }
    })
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    login
}