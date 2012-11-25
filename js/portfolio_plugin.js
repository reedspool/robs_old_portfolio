/**
 * Whole page portfolio as jQuery plugin
 * 
 * Author: Reed Spool
 *
 * To use: 
 *    * Include jQuery.js, and this file
 *    * Call $("portfolioContainer").portfolio() to initialize portfolio
 **/
(function ($) {

  var public_methods = {
	  init       : initPortfolio,      // Takes 1 arg: hash for settings
	  next       : slideshowClicked
  };
    
  var settings = {};
  
  $.fn.portfolio = publicMethodLogic;
  
  // Public method definitions
  
  /**
   * initPortfolio()
   *
   * Initializes plugin with first images of getSRC(handle, index)
   **/
  function initPortfolio(options) {
	    var data  = this.data('portfolio');
    
	    if ( ! data ) {    // Plugin is not yet initialized...
        initialSetup(this, options);	      
        this.data('portfolio' , true); // Plugin is now initialized
	    } else {
        // Plugin already initialized, do nothing
	    }	    

	    return this; // Maintain chainability
  }

  /**
   * slideshowClicked(e)
   *
   * Event handler for click action on slideshow
   **/
  function slideshowClicked(e) {
    var $this = $(e.currentTarget);

    showNextImage($this);
  }

  function showNextImage($frame) {
    var data = $frame.data('slideshow');
    var curIndex = data['curIndex'];
    var handle = data['handle'];

    showImage($frame, curIndex + 1);

    $.extend(data, { 'curIndex' : curIndex + 1 });
    $frame.data('slideshow', data);
  }
  
  // Private method definitions

  function initialSetup($this, options) {
    extendSettings(options);
    buildAllSlideshows($this);
  }
  
  function buildAllSlideshows($this) {
    var row;
    var $el;

    $this.html('');

    for (var i = 0; i < PROJECT_ORDER.length; i++) {
      var row = PROJECT_ORDER[i];
      switch(typeof(row)) {
        case "string":
          $el = buildSingleSlideshowRow(row);
          break;
        case "object":
          $el = buildDoubleSlideshowRow(row);
          break;
      }

      $this.append($el);
    }

   /* old way
    $this.find('.frame').each( function(i, el) {
      buildSlideshow($(el));
    }); */
  }

  function buildSingleSlideshowRow(handle) {
    var $frame = buildFrame(handle);
    buildSlideshow($frame);
    return buildSlideshowRowContainer().append($frame);
  }

  function buildDoubleSlideshowRow(handleArr) {
    var $frameLeft = buildFrame(handleArr[0]).addClass('left');
    var $frameRight = buildFrame(handleArr[1]).addClass('right');
    buildSlideshow($frameLeft);
    buildSlideshow($frameRight);
    return buildSlideshowRowContainer().append($frameLeft).append($frameRight);
  }

  function buildSlideshowRowContainer() {
    return $('<section>').addClass('slideshowRow');
  }

  function buildFrame(handle) {
    return $('<img>').addClass('frame').data('project-handle', handle);
  }

  function extendSettings(options) {
    settings = $.extend( {}, settings, options);
  }

  function buildSlideshow($el) {
    makeSlideshowData($el);
    showImage($el, 0);
    $el.click(public_methods['next']);
  }
  
  function showImage($el, index) {
    $el.attr('src', getSRC($el.data('project-handle'), index));
  }

  function makeSlideshowData($el) {
    $el.data('slideshow', {
      '$el' : $el,
      'handle' : $el.data('project-handle'),
      'curIndex': 0
    });
  }
  
  function getSRC(handle, index) {
    var proj = PROJECT_LIST[handle]
    var projLen = proj.length;
    
    return "imgs/" + PROJECT_LIST[handle][index % projLen];
  }

  function publicMethodLogic( method ) {
    // Public method calling logic. i.e. $some_div.portfolio('method')
    if ( public_methods[method] ) {
      return public_methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if (typeof method === 'object' || ! method ) {
      return public_methods.init.apply(this, arguments );
    } else {
      $.error( 'Method ' + method + ' does not exist in portfolio plugin');
    }
  };
  
})( jQuery ); // End plugin code
