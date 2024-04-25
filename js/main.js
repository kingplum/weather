// main js
jQuery(document).ready(function(){
    $(window).load(function(){
      $('.overlay').hide();
    });
    var file = 'https://surfline.mjof.xyz/584204204e65fad6a77096d4.csv';
    $.get(file, function(csv) {
        var data = $.csv.toArrays(csv, {
          onParseValue: $.csv.hooks.castToScalar
        });
        var weathers = [];
        var c = 0;
        var i = 0;
        $.each(data, function(index, value){
          if(index > 0 && value[1] != null) {
            if(c == 24) {
              c = 0;              
              i++;
            }
            if(c == 0) {
              weathers.push({
                'date' : value[1].substring(0,10),
                'items' : []
              });
            }
            weathers[i].items.push(value);
            c++;
          }          
        });
        $.each(weathers, function(index, value) {
          $('.slider-nav').append('<div class="wrap-weather"> <h2>12/13(月)<span>pm</span><span>17:00</span></h2> <p><span class="sunny icon-time"><img src="images/sunny.png" alt="">日の出05:00</span> <span class="night icon-time"><img src="images/night-mode.png" alt="">日の入り18:00</span></p> </div>');
          //$('.slider-for').append('');
        });
    });
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