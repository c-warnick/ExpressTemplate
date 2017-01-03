var Parse = require('parse/node');

Parse.initialize("D24ED5A83AD64E77836DDD566E175BD7"); 
Parse.serverURL = 'http://localhost:1337/parse';

module.exports.getAdminPages = function(callback){
    console.log("Retrieving Admin Pages" );
    var query = new Parse.Object.extend("Pages",{
        childCount: function(){
            return this.get("childPages").length;
        },
        hasParent:function(){
            if(this.get("parentPage").length > 0){
                return true;
            } else {
                return false;
            }
        },
        isActive: function(object){
            if(object.get("parentPage").id == this.id && this.get("pageLevel") == 1){
                return 'active';
            } else if(object.id == this.id && this.get("pageLevel") == 1){
                return 'active';
            } else {
                return;
            }
            
        }
    });
    var query = new Parse.Query("Pages");
    query.equalTo("isAdmin", true);
    query.equalTo("visible", true);
    query.equalTo("pageLevel", 1);
    query.include("childPages");
    query.addAscending("pageLevel","sortOrder");
    //query.ascending("sortOrder");
    query.find({
            success: function(results) {
                    console.log("Admin Pages Retrieved");
                    callback(results);
            },
            error: function(object, error) {
                    console.error(error);
            }
        }
        
    );   

};

module.exports.getCurrentPage = function(pageName, callback){
    console.log("Retrieving Page: " + pageName );
    if(pageName && pageName !== ""){
            pageName = pageName.replace("_", " ");
            var query = new Parse.Query("Pages");
            query.equalTo("pageName", pageName);
            query.find({
                  success: function(results) {
                                 console.log("Page Retrieved");
                                callback(results[0]);
                   },
                    error: function(object, error) {
                        console.error(error);
                }
            })
    } else {
        console.error("Pagename not defined at getCurrentPage function");
        return;
    }

};

module.exports.getData = function(datatype ,callback){
    if(datatype && datatype !== ""){
        var Data = new Parse.Object.extend(datatype);
        var dataQuery = new Parse.Query(Data);
        console.log("Entering Data Condition...");
            console.log("Retrieving Data: "+ datatype + "...");
            dataQuery.find({
                    success: function(results) {
                            console.log("Data Retrieved: "+ datatype);
                            console.log(results);
                            callback(results);
                    },
                        error: function(object, error) {
                            console.error(error);
                    }
            });            
        
    }else {
       console.error("Datatype not defined at getData function: parse-queries.js");
       return;
    }

};

module.exports.getDataItem = function(datatype,identifier ,callback){
    if(datatype && datatype !== ""){

        var Data = new Parse.Object.extend(datatype);
        var dataQuery = new Parse.Query(Data);
        console.log("Entering Data Condition...");
            console.log("Retrieving Data: "+ datatype + "...");
            console.log("Retrieving Item: "+ identifier + "...");
            dataQuery.get(identifier, {
                    success: function(results) {
                            console.log("Item Retrieved: "+ datatype);
                            console.log(results);
                            callback(results);
                    },
                        error: function(object, error) {
                            console.error(error);
                    }
            })

    }else {
       console.error("Datatype not defined at getData function: parse-queries.js");
       return;
    }

};
