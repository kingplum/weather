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
    $('.wicon').each(function(){
      $(this).html('<img src="https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+rand_icon()+'.svg">');
    });
    $('.gap1 div img').each(function(){
      $(this).attr('src', 'https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+rand_icon()+'.svg');
    });
});

function rand_num(num) {
  let x = Math.floor((Math.random() * num) + 1);
  return x;
}

function rand_fl(min, max) {
  let x = Math.floor((Math.random() * (min )) + 1);
  return x;
}

function rand_icon() {
  var icons = ["NIGHT_CLEAR","CLEAR","CLOUDY","NIGHT_CLOUDY","LIGHT_SHOWERS","LIGHT_RAIN","DRIZZLE","NIGHT_LIGHT_RAIN","NIGHT_MIST","NIGHT_MOSTLY_CLEAR","MOSTLY_CLEAR","MOSTLY_CLOUDY","NIGHT_OVERCAST","NIGHT_DRIZZLE","MIST","OVERCAST","LIGHT_SHOWERS_POSSIBLE"];
  return icons[Math.floor(Math.random() * icons.length)];
}