"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var commentsController = {};

commentsController.store = function (req, res) {
  var _req$body = req.body,
      text = _req$body.text,
      userId = _req$body.userId,
      postId = _req$body.postId;


  var comment = new db.Comment({
    text: text,
    _creator: userId,
    _post: postId
  });

  comment.save().then(function (newComment) {
    db.Post.findByIdAndUpdate(postId, { $push: { _comments: newComment._id } }).then(function (updatedPost) {
      res.status(200).json({
        success: true,
        data: newComment,
        updatedPost: updatedPost
      });
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