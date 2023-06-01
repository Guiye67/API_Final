const GymClass = require("../models/class")
const Client = require("../models/client")

const getAllClasses = async (req, res) => {
    try {
        const classes = await GymClass.find();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getClassById = async (req, res) => {
    res.json(res.gymClass);
}

const getClassBySignedUp = async (req, res) => {
    try {
        const classes = await GymClass.find({ signedUp: req.params.clientId });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createClass = async (req, res) => {
    const gymClass = new GymClass({
        name: req.body.name,
        days: req.body.days,
        hour: req.body.hour,
        duration: req.body.duration,
        signedUp: req.body.signedUp,
    });

    try {
        const newClass = await gymClass.save();
        res.status(201).json({newClass});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateClass = async (req, res) => {
    try {
        const oldClass = await GymClass.findById(req.params.id);
        const updatedClass = await GymClass.findByIdAndUpdate(req.params.id, req.body, {new:true});
        await updateClientsWhenUpdateClass(oldClass, updatedClass);
        res.json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteClass = async (req, res) => {
    try {
        await GymClass.findByIdAndRemove(res.gymClass);
        await updateClientsWhenDeleteClass(res.gymClass);
        res.json({ message: 'Class deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateClientsWhenUpdateClass = async (oldClass, updatedClass) => {
    const clients = await Client.find();

    clients.forEach(async (client) => {
        if (client.classes.includes(oldClass.name)) {
            client.classes[client.classes.indexOf(oldClass.name)] = updatedClass.name;
            await Client.findByIdAndUpdate(client.id, client, {new:true})
        }
    })
}

const updateClientsWhenDeleteClass = async (classDeleted) => {
    const clients = await Client.find();

    clients.forEach(async (client) => {
        if (client.classes.includes(classDeleted.name)) {
            client.classes = client.classes.filter((item) => item != classDeleted.name);
            await Client.findByIdAndUpdate(client.id, client, {new:true})
        }
    })
}

module.exports = {
    getAllClasses,
    getClassById,
    getClassBySignedUp,
    createClass,
    updateClass,
    deleteClass
}