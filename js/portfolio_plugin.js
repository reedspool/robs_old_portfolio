/**
 * Whole page portfolio as jQuery plugin
 * 
 * Author: Reed Spool
 *
 * To use: 
 *    * Include jQuery.js, and this file
 *    * Call $("portfolioContainer").portfolio() to initialize portfolio
 **/
(function ( $ ){

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
    var data = $frame.data('slideshow')
    var curIndex = data['curIndex'];
    var handle = data['handle'];

    $frame.attr('src', getSRC(handle, curIndex + 1));

    $.extend(data, { 'curIndex' : curIndex + 1 });
    $el.data('slideshow', data);
  }
  
  // Private method definitions

  function initialSetup($this, options) {
    extendSettings(options);
    buildAllSlideshows($this);
  }
  
  function buildAllSlideshows($this) {
    $this.find('.frame').each( function(i, el) {
      buildSlideshow($(el));
    });
  }

  function extendSettings(options) {
    settings = $.extend( {}, settings, options);
  }

  function buildSlideshow($el) {
    makeSlideshowData($el);
    $el.click(public_methods['next']);
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
