'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postsController = {};

postsController.store = function (req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      text = _req$body.text,
      userId = _req$body.userId;


  var post = new _models2.default.Post({
    title: title,
    text: text,
    _creator: userId
  });

  post.save().then(function (newPost) {
    res.status(200).json({
      success: true,
      data: newPost
    });
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
    res.status(200).json({
      success: true,
      data: allPosts
    });
  }).catch(function (err) {
    res.status(500).json({
      errMessage: err
    });
  });
};

exports.default = postsController;
//# sourceMappingURL=postsController.js.map