const bcrypt = require("bcrypt")
const config = require("../config")
const saltRounds = config.SALT_ROUNDS

const createCrypt = async (password) => {
    return await bcrypt.hash(password, Number(saltRounds))
}

const compareCrypt = async (password, recievedPassword) => {
    return await bcrypt.compare(password, recievedPassword)
}

module.exports = {
    createCrypt,
    compareCrypt
}