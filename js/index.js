$(document).ready(function() {
  // fade in cover elements
  $('.cover__container h5').hide().delay(200).fadeIn('slow');
  $('.cover__headline').hide().fadeIn(2000);
  $('.cover__intro').hide().delay(500).fadeIn('slow');
  $('.cover__container a').hide().delay(500).fadeIn('slow');

  $(window).scroll( function(){
    $('.hideme').each( function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if( bottom_of_window > bottom_of_object - 250){
          $(this).animate({'opacity':'1'}, 800);
      }
    });
  });
});
