var _ = require('underscore');
var http = require('http');
var nav = require('../../helpers/navigation');
var vriFn = require('../../helpers/function');
var QUERY = require('../../helpers/parse-queries');



// exports.dynamicPageLoader = function(req, res) {
//     if(!req.session.page)
//       res.send("Failed Request: Page failed at dynamicPageLoader in the admin page controller when requesting page data. ");

//     if(!req.session.sidenavigation)
//       res.send("Failed Request: Page failed at dynamicPageLoader in the admin page controller when requesting side navigation data. ");  

//     var page = req.session.page;
//     var pagename = page.get("pageName");

//     if(req.params.action)
//       var pagename = pagename + " " +req.params.action 

//     console.log("Pagename: " + pagename);
//     var locals = {
//       content: pagename.toLowerCase().replace(/\s/g,"_"),
//       sidenavigation:req.session.sidenavigation ? req.session.sidenavigation : undefined, 
//       page: req.session.page ? req.session.page : undefined,
//       data: req.session.data ? req.session.data : undefined,
//       identifier: req.params.identifier ? req.params.identifier : undefined
//     }

//     if(req.session.session.post !== undefined) {
//       delete req.session.session.post;
//     }

//     res.renderView('admin/_body', locals);


// };


exports.index = function(req, res) {

    var locals = {
      content:'index',
    }

    if(req.session.session.post !== undefined) {
      delete req.session.session.post;
    }

    res.renderView('widget/_body', locals);

};


