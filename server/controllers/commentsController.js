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
        req.session.flashMessage = err.message;
        res.redirect('back');
      });
    }).catch( (err) => {
      req.session.flashMessage = err.message;
      res.redirect('back');
    });
}

export default commentsController;
