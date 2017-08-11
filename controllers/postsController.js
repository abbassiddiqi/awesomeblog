import db from '../models';
const postsController = {};

postsController.show = (req, res) => {
  const {
    postId
  } = req.body;

  const post = db.Post.find({
    _id: postId
  })
  .then( (posts) => {
    res.render("posts/show",{posts});
  })
  .catch( (err) => {
    res.render("posts/show", {errMessage: err});
  });
}

postsController.create = (req, res) => {
  res.render("posts/create");
}

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
        res.render("posts/index",{posts: allPosts});
    })
    .catch( (err) => {
      res.render("posts/index",{errMessage: err});
    });
}

export default postsController;
