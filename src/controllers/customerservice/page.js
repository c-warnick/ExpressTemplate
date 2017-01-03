var _ = require('underscore');
var http = require('http');
var nav = require('../../helpers/navigation');
var vriFn = require('../../helpers/function');


// index
exports.shipping_information = function(req, res) {

  var locals = {
      headTitle: 'Shipping Information',
      content: '../../customerservice/shipping-information',
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

exports.rebate_center = function(req, res) {

  var locals = {
      headTitle: 'Rebate Center',
      content: '../../customerservice/rebate-center',
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

// faqs
exports.faqs = function(req, res) {

  var locals = {
      headTitle: 'FAQs',
      content: '../../customerservice/faqs',
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

// faqs
exports.sizing_charts = function(req, res) {
  var pageScript;
  var locals = {
      headTitle: 'Sizing Charts',
      content: '../../customerservice/sizing-charts',
      pageClass:"pt_coupon",
      mainClass:"page-content clearfix",
      sideNavigation: true,
      sideNav: nav.csSideNav,
      pageScript: pageScript
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/internal/_body', locals);

};