import db from '../models';
const postsController = {};

postsController.show = (req, res) => {
  const postId = req.params.postId;

  const post = db.Post.findById(postId).populate({
    path: '_creator',
    select: "username -_id"
  })
  .populate({
    'path': '_comments'
  })
  .then( (post ) => {
    // res.status(200).json(post);
    res.render("posts/show", { post });
  })
  .catch( (err) => {
    res.render("posts/show", {errMessage: err, post: null});
  });
}

postsController.create = (req, res) => {
  res.render("posts/create");
}

postsController.store = (req, res) => {
  let {
    title,
    text
  } = req.body;

  const userId = "598f6051349ed38bfda0b3bc";

  const post = new db.Post({
    title,
    text,
    _creator: userId
  });

  post.save()
    .then( (newPost) => {
      res.redirect("/posts");
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
