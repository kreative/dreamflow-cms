const generate = require("nanoid/generate");
const FAQ = require("./faqs.model");
const IRIS = require("../../config/iris");

exports.getFAQs = (req, res) => {
  FAQ.findAll()
    .catch((err) => {
      IRIS.critical("get faqs failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((faqs) => {
      IRIS.info("get faqs passed", {}, ["success"]);
      res.json({ status: 200, data: { faqs } });
    });
};

exports.createFAQ = (req, res) => {
  const id = generate("1234567890abcdefgjklimnopqrstuvwxyz", 16);
  const product = req.body.product;
  const question = req.body.question;
  const answer = req.body.answer;
  const createdat = Date.now();

  FAQ.create({
    id,
    question,
    answer,
    product,
    createdat,
  })
    .catch((err) => {
      console.log(err);
      IRIS.critical("create faq failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((faq) => {
      IRIS.info("new faq created", { faq }, ["success"]);
      res.json({ status: 202, data: { faq } });
    });
};

exports.editFAQ = (req, res) => {
  FAQ.update(
    {
      question: req.body.question,
      answer: req.body.answer,
      product: req.body.product,
    },
    { where: { id: req.params.id } }
  )
    .catch((err) => {
      console.log(err);
      IRIS.critical("update faq failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((update) => {
      IRIS.info("update faq passed", { update }, ["success"]);
      res.json({ status: 202, data: { update } });
    });
};

exports.deleteFAQ = (req, res) => {
  console.log("delete started");
  FAQ.destroy({ where: { id: req.params.id } })
    .catch((err) => {
      console.log(err);
      IRIS.critical("delete faq failed", { err, req }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then(() => {
      IRIS.info("faq deleted", { id: req.params.id }, ["success"]);
      res.json({ status: 202 });
    });
};

exports.getFAQContentTypePage = (req, res) => {
  FAQ.findAll()
    .catch((err) => res.json({ status: 500, data: { err } }))
    .then((faqs) => {
      if (faqs.length === 0) {
        res.render("faqType", { listExists: false });
      } else {
        res.render("faqType", {
          faqs: faqs.map((faq) => faq.toJSON()),
          deleteSuccess: req.query.deleted,
          listExists: true,
        });
      }
    });
};

exports.getFAQSinglePage = (req, res) => {
  FAQ.findOne({ where: { id: req.params.id } })
    .catch((err) => res.json({ status: 500, data: { err } }))
    .then((faq) => {
      if (faq === null) {
        res.render("404");
      } else {
        const d = new Date(parseInt(faq.createdat));
        const datetime = d.toString();

        res.render("faqSingle", {
          id: faq.id,
          updateSuccess: req.query.updated,
          product: faq.product,
          question: faq.question,
          answer: faq.answer,
          createdat: datetime
        });
      }
    });
};