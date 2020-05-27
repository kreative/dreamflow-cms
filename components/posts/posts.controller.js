const generate = require("nanoid/generate");
const FAQ = require("./posts.model");
const IRIS = require("../../config/iris");

exports.getFAQs = (req, res) => {
    FAQ.findAll()
    .catch(err => {
        IRIS.critical("get faqs failed", {req, err}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}});
    })
    .then(faqs => {
        IRIS.info("get faqs passed", {}, ["success"]);
        res.json({status:200, data:{faqs}});
    });
};


exports.createFAQ = (req, res) => {
    const id = generate("1234567890abcdefgjklimnopqrstuvwxyz", 36);
    const product = req.body.product;
    const question = req.body.question;
    const answer = req.body.answer;
    const createdat = Date.now();

    FAQ.create({
        id,
        question,
        answer,
        product,
        createdat
    })
    .catch(err => {
        console.log(err);
        IRIS.critical("create faq failed", {req, err}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}})
    })
    .then(faq => {
        IRIS.info("new faq created", {faq}, ["success"]);
        res.json({status:202, data:{faq}});
    });
};


exports.editFAQ = (req, res) => {
    FAQ.update(req.body.newFAQ, {where:{id:req.body.id}})
    .catch(err => {
        console.log(err);
        IRIS.critical("update faq failed", {req, err}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}})
    })
    .then(update => {
        IRIS.info("update faq passed", {update}, ["success"]);
        res.json({status:202, data:{update}});
    });
};

exports.deleteFAQ = (req, res) => {
    FAQ.destroy({where:{id:req.body.id}})
    .catch(err => {
        IRIS.critical("delete faq failed", {err, req}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}});
    })
    .then(() => {
        IRIS.info("faq deleted", {id:req.body.id}, ["success"]);
        res.json({status:202});
    })
};