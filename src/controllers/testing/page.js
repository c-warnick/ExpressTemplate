var _ = require('underscore');
var http = require('http');
var nav = require('../../helpers/navigation');
var vriFn = require('../../helpers/function');

exports.index = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/index',
      pageClass:"pt_storefront",
      mainClass:"",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/home/_body', locals);

};

exports.image_load = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../testing/image-load',
      pageClass:"pt_storefront",
      mainClass:"",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/home/_body', locals);

};

