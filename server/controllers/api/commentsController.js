const commentsController = {};

commentsController.store = (req, res) => {
  const {
    text,
    userId,
    postId
  } = req.body;

  const comment = new db.Comment({
    text,
    _creator: userId,
    _post: postId
  });

  comment.save()
    .then( (newComment) => {
      db.Post.findByIdAndUpdate(
        postId,
        { $push: { _comments : newComment._id} }
      ).then( (updatedPost) => {
          res.status(200).json({
            success: true,
            data: newComment,
            updatedPost
          });
      }).catch( (err) => {
          res.status(500).json({
            errMessage: err
          });
      });
    }).catch( (err) => {
      res.status(500).json({
        errMessage: err
      });
    });
}

export default commentsController;
