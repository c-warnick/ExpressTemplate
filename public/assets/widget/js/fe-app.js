(function($,w){

    var Widget = function (element, options) {
      this.$element      = $(element)
      this.options       = $.extend({}, Widget.DEFAULTS, options)
      this.$trigger      = '[data-buildable]'
      
      this.$frame = this.getFrame();
      this.$draggables =  this.getDraggable();

      this.$droparea;
      this.$dragged;
      this.formSaved = null;
      this.$component = null;
      this.$componentID = null;


      this.dragstart();
      this.dragend();
      this.dragenter();
      this.dragover();
      this.dragleave();
      this.drop();

      
  
    }

    Widget.VERSION  = '1.0.0'

    Widget.TRANSITION_DURATION = 350

    Widget.DEFAULTS = {
      prefix: '.c_'
    }

    Widget.DATA = {
        "controls" : `
        <div class="widget-control">
          <div class="btn-group btn-group-sm" role="group">
            <button id="widgetEdit" type="button" class="btn btn-widget">Edit</button>
            <button id="widgetDelete" type="button" class="btn btn-widget">Delete</button>
          </div>
        <div>
       `,
        "container": {
                  "fullhero": `
                      <div class="c_group c_full-hero">
                      <div class="c_header">
                          
                      </div>
                      <!-- Promo A -->
                      <div class="col-md-24" data-buildable="true" data-buildable-type="container">

                      </div>
                  </div>
                  `
        },
        "content-type":{
            "standard-overlay":`
                      <a href="#" class="c_group__content">
                        <div class="c_image">
                            <img class="c_hidden-xs" src="/assets/images/fh-half-purple.jpg" alt="alt for image">
                            <img class="c_hidden-sm c_hidden-md c_hidden-lg" src="/assets/images/fh-half-purple-m.jpg" alt="alt for image">
                            <div class="c_overlay c_grid__default-xs c_grid__default-sm--left c_text--center ">
                                <div class="c_overlay__content c_centered-xs--middle">
                                    <div class="c_badge" style="background-color:#2B4386"><span>door</span><span>buster</span></div>
                                    <div class="c_overlay__image"><img src="/assets/images/semp-sale.svg"></div>
                                    <div class="c_text">
                                            <!--span class="c_text-one">Up to 55% off</span-->
                                            <span class="c_text-two ff-chalet_newyork ff-28 ff-uppercase ff-white">over 190 bonusbuys instore &amp; online</span>
                                            <span class="c_text-three ff-chalet_paris ff-14 ff-uppercase ff-white">ends tuesday 9/21</span>
                                    </div>
                                    <div class="c_cta c_cta--button-white"><span>shop all bonusbuys</span></div>
                                </div>
                            </div>
                            <div class="c_badge c_badge--bottom c_hidden-xs" style="background-color:#2B4386"><span>door</span><span>buster</span></div>
                        </div>
                      </a>
            `
        },
        "form":{
          "default":{
            "header":`<button id="closeForm" class="btn btn-primary">X</button>`,
            "footer":`<button id="completeForm" class="btn btn-primary">Save</button>`
          },
          "standard-overlay": {
            "body":`
            <form>
              <div class="form-group">
                  <label for="image--img">Main Image</label>
                  <input type="file" id="image--image">
              </div>
              <hr />
              <div class="row">
                <!-- Mobile -->
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="overlay--class--overlay-size-xs">Overlay Size (Mobile)</label>
                    <select id="overlay--class--overlay-size-xs" class="form-control">
                          <option value="c_grid__default-xs">Default</option>
                          <option value="c_grid__1-1-xs">1-1</option>
                          <option value="c_grid__1-2-xs">1-2</option>
                          <option value="c_grid__1-3-xs">1-3</option>
                          <option value="c_grid__2-1-xs">2-1</option>
                          <option value="c_grid__2-2-xs">2-2</option>
                          <option value="c_grid__2-3-xs">2-3</option>
                          <option value="c_grid__3-1-xs">3-1</option>
                          <option value="c_grid__3-2-xs">3-2</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="overlay--class--overlay-position-xs">Overlay Position (Mobile)</label>
                    <select id="overlay--class--overlay-position-xs" class="form-control">
                        <option value="" selected>none</option>
                        <option value="--left" >left</option>
                        <option value="--right" >right</option>
                        <option value="--top" >top</option>
                        <option value="--bottom" >bottom</option>
                        <option value="--top-left" >top left</option>
                        <option value="--top-center" >top center</option> 
                        <option value="--top-right" >top right</option>
                        <option value="--middle-left" >middle left</option>
                        <option value="--middle-center" >middle center</option>
                        <option value="--middle-right" >middle right</option>
                        <option value="--bottom-left" >bottom left</option>
                        <option value="--bottom-center" >bottom center</option>
                        <option value="--bottom-right" >bottom right</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="overlay--class--vertical-alignment-xs">Content Vertical Alignment (Mobile)</label>
                    <select id="overlay--class--vertical-alignment-xs" class="form-control">
                      <option value="c_centered-xs--top" selected>Top</option>
                      <option value="c_centered-xs--middle">Middle</option>
                      <option value="c_centered-xs--bottom">Bottom</option>
                    </select>
                  </div>
                </div>

                <!-- Desktop -->
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="overlay--class--overlay-size-sm">Overlay Size (Desktop)</label>
                    <select id="overlay--class--overlay-size-sm" class="form-control">
                          <option value="c_grid__default-sm">Default</option>
                          <option value="c_grid__1-1-sm">1-1</option>
                          <option value="c_grid__1-2-sm">1-2</option>
                          <option value="c_grid__1-3-sm">1-3</option>
                          <option value="c_grid__2-1-sm">2-1</option>
                          <option value="c_grid__2-2-sm">2-2</option>
                          <option value="c_grid__2-3-sm">2-3</option>
                          <option value="c_grid__3-1-sm">3-1</option>
                          <option value="c_grid__3-2-sm">3-2</option>
                    </select>
                  </div>
                
                <div class="form-group">
                  <label for="overlay--class--overlay-position-sm">Overlay Position (Desktop)</label>
                  <select id="overlay--class--overlay-position-sm" class="form-control">
                      <option value="" selected>none</option>
                      <option value="--left" >left</option>
                      <option value="--right" >right</option>
                      <option value="--top" >top</option>
                      <option value="--bottom" >bottom</option>
                      <option value="--top-left" >top left</option>
                      <option value="--top-center" >top center</option> 
                      <option value="--top-right" >top right</option>
                      <option value="--middle-left" >middle left</option>
                      <option value="--middle-center" >middle center</option>
                      <option value="--middle-right" >middle right</option>
                      <option value="--bottom-left" >bottom left</option>
                      <option value="--bottom-center" >bottom center</option>
                      <option value="--bottom-right" >bottom right</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="overlay--class--vertical-alignment-sm">Content Vertical Alignment (Desktop)</label>
                  <select id="overlay--class--vertical-alignment-sm" class="form-control">
                    <option value="c_centered-xs--top" selected>Top</option>
                    <option value="c_centered-xs--middle">Middle</option>
                    <option value="c_centered-xs--bottom">Bottom</option>
                  </select>
                </div>
				</div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-6">
                <div class="form-group">
                  <label for="overlay--class--horizontal-Alignment">Content Horizontal Alignment</label>
                  <select id="overlay--class--horizontal-Alignment" class="form-control">
                    <option value="c_text--left" selected>Left</option>
                    <option value="c_text--center">Center</option>
                    <option value="c_text--right">Right</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="overlay__image--img">Overlay Image</label>
                  <input type="file" id="overlay__image--image">
                </div>
                <div class="form-group">
                  <label for="text--text-one">Text One</label>
                  <input type="text" class="form-control" id="text--text-one" placeholder="Cope Title">
                </div>
                <div class="form-group">
                  <label for="text--text-two">Text Two</label>
                  <input type="text" class="form-control" id="text--text-two" placeholder="Cope Title">
                </div>
                <div class="form-group">
                  <label for="text--text-three">Text Three</label>
                  <input type="text" class="form-control" id="text--text-three" placeholder="Cope Title">
                </div>
                <div class="form-group">
                  <label for="overlay--variation">CTA</label>
                  <select id="overlay--variation" class="form-control" data-form-toggle="#cta--span" data-form-toggle-value="button,text">
                    <option value="" selected>None</option>
                    <option value="button">Button</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="cta--span">CTA Text</label>
                  <input type="text" class="form-control" id="cta--span" placeholder="CTA Text">
                </div>
                </div>
              </div>
            </form>
          `,
          },
          "fullhero": {
            "body":`
            <form>
              <div class="form-group">
                <label for="header--variation">Header Type</label>
                <select id="header--variation" class="form-control" data-form-toggle="#header--title" data-form-toggle-value="title">
                  <option value="" selected>None</option>
                  <option value="leaf">Leaf</option>
                  <option value="title">Title</option>
                </select>
              </div>
              <div class="form-group">
                <label for="header--title">Header text</label>
                <input type="text" class="form-control" id="header--title" placeholder="Cope Title">
              </div>
              <div class="checkbox">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="group--class--no-gutters-vertical" value="no-gutters-vertical"> no gutters vertical
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" id="group--class-no-gutters-horizontal" value="no-gutters-horizontal"> no gutters horizontal
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" id="group--class--hidden" value="c_hidden-xs"> hidden mobile
                  </label>
              </div>
            </form>
          `,
          }
        },
        "components" : {
          "header" : {
            "variation" : {
                "leaf" : `
                          <i></i>
                `,
                "title" : `
                          <h2></h2>
                `
            }
          },
          "overlay":{
            "variation":{
                "button":`
                  <div class="c_cta c_cta--button"><span>Click Here</span></div>
                  `,
                  "text":`
                  <div class="c_cta c_cta--default"><span>Click Here</span></div>
                  `
            }
          }
        },
        "temp":{}
    }
    Widget.prototype.guid  = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    Widget.prototype.initialize = function(){
      if (this.$element.parent().hasClass('in'))
          $('body').addClass('widget-expanded');
    }

    Widget.prototype.getDraggable = function(){
       return this.$frame
        .find('[draggable=true]')
    }

    Widget.prototype.getFrame = function(){
       return $(this.$element.get(0).contentWindow.document.body)
    }

    Widget.prototype.getTemplateHtml = function(datatype,template){
        return Widget.DATA[datatype][template];
    }

    Widget.prototype.checkDropType = function(){
        return this.$dragged.attr('data-template-type') !== this.$droparea.attr('data-buildable-type');
    }

    Widget.prototype.dragstart = function(){console.log('initialize dragstart');
      
      var _this = this;
    
      this.$draggables.on('dragstart',function(event) {
        var $this = $(this)
            _this.$dragged = $this;
            console.log("Drag Started");
            var args = [$this.attr('data-template-type'),$this.attr('data-template-html')];
            event.originalEvent.dataTransfer.setData("widget",_this.getTemplateHtml(...args))

      });
    }

    Widget.prototype.dragend = function(){console.log('initialize dragend');
      
      var _this = this;
      this.$draggables.on('dragend',function(event) {
            var $this = $(this);

            if($this.attr('data-template-form'))
              _this.loadForm($this.attr('data-template-html'));

           console.log("Drag End");
      });
    }

    Widget.prototype.dragenter = function(){console.log('initialize dragenter');
      
      $(document).on('dragenter',this.$trigger,function(event)
      {
                event.preventDefault();
                event.stopPropagation();
                $(event.target).addClass("highlight");
      })
    }

    Widget.prototype.dragover = function(){console.log('initialize dragover');
      
      $(document).on('dragover',this.$trigger,function(event)
      {
                event.preventDefault();
                event.stopPropagation();
               
                
      })      
    }

    Widget.prototype.dragleave = function(){console.log('initialize dragleave');
      
      $(document).on('dragleave',this.$trigger,function(event)
      {
                event.preventDefault();
                event.stopPropagation();
                $(event.target).removeClass("highlight");
                
      })      
    }

    Widget.prototype.drop = function(){console.log('initialize drop');

      var _this = this
      $(document).on('drop',this.$trigger,function(event)
      {
            var $this = $(this);
            _this.$droparea = $(event.target);
            event.preventDefault();
            event.stopPropagation();
            $(event.target).removeClass("highlight");
            console.log('Drop event');

            if(!_this.checkDropType(event.target)){
              alert('You cannot nest a container into another container');
              return false
            }
                

            var e;
            if (event.isTrigger)
                e = triggerEvent.originalEvent;
            else
                var e = event.originalEvent;
            try {
                var textData = e.dataTransfer.getData('widget');

                _this.$component = $(textData);
                _this.$componentID = _this.guid();
                _this.$component.attr('id', _this.$componentID)

                _this.appendControls(_this.$component);

                $this.append(_this.$component);
            }
            catch(e)
            {
                console.log(e);
            }
      })  
    }

    Widget.prototype.appendControls = function(component){
        var _this = this
        var _controls = $(Widget.DATA['controls'])
        component.append(_controls);
        _this.initializeControls(_controls);
    }

    Widget.prototype.initializeControls = function(controls){
        var _this = this
        var $controls = $(controls)

        _this.$component.hover(function(e){
          e.stopPropagation();
          $controls.addClass('c_show');
        },function(){
          $controls.removeClass('c_show');
        })

        var $actions = $controls.find('button')
        $actions.attr('data-parent',_this.$componentID);

        // Edit
       $($actions.get(0)).on('click',function(){
            console.log('edit click')
            _this.loadComponent(this.getAttribute('data-parent'))
        })
        //Delete
        $($actions.get(1)).on('click',function(){
            console.log('delete click')
            var isConfirmed = confirm("Are you sure you want delete this group?");
            if(!isConfirmed) return;

            _this.removeComponent(this.getAttribute('data-parent'))
        })
    }

    Widget.prototype.getWidgetMain = function(){
       return this.$frame
        .find('#widget-main-header,#widget-main-body,#widget-main-footer')
    }

    Widget.prototype.loadForm = function(type) {console.log('Loading Form');
        
        var _this = this
        var defaultForm = Widget.DATA['form']['default']
        Widget.DATA['temp'][_this.$componentID] = {};
        _this.formSaved = false;
        _this.$element.parent().addClass('expand-frame')

        var components = _this.getWidgetMain(),
        header = $(components[0]),
        body = $(components[1]),
        footer = $(components[2])
        var form = Widget.DATA['form'][type];

        if(!form){
          alert(`Missing form for ${type}`);
          return false
        }

        if(!form.header)
          form.header = defaultForm.header

        if(!form.footer)
          form.footer = defaultForm.footer

        header.html(form.header);
        body.html(form.body);
        footer.html(form.footer);

        _this.loadFormActions(header,body,footer);

    }

    Widget.prototype.loadFormActions = function(header,body,footer) {console.log("Loading Form Actions")

        var _this = this
        var _form = body.find('form')
        var _inputs = _form.find('input,textarea,select');

        //Input functionality on load goes here
        _inputs.each(function(i){
          var _type = this.getAttribute("type") || this.nodeName;

          if(this.getAttribute("data-form-toggle") != null){
            _this.$frame.find(this.getAttribute("data-form-toggle")).hide();
            _this.inputToggle(this,i);
          }

        })

        _form.data('target', _this.$componentID);

        header.find('button').on('click',function(){
          if(this.id == 'closeForm')
            _this.closeForm();
        });

        footer.find('button').on('click',function(){
          if(this.id == 'completeForm')
            _this.completeForm(_form,_inputs);
        });
    }

    Widget.prototype.completeForm = function(_form,_inputs) {console.log("Completing Form")
        //Save function needed
        var _this = this

        _inputs.each(function(i){
            var _type = this.getAttribute("type") || this.nodeName;

          if(_type == 'text' || _type == 'date')
             _this.textInput(this,i);
            
          if(_type == 'TEXTAREA')
             _this.textareaInput(this,i);

          if(_type == 'radio')
             _this.radioInput(this,i);

          if(_type == 'checkbox')
              _this.checkboxInput(this,i);

          if(_type == 'SELECT')
            _this.selectInput(this,i);
         
        })
        
        _this.formSaved = true;
        _this.closeForm();

    }



    Widget.prototype.closeForm = function() {console.log("Closing Form")
        //Save function needed
        var _this = this
        if(!_this.formSaved || _this.formSaved != true){
          var isConfirmed = confirm("Are you sure you want to exit without saving?");
          
          if(!isConfirmed) return;
          if(isConfirmed) _this.removeComponent(_this.$componentID);
          
        }
           

        _this.$element.parent().removeClass('expand-frame')
        _this.clearForm();
    }

    Widget.prototype.clearForm = function() {console.log("Clearing Form")
        var _this = this 
        _this.getWidgetMain().html('');
        _this.formClosed();
    }

    Widget.prototype.formClosed = function() {console.log("Form Closed")
        var _this = this
    }

    Widget.prototype.selectInput = function(input,index) {
        
        var _this = this
        var $input = $(input);
        var selectors = $input.attr('id').split('--') 
        Widget.DATA['temp'][_this.$componentID][selectors[0]] = {};

        if(input.value == ''){
          console.log(`SelectInput True`)
          $(Widget.DEFAULTS.prefix + selectors[0]).remove();
        }else{
          console.log(`SelectInput False`)
          //store appending object in DATA
          Widget.DATA['temp'][_this.$componentID][selectors[0]][input.value] = $(Widget.DATA['components'][selectors[0]][selectors[1]][input.value])
          $(Widget.DEFAULTS.prefix + selectors[0])
          .append(Widget.DATA['temp'][_this.$componentID][selectors[0]][input.value])
        }     

    }
    Widget.prototype.textInput = function(input,index) {

        var _this = this
        var $input = $(input);
        var selectors = $input.attr('id').split('--') 
        var $target = Widget.DATA['temp'][_this.$componentID][selectors[0]][selectors[1]]
        if($target){
          $target.text(input.value);
        }
        
    }

    //Add Logic
    Widget.prototype.textareaInput = function(input,index) {

        var $this = $(this);
    }
    //Add Logic
    Widget.prototype.radioInput = function(input,index) {
        var $this = $(this);
    }
    //Add Logic
    Widget.prototype.checkboxInput = function(input,index) {
        var _this = this
        var $input = $(input);
        console.log(input.checked);
        var selectors = $input.attr('id').split('--') 
        if(selectors[1] == 'class'){
          if(input.checked){
            $(Widget.DEFAULTS.prefix + selectors[0]).addClass(input.value);
          }else{
            $(Widget.DEFAULTS.prefix + selectors[0]).removeClass(input.value);
          }
        }
        
    }
    //Add Logic
    Widget.prototype.inputToggle = function(input){
      var _this = this
      console.log(`inputToggle: ${input}`);
        var input = $(input);
        input.on('change',function(){
            var _target =  _this.$frame.find(input.attr('data-form-toggle'))
 
            if(this.value == input.attr('data-form-toggle-value')){
                console.log('Toggle True')
                _target.show();
            }else{
              console.log('Toggle False')
                _target.hide();
            }
                
        })
    }

    Widget.prototype.removeComponent = function(id){
          console.log(`Component Removed ${id}`);
          $(`#${id}`).remove();
    }
    Widget.prototype.loadComponent = function(id){
          console.log(id)
    }
    
    // WIDGET PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
      return this.each(function () {
        var $this   = $(this)
        var data    = $this.data('bs.widget')
        var options = $.extend({}, Widget.DEFAULTS, $this.data(), typeof option == 'object' && option)
        if(!data) $this.data('bs.widget' , (data = new Widget(this, options)))
        if(typeof option == 'string') data[option]()
      })
    }

    var old = $.fn.widget
     $.fn.widget             = Plugin
     $.fn.widget.Constructor = Widget

    // WIDGET NO CONFLICT
    // ==================

    $.fn.widget.noConflict = function () {
      $.fn.widget = old
      return this
    }

    // COLLAPSE DATA-API
    // =================
    $(document).ready(function(){
      console.log('Start build');

        var $this = $(this);
        var $widget = $this.find('[data-widget]')
        var $frame =   $widget.find('#' + $widget.data('widget'))
        //What is this? lol
        var data    = $widget.data('bs.collapseside')
        // What is this doing?
        var option  = data ? 'toggle' : $this.data()
        $frame.load(function(e)
        {
          console.log('Building Widget');
          var $this = $(this);
          Plugin.call($this, option)
        })
    });

})(jQuery,window);

