const mongoose = require("mongoose");
const config = require("../config");
const mongo = config.MONGO;

const dbConnection = async () => {
    try {
        await mongoose.connect(mongo);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnection;