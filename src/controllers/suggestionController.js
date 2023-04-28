const Suggestion = require("../models/suggestion")

const getAllSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find();
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSuggestionById = async (req, res) => {
    res.json(res.suggestion);
}

const createSuggestion = async (req, res) => {
    const suggestion = new Suggestion({
        title: req.body.title,
        client: req.body.email,
        description: req.body.description
    });
    
    try {
        const newSuggestion = await suggestion.save();
        res.status(201).json({newSuggestion});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateSuggestion = async (req, res) => {
    try {
        const updatedSuggestion = await Suggestion.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedSuggestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteSuggestion = async (req, res) => {
    try {
        await Suggestion.findByIdAndRemove(res.suggestion);
        res.json({ message: 'Suggestion deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllSuggestions,
    getSuggestionById,
    createSuggestion,
    updateSuggestion,
    deleteSuggestion
}