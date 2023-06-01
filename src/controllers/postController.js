const Post = require("../models/post")
const path = require("path")

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPostById = async (req, res) => {
    res.json(res.post);
}

const createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        muscle: req.body.muscle,
        description: req.body.description
    });
    
    try {
        const newPost = await post.save();
        res.status(201).json({newPost});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndRemove(res.post);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getImage = async (req, res) => {
    res.sendFile(path.join(__dirname, "img", req.params.image))
}

const uploadPostImage = async (req, res) => {
    try {
        const images = req.file.originalname
        const updatedPost = await Post.updateOne(
            { _id: req.params.id }, 
            {
                $set: { images }
            }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getImage,
    uploadPostImage
}