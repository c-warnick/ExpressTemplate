/*
 * @file - middelware for rendering view
 */
var _ = require('underscore');
var vriFn = require('../helpers/function');

module.exports = function(req, res, next) {

  res.renderView = function(path, locals) {
    var pageJSON = {};
    locals = typeof locals !== 'undefined' ? locals : {};

    // to add more page JSON, add it to object 'pageJSON', which is a destination object
    if (!_.isEmpty(req.session.session)) {
      pageJSON.session = req.session.session;
    }
    locals.pageJSON = vriFn.processPageJSON(pageJSON, locals.pageJSON);

    //make application settings available to template files
    if (req.app.settings._gs !== undefined) {
      locals.APP = req.app.settings._gs.APP;
    }
    res.render(path, locals);
  };

  next();
};
