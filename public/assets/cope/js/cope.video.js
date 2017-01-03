(function($,w){
    if (!window.jQuery)
        console.error("jQuery is required for Belk videos");
    var idArr = [],
    videos = $("[class*=clickToPlay]"),transcripts = $('.vid-transcript'),
    config ={
        brightcove:{
            path:"//api.brightcove.com/services/library?",
            command:"find_videos_by_ids",
            video_fields:"id%2CvideoStillURL%2Cname",
            token:"aXy2ZVRb7ePRn3rlCAyc7Hd58NIlzc_M7IhJmL8p8BjSxE_g3uXiww.."

        }
    }

    function getThumbByVidIDs(i) {
        if (i && i.length > 0) {
            idString = i.join("%2C");
            var e = config.brightcove.path
                    + "command=" + config.brightcove.command
                    + "&video_ids=" + idString 
                    + "&video_fields=" + config.brightcove.video_fields
                    + "&token=" + config.brightcove.token;
            $.ajax({
                url: e,
                dataType: "jsonp",
                success: function(i) {
                    placeBCThumbnails(i.items)
                },
                error: function(i) {
                    console.error("Video thumbnails retrieval failed: " +
                        i)
                }
            })
        } else {
            console.error("No ID array passed to brightcove!");
        }
    };

    function placeBCThumbnails(brightcove) {


        if(brightcove.length > 0){
            for(var i = 0; i < brightcove.length;i++){
                var target = $(".vid-" + brightcove[i].id);
                if(target.length > -1){
                    target
                    .attr("src", brightcove[i].videoStillURL)
                    .attr("alt",brightcove[i].name);
                }else{
                    console.error("placeBCThumbnails Target Not Found");
                }
            }
        }else{
            console.error("Parameter error at function placeBCThumbnails: Missing Arguments")
        }
    };
    // Getting Video objects and pulling ids into arr.
    if(videos.length > 0){

        videos.each(function(){
            var $this = $(this);
            idArr.push($this.attr("class").split("clickToPlay")[1]);
        })
        getThumbByVidIDs(idArr);
    }

    if(transcripts.length > 0){
        transcripts.on('click',function(e){
            e.preventDefault();
            var $this = $(this),
            path = $this.attr("href");
            if(path.length > 0 && path != " "){
                belk.modal.open({
                    width: 500,
                    height: 500,
                    content: '<iframe width="100%"height="100%" style="border:none;"src="' +
                        path + '">'
                });
            }else{
                console.error("No path found on object");
            }
                
        })
        
    }


})(jQuery,window);