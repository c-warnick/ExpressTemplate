var _ = require('underscore');
var http = require('http');
var _ps = require('../page-settings');
var vriFn = require('../helpers/function');


//Homepage
exports.index = function(req, res) {

  var locals = {
      headTitle: 'Belk',
      content:'../pages/index',
      page:{
            title:"Documentation",
            description:"An overview of Belks new eCommerce site."
          },
      links: _ps.pages
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('main-template/_main', locals);

};

exports.dynamicPageLoader = function(req, res) {
   

    var content = '';
    var page = pageSettings.pages[req.params.page.replace(/\-/g,'')];
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
      content: 'pages/' + content,
      links: _ps.pages,
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