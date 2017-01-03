/*
 * @file - set app routing
 */
var controller = require('../controllers/pages');
var helper = require('../helpers/authentication');


module.exports = function(app) {

  //About Us
  app.get('/', helper.auth, controller.index);
  app.get('/:drop/:page', helper.auth, controller.dynamicPageLoader);
  app.get('/:page', helper.auth, controller.dynamicPageLoader);
};
