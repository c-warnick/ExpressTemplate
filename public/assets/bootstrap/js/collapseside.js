// COLLAPSE SIDE
+function ($) {
    var CollapseSide = function(element,options){
        this.$element = $(element);
        this.options       = $.extend({}, CollapseSide.DEFAULTS, options)
        this.$trigger      = $('[data-toggle="collapse-horizontal"][href="#' + element.id + '"],' +
                            '[data-toggle="collapse-horizontal"][data-target="#' + element.id + '"]')
        this.transitioning = null

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    }

    CollapseSide.VERSION  = '1.0.0'

    CollapseSide.TRANSITION_DURATION = 350

    CollapseSide.TRANSITION_WIDTH = 100

    CollapseSide.DEFAULTS = {
        toggle: true
    }

  CollapseSide.prototype.dimension = function () {
    var hasHeight = this.$element.hasClass('height')
    return hasHeight ? 'height' : 'width'

  }

  CollapseSide.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing-side')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapseside')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapseside')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapseside', null)
    }
    var dimension = this.dimension()

    this.$element
      .removeClass('collapse-side')
      .addClass('collapsing-side')[dimension](0)
      .attr('aria-expanded', true)
      .parents('body').addClass('widget-expanded')

    this.$trigger
      .removeClass('collapsed-side')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing-side')
        .addClass('collapse-side in')[dimension]('')

    this.$trigger
        .removeClass('closed')
        .addClass('open')

      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapseside')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(CollapseSide.TRANSITION_DURATION)[dimension](CollapseSide.TRANSITION_WIDTH)
  }

  CollapseSide.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapseside')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()
    

    this.$element[dimension](this.$element[dimension]())[0].offsetWidth

    this.$element
      .addClass('collapsing-side')
      .removeClass('collapse-side in')
      .attr('aria-expanded', false)
      .parents('body').removeClass('widget-expanded')

    this.$trigger
      .addClass('collapsed-side')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing-side')
        .addClass('collapse-side')
        .trigger('hidden.bs.collapseside')

    this.$trigger
        .removeClass('open')
        .addClass('closed')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(CollapseSide.TRANSITION_DURATION)
  }

  CollapseSide.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  CollapseSide.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse-horizontal"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  CollapseSide.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed-side', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapseside')
      var options = $.extend({}, CollapseSide.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapseside', (data = new CollapseSide(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapseside

  $.fn.collapseside             = Plugin
  $.fn.collapseside.Constructor = CollapseSide


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapseside.noConflict = function () {
    $.fn.collapseside = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapseside.data-api', '[data-toggle="collapse-horizontal"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapseside')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);