const Diet = require("../models/diet")

const getDiet = async (req, res, next) => {
    let diet
    try {
        diet = await Diet.findById(req.params.id)

        if (diet == null)
            return res.status(404).json({ message: 'Cannot find diet' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.diet = diet
    next()
}

module.exports = {
    getDiet
}