const GymClass = require("../models/class")

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
        const newClass = await GymClass.save();
        res.status(201).json({newClass});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateClass = async (req, res) => {
    try {
        const updatedClass = await GymClass.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteClass = async (req, res) => {
    try {
        await GymClass.findByIdAndRemove(res.gymClass);
        res.json({ message: 'Class deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllClasses,
    getClassById,
    getClassBySignedUp,
    createClass,
    updateClass,
    deleteClass
}