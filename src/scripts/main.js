$(document).ready(function(){
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:5,
        loop:true,
        margin:80,
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause:true
    });
  });