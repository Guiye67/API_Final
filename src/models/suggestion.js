const mongoose = require("mongoose");
const suggestionSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    client: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    resolved: {
        type: Boolean,
        require: true,
        default: false
    }
},{versionKey:false});

const suggestion = mongoose.model("suggestion", suggestionSchema);

module.exports = suggestion;