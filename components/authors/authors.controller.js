const generate = require("nanoid/generate");
const Author = require("./authors.model");
const IRIS = require("../../config/iris");

exports.getAuthors = (req, res) => {
  Author.findAll()
    .catch((err) => {
      console.log(err);
      IRIS.critical("get Authors failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((authors) => {
      IRIS.info("get Authors passed", {}, ["success"]);
      res.json({ status: 200, data: { authors } });
    });
};

exports.createAuthor = (req, res) => {
  const id = generate("1234567890abcdefgjklimnopqrstuvwxyz", 16);
  const ksn = req.body.ksn;
  const author_bio = req.body.author_bio;
  const createdat = Date.now();

  Author.create({
    id,
    ksn,
    author_bio,
    createdat,
  })
    .catch((err) => {
      console.log(err);
      IRIS.critical("create Author failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((author) => {
      IRIS.info("new Author created", { Author }, ["success"]);
      res.json({ status: 202, data: { author } });
    });
};

exports.editAuthor = (req, res) => {
  Author.update(
    {
      ksn: req.body.ksn,
      author_bio: req.body.bio,
    },
    { where: { id: req.params.id } }
  )
    .catch((err) => {
      IRIS.critical("update Author failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((update) => {
      IRIS.info("update Author passed", { update }, ["success"]);
      res.json({ status: 202, data: { update } });
    });
};

exports.deleteAuthor = (req, res) => {
  Author.destroy({ where: { id: req.params.id } })
    .catch((err) => {
      IRIS.critical("delete Author failed", { err, req }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then(() => {
      IRIS.info("Author deleted", { id: req.params.id }, ["success"]);
      res.json({ status: 202 });
    });
};

exports.getAuthorContentTypePage = (req, res) => {
  Author.findAll()
    .catch((err) => res.json({ status: 500, data: { err } }))
    .then((authors) => {
      console.log(authors);
      if (authors.length === 0) {
        res.render("authorType", { listExists: false });
      } else {
        res.render("authorType", {
          authors: authors.map((author) => author.toJSON()),
          deleteSuccess: req.query.deleted,
          listExists: true,
        });
      }
    });
};

exports.getAuthorSinglePage = (req, res) => {
  Author.findOne({ where: { id: req.params.id } })
    .catch((err) => res.json({ status: 500, data: { err } }))
    .then((author) => {
      if (author === null) {
        res.render("404");
      } else {
        const d = new Date(parseInt(author.createdat));
        const datetime = d.toString();

        res.render("authorSingle", {
          id: author.id,
          updateSuccess: req.query.updated,
          ksn: author.ksn,
          bio: author.author_bio,
          createdat: datetime,
        });
      }
    });
};
