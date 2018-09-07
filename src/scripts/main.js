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

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        isFitWidth: true,
        gutter: 30
      });

 
    $(window).scroll(function () {
        // Get the height of the banner,
        // and then set your menu.
        var bannerHeight = $('.main').height();
        if ($(window).scrollTop() > bannerHeight) {
            $('.navbar').addClass('fixed-top');
        } else {
            $('.navbar').removeClass('fixed-top');
        }
    });



  });

