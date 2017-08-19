import parseurl from 'parseurl';

module.exports = (req, res, next) => {
  if( req.session ) {

    if( req.session.flashMessage ) {
      res.locals.flashMessage = req.session.flashMessage;
      delete req.session.flashMessage;
    }

    if( req.session.user ) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = null;
    }

    if( req.session.views ) {
      res.locals.pvCount = req.session.views[parseurl(req).pathname];
    }
  }
  next();
}
