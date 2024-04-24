// main js
jQuery(document).ready(function(){
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      asNavFor: '.slider-nav',
      rows: 0,
      infinite: false,
      swipe: false,
      swipeToSlide: false,
      touchMove: false,
      draggable: false,
      accessibility: false
    });
    $('.slider-nav').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      rows: 0,
      infinite: false,
      swipe: false,
      swipeToSlide: false,
      touchMove: false,
      draggable: false,
      accessibility: false
    });
    // $.fn.mousedownScroll = function(data, fn) {
    //   if ( fn == null ) {
    //       fn = data;
    //       data = null;
    //   }    
    //   var o = fn;
    //   fn = function(e){
    //       if(inScrollRange(e)) {
    //           e.type = "mousedownscroll";
    //           return o.apply(this, arguments);
    //       }
    //       return;
    //   };
    //   if ( arguments.length > 0 ) {
    //       return this.bind( "mousedown", data, fn );
    //   } 
    //   return this.trigger( "mousedown" );
    // };
    $('.chart').each(function(){
      $(this).css('height', rand_num(100) + '%');
    });
    $('.temp').each(function(){
      $(this).text(rand_num(20));
    });
});

function rand_num(num) {
  let x = Math.floor((Math.random() * num) + 1);
  return x;
}