const Suggestion = require("../models/suggestion")

const getSuggestion = async (req, res, next) => {
    let suggestion
    try {
        suggestion = await Suggestion.findById(req.params.id)

        if (suggestion == null)
            return res.status(404).json({ message: 'Cannot find suggestion' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.suggestion = suggestion
    next()
}

module.exports = {
    getSuggestion
}