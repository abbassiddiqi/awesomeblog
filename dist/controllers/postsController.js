'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postsController = {};

postsController.show = function (req, res) {
  var postId = req.params.postId;

  var post = _models2.default.Post.findById(postId).populate({
    path: '_creator',
    select: "username -_id"
  }).populate({
    'path': '_comments'
  }).then(function (post) {
    // res.status(200).json(post);
    res.render("posts/show", { post: post });
  }).catch(function (err) {
    res.render("posts/show", { errMessage: err, post: null });
  });
};

postsController.create = function (req, res) {
  res.render("posts/create");
};

postsController.store = function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      text = _req$body.text;


  var userId = "596e00b6a8b8ed2298da784f";

  var post = new _models2.default.Post({
    title: title,
    text: text,
    _creator: userId
  });

  post.save().then(function (newPost) {
    res.redirect("/posts");
  }).catch(function (err) {
    res.status(500).json({
      errMessage: err
    });
  });
};

postsController.getAll = function (req, res) {
  var posts = [];

  _models2.default.Post.find({}).populate({
    path: '_creator',
    select: 'username -_id'
  }).populate({
    path: '_comments'
  }).then(function (allPosts) {
    res.render("posts/index", { posts: allPosts });
  }).catch(function (err) {
    res.render("posts/index", { errMessage: err });
  });
};

exports.default = postsController;
//# sourceMappingURL=postsController.js.map