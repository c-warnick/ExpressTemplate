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

exports.examples = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/examples',
      pageClass:"pt_storefront",
      mainClass:"",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/home/_body', locals);

};

exports.dw = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/dw',
      pageClass:"pt_storefront",
      mainClass:"",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/home/_body', locals);

};

exports.interior = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/dw-interior',
      pageClass:"pt_categorylanding",
      mainClass:"",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/internal/_body', locals);

};

exports.coupons = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/dw-coupon',
      pageClass:"pt_coupon",
      mainClass:"page-content clearfix",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/internal/_body', locals);

};

exports.unsubscribe = function(req, res) {

  var locals = {
      headTitle: null ,
      content:'../../homepage/unsubscribe',
      pageClass:"pt_emailsignup",
      mainClass:"page-content clearfix",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/home/_body', locals);

};

exports.unsubsuccess = function(req, res) {

  var locals = {
      headTitle: null,
      content:'../../homepage/unsubsuccess',
      pageClass:"pt_emailsignup",
      mainClass:"page-content clearfix",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/home/_body', locals);

};

exports.account = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/dw-account',
      pageClass:"pt_account",
      mainClass:"page-content clearfix",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/internal/_body', locals);

};

exports.stores = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/dw-stores',
      pageClass:"pt_store-locator",
      mainClass:"page-content clearfix",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/internal/_body', locals);

};

exports.cart = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/dw-cart',
      pageClass:"pt_cart",
      mainClass:"full-width clearfix",
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/internal/_body', locals);

};
