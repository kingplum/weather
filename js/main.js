// main js
jQuery(document).ready(function(){
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        asNavFor: '.slider-nav',
        rows: 0,
        draggable: false,
        infinite: false
      });
      $('.slider-nav').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        rows: 0,
        draggable: false,
        infinite: false
    });
});