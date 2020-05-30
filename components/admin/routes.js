const router = require("express").Router();
const adminController = require("./admin.controller");

router.get("/admin", adminController.getAdminHomepage);
router.get("/admin/404", adminController.get404Page);

module.exports = router;