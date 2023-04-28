const Post = require("../models/post")

const getPost = async (req, res, next) => {
    let post
    try {
        post = await Post.findById(req.params.id)

        if (post == null)
            return res.status(404).json({ message: 'Cannot find post' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.post = post
    next()
}

module.exports = {
    getPost
}