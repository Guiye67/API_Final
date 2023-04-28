const GymClass = require("../models/class");

const getClass = async (req, res, next) => {
    let gymClass
    try {
        gymClass = await GymClass.findById(req.params.id)

        if (gymClass == null)
            return res.status(404).json({ message: 'Cannot find class' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.gymClass = gymClass
    next()
}

module.exports = {
    getClass
}