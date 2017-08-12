import db from '../models';
const commentsController = {};

commentsController.store = (req, res) => {
  const {
    text
  } = req.body;

  const userId = "598f6051349ed38bfda0b3bc";
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
