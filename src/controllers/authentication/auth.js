var _ = require('underscore');
var http = require('http');
var _gs = require('../../settings');
var _users = require('../../users');
var _auth = require('../../helpers/authentication');
var vriFn = require('../../helpers/function');

exports.login = function(req, res) {

  var locals = {
      headTitle: 'Login',
      content:'login',
      errors: req.session.loginError || ""
    }

  if(req.session.session.post !== undefined) {
    delete req.session.session.post;
  }

  res.renderView('authentication/_body', locals);

};

exports.logout = function(req,res) {
      var locals = {
      headTitle: 'Logout',
      content:'logout',
    }

    req.session.destroy();
    res.redirect('/login');
}



exports.authenticate = function(req,res) {
    req.session.loginError = []
    var requestedPath = req.session.requestedPath;
    var _username = req.query.inputUsername || req.body.inputUsername,
         _password = req.query.inputUsername || req.body.inputPassword;

    var users = _users.USERS[_gs.APP.userKey];

    if(req.session.session.post !== undefined) {
        delete req.session.session.post;
    }
    var authenticating = _.find(users,{username: _username});

    if(!req.body.inputUsername || !req.body.inputPassword){
        req.session.loginError.push({type:"danger",message:"Username and password required"});
        res.redirect('/login');
    }else if(req.body.inputUsername && req.body.inputPassword){ 
        if(_.size(authenticating)  > 0){
            if(authenticating.password == _password){
                req.session.user = authenticating.username;
                req.session.authenticated = true;
                if(requestedPath != ""){
                   res.redirect(requestedPath); 
                }else{
                   res.redirect('/');
                }
            }else{
               req.session.loginError.push({type:"danger",message:"Password incorrect"}); 
               res.redirect('/login'); 
            }
        }else{
            req.session.loginError.push({type:"danger",message:"User not found"});
            res.redirect('/login');
        }

    }else{
            req.session.loginError.push({type:"danger",message:"Something went wrong.  Unfortunately We don't know"});
            res.redirect('/login');
    }


    
}

