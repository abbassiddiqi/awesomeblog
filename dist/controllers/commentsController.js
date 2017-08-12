'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentsController = {};

commentsController.store = function (req, res) {
  var text = req.body.text;


  var userId = "598f6051349ed38bfda0b3bc";
  var postId = req.params.postId;

  var comment = new _models2.default.Comment({
    text: text,
    _creator: userId,
    _post: postId
  });

  comment.save().then(function (newComment) {
    _models2.default.Post.findByIdAndUpdate(postId, { $push: { _comments: newComment._id } }).then(function (updatedPost) {
      res.redirect('back');
    }).catch(function (err) {
      res.status(500).json({
        errMessage: err
      });
    });
  }).catch(function (err) {
    res.status(500).json({
      errMessage: err
    });
  });
};

exports.default = commentsController;
//# sourceMappingURL=commentsController.js.map