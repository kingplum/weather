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
    $('.time').each(function(){
      $(this).text(rand_fl(0.0, 2.9));
    });
    $('.temp, .gap1 div span').each(function(){
      $(this).text(rand_num(20));
    });
    $('.wicon').each(function(){
      $(this).html('<img src="https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+rand_icon()+'.svg">');
    });
    $('.gap1 div img').each(function(){
      $(this).attr('src', 'https://wa.cdn-surfline.com/quiver/0.21.2/weathericons/'+rand_icon()+'.svg');
    });
    $('.wind').each(function(){
      $(this).html('<i class="fa-solid fa-location-arrow '+rand_cl()+'" style="rotate: '+rand_num(180)+'deg;"></i>');
    });
    $('.tbl > div').each(function(){
      var num = rand_num(100);
      $(this).find('.chart').css('height', num + '%');
      if(num > 50) num = num - 10;
      if(num > 80) num = num - 20;
      $(this).find('.wind i').css('bottom', num + '%');
    });
});

function rand_num(num) {
  let x = Math.floor((Math.random() * num) + 1);
  return x;
}

function rand_fl(min, max) {
  let x = Math.floor(Math.random() * (max - min) + min);
  return x.toFixed(1);
}

function rand_icon() {
  var icons = ["NIGHT_CLEAR","CLEAR","CLOUDY","NIGHT_CLOUDY","LIGHT_SHOWERS","LIGHT_RAIN","DRIZZLE","NIGHT_LIGHT_RAIN","NIGHT_MIST","NIGHT_MOSTLY_CLEAR","MOSTLY_CLEAR","MOSTLY_CLOUDY","NIGHT_OVERCAST","NIGHT_DRIZZLE","MIST","OVERCAST","LIGHT_SHOWERS_POSSIBLE"];
  return icons[Math.floor(Math.random() * icons.length)];
}

function rand_cl() {
  var icons = ["bl", "yl", ""];
  return icons[Math.floor(Math.random() * icons.length)];
}