const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    muscle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: {
        type: String,
        require: true,
        default: "default-post-image.png"
    }
},{versionKey:false});

const post = mongoose.model("post", postSchema);

module.exports = post;