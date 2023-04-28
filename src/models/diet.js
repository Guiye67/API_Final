const mongoose = require("mongoose");
const dietSchema = mongoose.Schema({
    client: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    weight: {
        type: String,
        require: true
    },
    height: {
        type: String,
        require: true
    },
    objective: {
        type: String,
        require: true
    },
    allergens: {
        type: String,
        require: true
    }
},{versionKey:false});

const diet = mongoose.model("diet", dietSchema);

module.exports = diet;