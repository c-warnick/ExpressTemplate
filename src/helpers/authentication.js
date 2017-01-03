
module.exports.auth = function(req, res, next) {
  console.log(`${req.session} : ${req.session.authenticated}`)
  if (req.session && req.session.authenticated)
    return next();
  else
    req.session.requestedPath = req.originalUrl;
    res.redirect('/login');
};