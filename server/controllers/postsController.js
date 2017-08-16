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

  const userId = req.session.user._id;

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
      req.session.flashMessage = err.message;
      res.redirect('back');
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
