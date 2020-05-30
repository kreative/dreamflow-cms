const generate = require("nanoid/generate");
const Post = require("./posts.model");
const IRIS = require("../../config/iris");

exports.getPosts = (req, res) => {
  Post.findAll({where:{draft:false}})
    .catch((err) => {
      IRIS.critical("get posts failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((posts) => {
      IRIS.info("get posts passed", {}, ["success"]);
      res.json({ status: 200, data: { posts } });
    });
};

exports.createPost = (req, res) => {
  const id = generate("1234567890abcdefgjklimnopqrstuvwxyz", 16);
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const cover_image = req.body.cover_image;
  const content = req.body.content;
  const publishing_date = req.body.publishing_date;
  const author = req.body.author;
  const draft = req.body.draft;
  const createdat = Date.now();
  //const tags = req.body.tags || ["post"];

  Post.create({
    id,
    title,
    subtitle,
    cover_image,
    content,
    publishing_date,
    author,
    draft,
    createdat,
  })
    .catch((err) => {
      console.log(err);
      IRIS.critical("create post failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((post) => {
      IRIS.info("new post created", { post }, ["success"]);
      res.json({ status: 202, data: { post } });
    });
};

exports.editPost = (req, res) => {
  Post.update(
    {
      title: req.body.title,
      subtitle: req.body.subtitle,
      cover_image: req.body.cover_image,
      content: req.body.content,
      publishing_date: req.body.publishing_date,
      tags: req.body.tags,
      author: req.body.author,
      draft: req.body.draft
    },
    { where: { id: req.params.id } }
  )
    .catch((err) => {
      console.log(err);
      IRIS.critical("update post failed", { req, err }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then((update) => {
      IRIS.info("update post passed", { update }, ["success"]);
      res.json({ status: 202, data: { update } });
    });
};

exports.deletePost = (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .catch((err) => {
      IRIS.critical("delete post failed", { err, req }, ["ise", "api"]);
      res.json({ status: 500, data: { errorCode: "internal_server_error" } });
    })
    .then(() => {
      IRIS.info("post deleted", { id: req.params.id }, ["success"]);
      res.json({ status: 202 });
    });
};

exports.getNewPostPage = (req, res) => {
  res.render("postNew");
};

exports.getPostContentTypePage = (req, res) => {
  Post.findAll()
    .catch((err) => res.json({ status: 500, data: { err } }))
    .then((posts) => {
      if (posts.length === 0) {
        res.render("postType", { listExists: false });
      } else {
        res.render("postType", {
          posts: posts.map((post) => post.toJSON()),
          deleteSuccess: req.query.deleted,
          listExists: true,
        });
      }
    });
};

exports.getPostSinglePage = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .catch((err) => res.json({ status: 500, data: { err } }))
    .then((post) => {
      if (post === null) {
        res.render("404");
      } else {
        const d = new Date(parseInt(post.createdat));
        const datetime = d.toString();

        res.render("postSingle", {
          id: post.id,
          updateSuccess: req.query.updated,
          title: post.title,
          subtitle: post.subtitle,
          cover_image: post.cover_image,
          content: post.content,
          publishing_date: post.publishing_date,
          author: post.author,
          tags: post.tags,
          draft: post.draft,
          createdat: datetime
        });
      }
    });
};
