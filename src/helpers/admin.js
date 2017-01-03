var QUERY = require('./parse-queries');

/**
 * Retrieve Side Navigation
 */
module.exports.getAdminConfiguration = function(req, res, next){

    // Setting SideNav
        QUERY.getAdminPages(function(results){
            
            req.session.sidenavigation = results;

            console.log("Navigation Set");

            var pageName = req.params.pageName;

            if(!pageName && pageName == "")
            pageName = "Dashboard";

            QUERY.getCurrentPage(pageName,function(results){

                req.session.page = results;
                console.log("Page Info Set");

                var datatype = req.params.data;
                console.log(datatype);

                if(datatype && datatype !== ""){
                
                    console.log(req.params.action);
                    console.log(req.params.identifier);

                    if(req.params.action && req.params.identifier){
                    QUERY.getDataItem(datatype,req.params.identifier,function(results){
                            
                            req.session.data = results;
                            console.log("Item Data Set");
                            
                            return next();
                        });
                    }else{
                    QUERY.getData(datatype,function(results){
                            
                            req.session.data = results;
                            console.log("Page Data Set");
                            
                            return next();
                        });
                    }
                }else{
                    return next();
                }

                
            });

        });

    // Setting Page Info

        


}

