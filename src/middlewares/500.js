module.exports = function(error, req, res, next) {

  // log error to Parse
  console.log('[500 ERROR!] - ' + error.message);
  next();
};
