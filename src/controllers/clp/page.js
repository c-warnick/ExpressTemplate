var _ = require('underscore');
var http = require('http');
var nav = require('../../helpers/navigation');
var vriFn = require('../../helpers/function');

exports.index = function(req, res) {

  var locals = {
      headTitle: 'Shipping Information',
      content: '../../clp/index',
      pageClass:"pt_coupon",
      mainClass:"page-content clearfix",
      sideNavigation: true,
      sideNav: nav.csSideNav
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/internal/_body', locals);

};