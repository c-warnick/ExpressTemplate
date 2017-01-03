var _ = require('underscore');
var http = require('http');
var nav = require('../../helpers/navigation');
var vriFn = require('../../helpers/function');
exports.index = function(req, res) {

  var locals = {
      headTitle: 'About Us',
      content:'aboutus/about-us',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('_body', locals);

};


// faq
exports.faq = function(req, res) {

  var locals = {
      headTitle: 'Frequently Asked Questions',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/faq', locals);

};

//mediaroom
exports.mediaroom = function(req, res) {
  vriFn.getStringData(_gs.APP.rssUrl)
  .then(vriFn.parseStringData)
  .then(function(data){

    var channel = data.rss.channel[0];
    
    var locals = {
        headTitle: 'Belk Mediaroom',
        sideNavigation: true,
        sideNav:nav.auSideNav,
        bodyLinks:[],
        asideTitles:["Media Contact"],
        asideLinks:[[{label:"Sign up to recieved Belk News Alerts by email",link:"#",title:""}],[]],
        jsonData: channel,
        jsonConsole: JSON.stringify(channel)
      }

    if(req.session.session.post !== undefined) {
      delete req.session.session.post;
    }

    res.renderView('aboutus/mediaroom', locals);
  })
  .done();
};


//recent news
exports.recent_news = function(req, res) {
  vriFn.getStringData(_gs.APP.rssUrl)
  .then(vriFn.parseStringData)
  .then(function(data){

      var channel = data.rss.channel[0];
      var locals = {
          headTitle: 'Recent News',
          sideNavigation: true,
          sideNav:nav.auSideNav,
          bodyLinks:[],
          asideLinks:[[],[]],
          jsonData: channel,
          jsonConsole: JSON.stringify(channel)
        }

      if(req.session.session.post !== undefined) {
        delete req.session.session.post;
      }

      res.renderView('aboutus/recent-news', locals);
    })
    .done();
};


//media contact
exports.media_contact = function(req, res) {

  var locals = {
      headTitle: 'Media Contact',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[{label:"Sign up to recieved Belk News Alerts by email",link:"#",title:""}],
      asideLinks:[[],[]]
      
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/media-contact', locals);

};


//downloadable belk images
exports.belk_images = function(req, res) {

  var locals = {
      headTitle: 'Downloadable Belk Imags',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/belk-images', locals);

};


//Belk Fact Sheets
exports.fact_sheets = function(req, res) {

  var locals = {
      headTitle: 'Belk Fact Sheets',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/fact-sheets', locals);

};


//who we are
exports.who_we_are = function(req, res) {

  var locals = {
      headTitle: 'Who We Are',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/who-we-are', locals);

};

//Our History
exports.our_history = function(req, res) {

  var locals = {
      headTitle: 'Our History',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/our-history', locals);

};


// Mission Vision Values
exports.mission_vision_values = function(req, res) {

  var locals = {
      headTitle: 'Mission, Vision, Values',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/mission-vision-values', locals);

};

//Diversity & Inclusion
exports.diversity_and_inclusion = function(req, res) {

  var locals = {
      headTitle: 'Diverstity & Inclusion',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/diversity-inclusion', locals);

};

// Workforce Inclusion
exports.workforce_inclusion = function(req, res) {

  var locals = {
      headTitle: 'Workforce Inclusion',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/workforce-inclusion', locals);

};

// Employee Resource Groups
exports.employee_resource_groups = function(req, res) {

  var locals = {
      headTitle: 'Employee Resource Groups',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/employee_resource_groups', locals);

};

// Customer Diversity
exports.customer_diversity = function(req, res) {

  var locals = {
      headTitle: 'Customer Diversity',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/customer_diversity', locals);

};

// Supplier Diversity
exports.supplier_diversity = function(req, res) {

  var locals = {
      headTitle: 'Supplier Diversity',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/supplier_diversity', locals);

};

// Awards
exports.awards = function(req, res) {

  var locals = {
      headTitle: 'Awards',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/awards', locals);

};

// CA Transparency Compliance
exports.compliance = function(req, res) {

  var locals = {
      headTitle: 'California Transparency in Supply Chains Act of 2010 Disclosure',
      content:'aboutus/compliance',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('_body', locals);

};

// Conflict Minerals Policy
exports.conflict_minerals = function(req, res) {

  var locals = {
      headTitle: 'Dodd-Frank Act - Conflict Minerals',
      content:'aboutus/conflict_minerals',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('_body', locals);

};

// Sustainability
exports.sustainability = function(req, res) {

  var locals = {
      headTitle: '',
      content:'aboutus/sustainability',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('_body', locals);

};

// BelkGives
exports.belk_gives = function(req, res) {

  var locals = {
      headTitle: 'BelkGives',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/belk_gives', locals);

};

// Our Commitment
exports.our_commitment = function(req, res) {

  var locals = {
      headTitle: 'Our Commitment',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/our_commitment', locals);

};

// Current Efforts
exports.current_efforts = function(req, res) {

  var locals = {
      headTitle: 'Current Efforts',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/current_efforts', locals);

};

// Vendor Resources
exports.vendor_information = function(req, res) {

  var locals = {
      headTitle: 'Vendor Information',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('aboutus/vendor_information', locals);

};

// Store Events
exports.store_events = function(req, res) {

  var locals = {
      headTitle: '',
      content:'aboutus/store_events',
      sideNavigation: true,
      sideNav:nav.auSideNav,
      bodyLinks:[],
      asideLinks:[[],[]]
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('_body', locals);

};

// exports.placeholder = function(req, res) {

//   var locals = {
//       headTitle: '',
//       sideNavigation: true,
//     }

//   if(req.session.session.post !== undefined) {
//     delete req.session.session.post;
//   }

//   res.renderView('aboutus/', locals);

// };

