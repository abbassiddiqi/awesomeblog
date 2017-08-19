import db from '../models';
import paginate from 'express-paginate';
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
    res.render("posts/show", { post });
  })
  .catch( (err) => {
    req.session.flashMessage = {
      type: 'error',
      message: err.message
    };
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
      // console.log(err);
      // res.status(500).json(err);
      req.session.flashMessage = {
        type: 'error',
        message: err.message
      };
      res.redirect('back');
    });
}

postsController.getAll = (req, res) => {
  const posts = [];

  db.Post.paginate({},{
      populate: [
        {
          path: '_creator',
          select: 'username -_id'
        },
        {
          path: '_comments'
        }
      ],
      page: req.query.page,
      limit: req.query.limit
    })
    .then( (posts) => {
        res.render("posts/index", {
          posts: posts.docs,
          pageCount: posts.pages,
          itemCount: posts.limit,
          currentPage: req.query.page,
          pages: paginate.getArrayPages(req)(3, posts.pages, req.query.page)
        });
        // res.status(200).json({
        //   posts: posts.docs,
        //   pageCount: posts.pages,
        //   itemCount: posts.limit,
        //   currentPage: req.query.page,
        //   pages: paginate.getArrayPages(req)(3, posts.pages, req.query.page)
        // });
    })
    .catch( (err) => {
      req.session.flashMessage = {
        type: 'error',
        message: err.message
      };
      res.render("posts/index",{errMessage: err});
    });
}

postsController.destroy = (req, res) => {
  const postId = req.params.postId;
  const userId = req.session.user._id;

  db.Post.findOneAndRemove({
    _id: postId,
    _creator: userId
  })
  .then( (post) => {
    console.log("Removed the post");
    req.session.flashMessage = {
      type: "success",
      message: "Post deleted successfully"
    };
    res.redirect('/posts');
  })
  .catch( (err) => {
    req.session.flashMessage = {
      type: "error",
      message: "Unable to delete the post"
    };
    console.log(err);
    res.redirect('back');
  });
}

export default postsController;
