const generate = require("nanoid/generate");
const Post = require("./posts.model");
const IRIS = require("../../config/iris");

exports.getPosts = (req, res) => {
    Post.findAll()
    .catch(err => {
        IRIS.critical("get posts failed", {req, err}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}});
    })
    .then(posts => {
        IRIS.info("get posts passed", {}, ["success"]);
        res.json({status:200, data:{posts}});
    });
};


exports.createPost = (req, res) => {
    const id = generate("1234567890abcdefgjklimnopqrstuvwxyz", 36);
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const cover_image = req.body.cover_image;
    const content = req.body.content;
    const publishing_date = req.body.publishing_date;
    const tags = req.body.tags;
    const author = req.body.author_ksn;
    const createdat = Date.now();

    Post.create({
        id,
        title,
        subtitle,
        cover_image,
        content,
        publishing_date,
        tags,
        author,
        createdat
    })
    .catch(err => {
        console.log(err);
        IRIS.critical("create post failed", {req, err}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}})
    })
    .then(post => {
        IRIS.info("new post created", {post}, ["success"]);
        res.json({status:202, data:{post}});
    });
};


exports.editPost = (req, res) => {
    Post.update(req.body.newPost, {where:{id:req.body.id}})
    .catch(err => {
        console.log(err);
        IRIS.critical("update post failed", {req, err}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}})
    })
    .then(update => {
        IRIS.info("update post passed", {update}, ["success"]);
        res.json({status:202, data:{update}});
    });
};

exports.deletePost = (req, res) => {
    Post.destroy({where:{id:req.body.id}})
    .catch(err => {
        IRIS.critical("delete post failed", {err, req}, ["ise","api"]);
        res.json({status:500, data:{errorCode:"internal_server_error"}});
    })
    .then(() => {
        IRIS.info("post deleted", {id:req.body.id}, ["success"]);
        res.json({status:202});
    })
};