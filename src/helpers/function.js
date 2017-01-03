var _ = require('underscore');
var http = require('http');
var Q = require("q");
var xml2js = require('xml2js'); 
var moment = require('moment');
var fs = require('fs');
var path = require('path');


/**
 * trim string
 */
var trim = module.exports.trim = function(str) {
  if (str !== undefined) {
    return str.replace(/^\s+|\s+$/gm, '');
  }
};

/**
 * Check if string is empty:
 * null, undefined, '', '0' are treated empty
 * @param  {string}  input
 * @return true|false
 */
var isEmptyString = module.exports.isEmptyString = function(input) {

  if (input === undefined || input === null || input === '' || input === '0') {
    return true;
  }
  return false;
};

/**
 * print variable's value. Variable has to be simple type
 * @param  {string|number|null|undefined} variable
 * @param  {string|number} defaultValue value given to variable if variable is undefined or null
 * @return {string|number}
 */
module.exports.echo = function(variable, defaultValue) {

  if (defaultValue === undefined) {
    defaultValue = '';
  }

  if (variable === undefined || variable === null) {
    return defaultValue;
  }
  return variable;
};

/**
 * render message
 * @param  {array} messages collection of objects flash.message = [{type:error, message: 'error message1'}, {type:error, message: 'error message2'},{type:success, message: 'success message'},{type:alert, message: 'alert message'}]
 * @return {object} grouped by type {alert:[], success:[], warning:[], error:[]}||{}, if type say 'warning' is not available in any of object in input array(collection of objects) then the key of that type is not created in output object.
 *
 */
module.exports.renderMessage = function(messages) {

  var output = {},
    types = ['alert', 'success', 'warning', 'error'];

  if (messages !== undefined && !_.isEmpty(messages)) {
    _.each(messages, function(message, index) {
      if (_.indexOf(types, message.type) !== -1) {
        if (_.has(output, message.type)) {
          output[message.type].push(message.message);
        } else {
          output[message.type] = [message.message];
        }
      }
    });
  }
  return JSON.stringify(output);
};

/**
 * add inline javascript and javascript files
 * @param  {array} list javascript files and inline javascript. Format: [{js: '/js/views/script.js'}, {js:'var x=2;', inline: true}]
 * @return empty string|rendered JS files and inline javascript
 */
module.exports.renderJS = function(list) {

  var output = '';

  if (_.isArray(list) && !_.isEmpty(list)) {
    _.each(list, function(js, index) {
      if (js.inline === undefined || js.inline !== true) {
        output += '<script src="' + js.js + '"></script>';
      } else {
        output += '<script>' + js.js + '</script>';
      }
    });
  }
  return output;
};

/**
 * add css files
 * @param  {array} list css files
 * @return empty string|rendered css files
 */
module.exports.renderCSS = function(list) {

  var output = '',
    media = 'screen';

  if (_.isArray(list) && !_.isEmpty(list)) {
    _.each(list, function(css, index) {
      if (css.inline === undefined || css.inline !== true) {
        if (css.media !== undefined) {
          media = css.media;
        }
        output += '<link rel="stylesheet" media="' + media + '" href="' + css.css + '" />';
      } else {
        output += '<style>' + css.css + '</style>';
      }
    });
  }

  return output;
};

/**
 * process object before adding to page of type JSON
 * @param  {object} destinationObject
 * @param  {object} sourceObject
 * @return {object} copy all of the properties in the source objects over to the destination object.
 */
var processPageJSON = module.exports.processPageJSON = function(destinationObject, sourceObject) {
  if (destinationObject === undefined) {
    destinationObject = {};
  }
  if (sourceObject === undefined) {
    sourceObject = {};
  }
  return _.extend(destinationObject, sourceObject);
};

/**
 * add JSON object
 * @param  {object} object
 * @return {JSON}
 */
module.exports.renderPageJSON = function(object) {

  var output = {};

  if (object !== undefined && !_.isEmpty(object)) {
    output = object;
  }
  return 'var _vri = ' + JSON.stringify(output) + ';';
};

/**
 * add classes to body tag
 * @param {array} classes
 */
module.exports.addBodyClass = function(classes) {
  if (_.isEmpty(classes)) {
    return '';
  }
  return 'class="' + classes.join(' ') + '"';
};

/**
 * parse url query parameters
 * @param  {string} uri
 * @return {object} urlParams query string into object representation
 */
var parseQueryString = module.exports.parseQueryString = function(url) {

  var urlParams = {};

  url = url.slice(url.indexOf('?'));
  url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) {
      urlParams[$1] = $3;
    }
  );

  return urlParams;
};

var isValidEmail = module.exports.isValidEmail = function(email) {
  var emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (emailFilter.test(email)) {
    return true;
  }
  return false;
};

module.exports.randomNumberFromRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.isLeaderJoinCode = function(min, max, number) {
  number = parseInt(number);
  return number >= min && number <= max;
};

module.exports.getSendBirdSettings = function(app) {

  var settings = {};

  if (app.debug === true) {
    settings.appId = app.sendBird.debug.appId;
    settings.token = app.sendBird.debug.token;
  } else {
    settings.appId = app.sendBird.live.appId;
    settings.token = app.sendBird.live.token;
  }

  settings.endPoint = app.sendBird.endPoint;

  return settings;
};

module.exports.getTaplyticsSettings = function(app) {

  var settings = {};

  if (app.debug === true) {
    settings.jsKey = app.taplytics.debug.jsKey;
    settings.restKey = app.taplytics.debug.restKey;
  } else {
    settings.jsKey = app.taplytics.live.jsKey;
    settings.restKey = app.taplytics.live.restKey;
  }

  return settings;
};

module.exports.getUserAttributes = function(userObject) {
  return {
    'user_id': userObject.id,
    'email': userObject.get('email'),
    'firstName': userObject.get('firstName'),
    'lastName': userObject.get('lastName'),
    'username': userObject.get('username'),
    'joinCode': userObject.get('joinCode'),
    'zip': userObject.get('zip'),
    'leader': userObject.get('leader'),
    'dob': moment(userObject.get('dob').iso).format('dddd, MMMM Do YYYY')
  };
};

// Changes XML to JSON
module.exports.xmlToJson = function(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

module.exports.getStringData = function(url){
    var deferred = Q.defer();

    if(url === "" || url === undefined)
        return deferred.reject(console.error(`Get Request failed. Url is: ${url}`));
          
    var xmlReq = http.get(url, function (response){
        // console.log(response.statusCode);
        // console.log(response.headers);
        var completeResponse = '';
        response.on('data', function(chunk) {
          completeResponse +=  chunk;
        });
        response.on('end', function() {
          return deferred.resolve(completeResponse);
        });

      }).on('error',function(e) {
        return deferred.reject(console.error(`problem with request: ${e.message}`));
      });
      
      return deferred.promise;
};

module.exports.readXmlFile = function(filePath){
  var deferred = Q.defer();

  if(filePath === "" || filePath === undefined)
        return deferred.reject(console.error(`Get Request failed. Url is: ${filePath}`));
  
  filePath = path.resolve("src",filePath);
  

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return deferred.reject(err);
    } 
      return deferred.resolve(data);
  });
      return deferred.promise;
}

module.exports.parseStringData = function(input) {
          //console.log(input);

          var deferred = Q.defer();
          var parser = new xml2js.Parser();

          parser.parseString(input, function (err, result) {
            if (err)  {
              return deferred.reject(err);
            }
            //console.log(result);
            return deferred.resolve(result);
          });

          return deferred.promise;

};



