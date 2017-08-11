import db from '../models';
const usersController = {};

usersController.signup = (req, res) => {

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
      res.status(200).json({
        success: true,
        data: newUser
      })
    })
    .catch( (err) => {
      res.status(500).json({
        errMessage: err.toString()
      });
    });
}


export default usersController;
