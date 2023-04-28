const mongoose = require("mongoose");
const classSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    days: {
        type: [String],
        require: true
    },
    hour: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    signedUp: {
        type: [String],
        require: true
    }
},{versionKey:false});

const gymClass = mongoose.model("class", classSchema);

module.exports = gymClass;