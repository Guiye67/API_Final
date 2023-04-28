const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},{versionKey:false});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;