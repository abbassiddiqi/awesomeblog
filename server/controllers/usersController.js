import db from '../models';
const usersController = {};

usersController.signup = (req, res) => {
  res.render('auth/signup');
}

usersController.register = (req, res) => {

  console.log('Trying to register');

  let {
    username,
    password
  } = req.body;

  const user = new db.User({
    username,
    password
  });

  user.save()
    .then( (newUser) => {
      res.render('auth/registered',{user: newUser});
    })
    .catch( (err) => {
      res.render('auth/signup');
    });
}

usersController.login = (req, res) => {
  console.log('showing the login form');
  res.render('auth/login');
}

usersController.logout = (req, res) => {
  res.redirect('/login');
}

usersController.authenticate = (req, res) => {

  console.log('trying to authenticate');
  const {
    username,
    password
  } = req.body;

  db.User.find({username, password})
    .then( (result) => {
      res.status(200).json(result);
    })
    .catch( (err) => {
      res.status(500).json({
        errMessage: err
      });
    });
};


export default usersController;
