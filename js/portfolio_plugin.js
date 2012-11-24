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
	  next       : showNextImage
  };
    
  var settings = {};
  
  // Attach our plugin to jQuery.fn
  $.fn.portfolio = function( method ) {
    // Public method calling logic. i.e. $some_div.smallCalendar('method')
	  if ( public_methods[method] ) {
	    return public_methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	  } else if (typeof method === 'object' || ! method ) {
	    return public_methods.init.apply(this, arguments );
	  } else {
	    $.error( 'Method ' + method + ' does not exist in portfolio plugin');
	  }
  };
  
  // Public method definitions
  
  /**
   * initPortfolio()
   *
   * Initializes plugin with first images of getSRC(handle, index)
   **/
  function initPortfolio(options) {
      var $this = $(this);
	    var data  = $this.data('portfolio');
    
	    if ( ! data ) { 
	      // Plugin is not yet initialized...
        initialSetup($this, options);	      
        $this.data('portfolio' , true); // Plugin is now initialized
	    } else {
        // If plugin already initialized, do nothing
	    }	    

	    return $this; // Maintain chainability
  }
  
  // Private method definitions
  
  function initialSetup($this, options) {
    settings = $.extend( {}, settings, options);

    $this.find('.slideshow').filter( function() { 
      return $(this).children('img').length > 0; 
    }).each( function(i, el) {
      buildSlideshow($(el));
    });
    
    $(document).scroll(scrollHandler);
  }
  
  function buildSlideshow($el) {
  
    var data = {
      '$el' : $el,
      'handle' : $el.data('project-handle'),
      '$frame' : findOrMakeFrame($el),
      'curIndex': 0
    };
    
    $el.data('slideshow', data);
    $el.click(public_methods['next']);
    showFirstImage($el);
  }
  
  function findOrMakeFrame($slideshow) {
    var $frame = $slideshow.children('.frame');
    var frameExists = $frame.length > 0;
    if (frameExists) {
      return $frame;
    } else {
      var newFrame = $('<img class="frame" src="#" />')
      $slideshow.append(newFrame);
      return newFrame;
    }
  }
  
  function showNextImage(e) {
    var $this = $(e.currentTarget);
    var data = $this.data('slideshow')
    
    var $frame = data['$frame'];
    var curIndex = data['curIndex'];
    var handle = data['handle'];

    $frame.attr('src', getSRC(handle, curIndex + 1));
    
    data = $.extend({}, data, { 'curIndex' : curIndex + 1 });
    $this.data('slideshow', data);

  }
  
  function scrollHandler(e) {
    var scrollTopAtBottom =  $(document).height() - $(window).height();
    var scrollAtBottomOfPage = ($(window).scrollTop() == scrollTopAtBottom);
    if (scrollAtBottomOfPage) {
      infiniteScrollLoadNext();
    }
  }

  function infiniteScrollLoadNext() {
    buildSlideshow($('.slideShow').filter(function () {
      return $(this).children().length == 0;
    }).first());
  }
  
  function showFirstImage($el) {
    var data = $el.data('slideshow');
    var $frame = data['$frame'];
    var handle = data['handle'];
    
    var first = getSRC(handle, 0);
    var cur = $frame.attr('src');
    
    if (cur == first) {
      return; // Already set, do nothing
    } else {
      $frame.attr('src', first);
    }
  }
  
  function getSRC(handle, index) {
    var proj = PROJECT_LIST[handle]
    var projLen = proj.length;
    
    return "imgs/" + PROJECT_LIST[handle][index % projLen];
  }
  
})( jQuery ); // End plugin code
