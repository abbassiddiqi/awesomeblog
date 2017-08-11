import db from '../models';
const postsController = {};

postsController.store = (req, res) => {
  let {
    title,
    text,
    userId
  } = req.body;

  const post = new db.Post({
    title,
    text,
    _creator: userId
  });

  post.save()
    .then( (newPost) => {
      res.status(200).json({
        success: true,
        data: newPost
      });
    })
    .catch( (err) => {
      res.status(500).json({
        errMessage: err
      });
    });
}

postsController.getAll = (req, res) => {
  const posts = [];

  db.Post.find({})
    .populate({
        path: '_creator',
        select: 'username -_id'
    })
    .populate({
      path: '_comments',
    })
    .then( (allPosts) => {
        res.status(200).json({
          success: true,
          data: allPosts
        });
    })
    .catch( (err) => {
      res.status(500).json({
        errMessage: err
      });
    });
}

export default postsController;
