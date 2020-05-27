const router = require("express").Router();
const FAQController = require("./faqs.controller");

router.get("/faqs", FAQController.getFAQs);
router.post("/faqs", FAQController.createFAQ);
router.put("/faqs", FAQController.editFAQ);
router.delete("/faqs", FAQController.deleteFAQ);

module.exports = router;