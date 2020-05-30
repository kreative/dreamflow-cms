const router = require("express").Router();
const postController = require("./posts.controller");

router.get("/api/posts", postController.getPosts);
router.post("/api/posts", postController.createPost);
router.post("/api/posts/:id", postController.editPost);
router.delete("/api/posts/:id", postController.deletePost);

router.get("/admin/content-type/post", postController.getPostContentTypePage);
router.get("/admin/content-type/post/:id", postController.getPostSinglePage);
router.get("/admin/new-post", postController.getNewPostPage);

module.exports = router;