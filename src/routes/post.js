const express = require("express");
const router = express.Router();
const images = require("../middleware/images");
const postMid = require("../middleware/postMid")
const controller = require("../controllers/postController")
const auth = require("../middleware/authentication")
const path = require("path")

router.get('/', auth.verify, controller.getAllPosts);

router.get('/:id', auth.verify, postMid.getPost, controller.getPostById);

router.post('/', auth.verify, controller.createPost);

router.put('/:id', auth.verify, postMid.getPost, controller.updatePost);

router.delete('/:id', auth.verify, postMid.getPost, controller.deletePost);

router.use("/img", express.static(path.join(__dirname, "../../img")));

router.get("/img/:image", auth.verify, controller.getImage)

router.post("/img/:id", auth.verify, images.upload.single("image"), controller.uploadPostImage)

module.exports = router