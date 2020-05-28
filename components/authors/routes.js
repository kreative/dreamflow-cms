const router = require("express").Router();
const authorsController = require("./authors.controller");

router.get("/authors", authorsController.getAuthors);
router.post("/authors", authorsController.createAuthor);
router.put("/authors", authorsController.editAuthor);
router.delete("/authors", authorsController.deleteAuthor);

module.exports = router;