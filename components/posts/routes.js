const router = require("express").Router();
const postController = require("./posts.controller");

router.get("/posts", postController.getPosts);
router.post("/posts", postController.createPost);
router.put("/posts", postController.editPost);
router.delete("/posts", postController.deletePost);

module.exports = router;