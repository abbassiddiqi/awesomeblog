import db from '../models';
const commentsController = {};

commentsController.store = (req, res) => {
  const {
    text
  } = req.body;

  const userId = "596e00b6a8b8ed2298da784f";
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
