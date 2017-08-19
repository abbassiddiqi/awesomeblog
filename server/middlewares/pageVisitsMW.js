import parseurl from 'parseurl';

export default (req, res, next) => {

  if( !req.session )
    throw Error('No session initialized');

  // set views variable
  if( !req.session.views ) {
    req.session.views = {};
  }

  const pathname = parseurl(req).pathname;
  req.session.views[pathname] = ( req.session.views[pathname] || 0 ) + 1;

  next();
}
