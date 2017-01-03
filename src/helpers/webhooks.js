var Parse = require('parse/node');
var script = require('./scripts');
var stylesheet = require('./stylesheets');

Parse.initialize("D24ED5A83AD64E77836DDD566E175BD7"); 
Parse.serverURL = 'http://localhost:1337/parse';


module.exports.saveData = function(req, res){
    P
}

module.exports.addChildPages = function(req,res){
    console.log("Begin Add Child Page");
    var ObjectId = req.params.objectId

    if(ObjectId && ObjectId !== ""){
        console.log("Retrieving Object");
        // Retrieve Object
        var pageQuery = new Parse.Query("Pages");
        pageQuery.get(ObjectId).then(function(object){

            var childQuery = new Parse.Query("Pages");
            childQuery
                .equalTo("parentPage",object)
                .equalTo("visible",true)
                .addAscending("sortOrder")
                .find().then(function(results){

                    console.log("Children Recieved");
                    console.log({"theobject":object,"theresults":results});
                    object.set("childPages",results);
                    object.save();

                    res.send("success!");

            });

        })

    }else{
        res.send("Object Id not set");
    }


}


module.exports.addScripts = function(req,res){

        console.log("Request: addScripts");
        // Retrieve Object
        var scripts = script.list;
        if(scripts.length > 0){
            var ScriptObject = Parse.Object.extend("Scripts");
            scripts.forEach(function(script){
                var newScript = new ScriptObject();
                newScript.set("scriptName", script.name);
                newScript.set("scriptUrl",script.path);
                newScript.set("isAdmin",script.isAdmin);
                newScript.save(null,{
                    success:function(newScript){
                        console.log(newScript.get("scriptName") + " added");
                        res.send("Success!");
                    },
                    error: function(newScript,error){
                        console.error('Failed to create new script, with error code: ' + error.message);
                    }
                })
            });

        }else{
            res.send("Failure: Script Array is Empty");
        }


}

module.exports.addStyleSheets = function(req,res){

        console.log("Request: addStyleSheets");
        // Retrieve Object

        var stylesheets = stylesheet.list;
        if(stylesheets.length > 0){
            var StylesheetObject = Parse.Object.extend("Stylesheets");
            stylesheets.forEach(function(stylesheet){
                var newStylesheet = new StylesheetObject();
                newStylesheet.set("scriptName", stylesheet.name);
                newStylesheet.set("scriptUrl",stylesheet.path);
                newStylesheet.set("isAdmin",stylesheet.isAdmin);
                newStylesheet.save(null,{
                    success:function(newStylesheet){
                        console.log(newStylesheet.get("scriptName") + " added");
                        res.send("Success!");
                    },
                    error: function(newStylesheet,error){
                        console.error('Failed to create new script, with error code: ' + error.message);
                    }
                })
            });
        }else{
            res.send("Failure: Stylesheet Array is Empty");
        }



}

module.exports.wipeTable = function(req, res){
    var table = req.params.table
    if(table && table !== ""){
        console.log("Request: wipeTable");
       
        var tableQuery = new Parse.Query(table);
        tableQuery.find({
            success:function(table){
                table.forEach(function(tableitem){
                    tableitem.destroy({
                        success:function(object){
                            console.log("Deleted: " + object.id);
                        },
                        error:function(object,error){
                            res.send("Failure: " + error.message);
                        }
                    })
                })
                res.send("Success!")
            },
            error:function(error){
                res.send("Failure: " + error.message)
            }
        })

    }else{
        res.send("Object Id not set");
    }

}


module.exports.add = function(req, res, next){
        var table = req.params.table;
        var values = req.query || req.body;
        console.log(table);
        //console.log(values);

        if(values && values !== "" && table !== ""){
            var TableObject = Parse.Object.extend(table);
            var Object = new TableObject();
            for(var key in values){
                console.log(key + ": " + values[key]);
                if(key.indexOf('is') != -1){
                    if(values[key] == "true"){
                        Object.set(key,true);
                    }else{
                        Object.set(key,false);
                    }
                }else{
                    Object.set(key,values[key]);
                }

            }
            Object.save(null,{
                success:function(object){
                    res.redirect(req.session.requestedPath);
                },
                error: function(object,error){
                    res.send('Failure: ' + error.message);
                }
            })
        }else{
            res.send('Failure: Missing Variables'); 
        }

        
}