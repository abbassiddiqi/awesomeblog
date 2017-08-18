import db from '../models';
const commentsController = {};

commentsController.store = (req, res) => {
  const {
    text
  } = req.body;

  const userId = req.session.user._id;
  const postId = req.params.postId;

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
          res.redirect('back');
      })
      .catch( (err) => {
        req.session.flashMessage = {
          type: 'error',
          message: err.message
        };
        res.redirect('back');
      });
    }).catch( (err) => {
      req.session.flashMessage = {
        type: 'error',
        message: err.message
      };
      res.redirect('back');
    });
}

commentsController.destroy = (req, res) => {

  const commentId = req.params.commentId;
  const userId = req.session.user._id;

  db.Comment.findOneAndRemove({
    _id: commentId,
    _creator: userId
  })
  .then( (result) => {
    console.log('Comment is deleted');
    console.log(result.toString() );
    req.session.flashMessage = {
      type: 'success',
      message: "Comment deleted successfully"
    };
    res.redirect('back');
  })
  .catch( (err) => {
    console.log("Unable to delete the comment");
    console.log(err.toString());
    req.session.flashMessage = {
      type: 'error',
      message: "Unable to delete the comment"
    };
    res.redirect('back');
  });

}

export default commentsController;
