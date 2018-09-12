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

    $('.grid').isotope({
        itemSelector: '.grid-item',
        //percentPosition: true,
        //isFitWidth: true,
        //layoutMode: 'masonry',
        masonry: {
          columnWidth: '.grid-sizer'
        }
      }).isotope('layout');

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

