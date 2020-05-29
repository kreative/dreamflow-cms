const router = require("express").Router();
const FAQController = require("./faqs.controller");

router.get("/api/faqs", FAQController.getFAQs);
router.post("/api/faqs", FAQController.createFAQ);
router.post("/api/faqs/:id", FAQController.editFAQ);
router.delete("/api/faqs/:id", FAQController.deleteFAQ);

router.get("/admin/content-type/faq", FAQController.getFAQContentTypePage);
router.get("/admin/content-type/faq/:id", FAQController.getFAQSinglePage);

module.exports = router;