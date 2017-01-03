(function($,w){

var data = {
    "fullhero": `
        <div class="c_group c_full-hero">
        <div class="c_header">
            
        </div>
        <!-- Promo A -->
        <div class="col-md-24" data-buildable="true">

        </div>
    </div>
    `
}
 
 var Widget = function(element, options){
     this.$element = $(element);
     this.options       = $.extend({}, Widget.DEFAULTS, options);
     this.$trigger      = $('[data-toggle="collapse-side"][href="#' + element.id + '"],');
    this.transitioning = null;
 }


})(jQuery,window);