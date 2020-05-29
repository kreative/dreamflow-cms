const router = require("express").Router();
const authorsController = require("./authors.controller");

router.get("/api/authors", authorsController.getAuthors);
router.post("/api/authors", authorsController.createAuthor);
router.post("/api/authors/:id", authorsController.editAuthor);
router.delete("/api/authors/:id", authorsController.deleteAuthor);

router.get("/admin/content-type/author", authorsController.getAuthorContentTypePage);
router.get("/admin/content-type/author/:id", authorsController.getAuthorSinglePage);

module.exports = router;