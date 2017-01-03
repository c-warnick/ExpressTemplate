var _ = require('underscore');
var http = require('http');
var nav = require('../helpers/navigation');
var vriFn = require('../helpers/function');


//Homepage
exports.index = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../../homepage/index',
      pageClass:"pt_storefront",
      mainClass:"",
      links:nav.links,
      sideNavigation: false
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('body/home/_body', locals);

};

exports.dynamicPageLoader = function(req, res) {
   

    var content = '';
    var page = nav.links[req.params.page.replace(/\-/g,'')];
    console.log(req.params.page);
    console.log(req.params.drop);
    console.log(req.params.page.replace(/\-/g,''));
    if(req.params.page){
        if(req.params.drop){
            content += req.params.drop + '/'
        }
        content += req.params.page
    }else{
        content = '404'
    }   
    
    var locals = {
      content: '../../' + content,
      pageClass: page.pageClass || "pt_customer-service",
      mainClass:"",
      links: nav.links,
      page:page,
      sidenavigation: undefined
    }

    if(req.session.session.post !== undefined) {
      delete req.session.session.post;
    }
    if(page.internal){
      res.renderView('body/internal/_body', locals);
    }else if(page.home){
      res.renderView('body/home/_body', locals);
    }else{
      res.renderView('body/internal/_fullbody', locals);
    }
    


};