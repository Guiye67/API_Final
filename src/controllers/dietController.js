const Diet = require("../models/diet")

const getAllDiets = async (req, res) => {
    try {
        const diets = await Diet.find();
        res.json(diets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getDietById = async (req, res) => {
    res.json(res.diet);
}

const getDietByClient = async (req, res) => {
    try {
        const diets = await Diet.find({ client: req.body.clientId });
        res.json(diets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createDiet = async (req, res) => {
    const diet = new Diet({
        client: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        objective: req.body.objective,
        allergens: req.body.allergens
    });
    
    try {
        const newDiet = await diet.save();
        res.status(201).json({newDiet});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateDiet = async (req, res) => {
    try {
        const updatedDiet = await Diet.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedDiet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteDiet = async (req, res) => {
    try {
        await Diet.findByIdAndRemove(res.diet);
        res.json({ message: 'Diet deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllDiets,
    getDietById,
    getDietByClient,
    createDiet,
    updateDiet,
    deleteDiet
}