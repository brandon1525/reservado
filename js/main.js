$(document).ready(function(){
  "use strict";
  new WOW().init();
  $('.smooth-scroll').scrollingTo();
  $("#clients-logo").owlCarousel({
    itemsCustom : false,
    pagination : false,
    items : 5,
    autoplay: true
  });
  // fancybox
  $(".fancybox").fancybox({
    padding: 0,

    openEffect : 'elastic',
    openSpeed  : 450,

    closeEffect : 'elastic',
    closeSpeed  : 350,

    closeClick : true,
    helpers : {
      title : {
        type: 'inside'
      },
      overlay : {
        css : {
          'background' : 'rgba(0,0,0,0.8)'
        }
      }
    }
  });
});
$(document).off('click','.place_link').on('click','.place_link',function() {
  $('.navbar-toggle').click();
  $('#contenido_change').empty().load($(this).find('a').data('href'));
});
$(window).scroll(function () {
  if ($(window).scrollTop() > 50) {
    $(".navbar-brand a").css("color","#fff");
    $("#top-bar").removeClass("animated-header");
  } else {
    $(".navbar-brand a").css("color","inherit");
    $("#top-bar").addClass("animated-header");
  }
});

$.fn.scrollingTo = function( opts ) {
  var defaults = {
    animationTime : 1000,
    easing : '',
    callbackBeforeTransition : function(){},
    callbackAfterTransition : function(){}
  };

  var config = $.extend( {}, defaults, opts );

  $(this).click(function(e){
    var eventVal = e;
    e.preventDefault();

    var $section = $(document).find( $(this).data('section') );
    if ( $section.length < 1 ) {
      return false;
    };

    if ( $('html, body').is(':animated') ) {
      $('html, body').stop( true, true );
    };

    var scrollPos = $section.offset().top;

    if ( $(window).scrollTop() == scrollPos ) {
      return false;
    };

    config.callbackBeforeTransition(eventVal, $section);

    $('html, body').animate({
      'scrollTop' : (scrollPos+'px' )
    }, config.animationTime, config.easing, function(){
      config.callbackAfterTransition(eventVal, $section);
    });
  });
};
