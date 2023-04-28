const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    payment: {
        type: String,
        require: true,
        default: "0"
    },
    classes: {
        type: [String],
        require: true,
        default: []
    }
},{versionKey:false});

const client = mongoose.model("client", clientSchema);

module.exports = client;