const gulp = require("gulp"),
      path = require("path"),
      $ = require("gulp-load-plugins")();



gulp.task("reload", devReload);


gulp.task("serve", function(cb){
    $.livereload.listen();

     $.nodemon({
        script:"./src/main.js",
        watch:["./src","./public"],
        ext:'js html css ejs',
        tasks: function (changedFiles){
            changedFiles.forEach(function (file) {
                    $.livereload.changed(file);
    
            })
           
           return [];
        },
        env:{
            "NODE_ENV" : "development",
            "USE_WEBPACK" : "true"
        }
    });
}); 

function devReload(filename){
    $.livereload.listen();
}

gulp.task("dev", gulp.series("serve"));



