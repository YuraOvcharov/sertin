let 
    images = document.images,
    images_total_count = images.length,
    images_loaded_count = 0,
    preloader = document.getElementById('page-preloader'),
    perc_display = document.getElementById('load-perc');

    for (let i = 0; i < images_total_count; i++){
        image_clone = new Image();
        image_clone.onload = image_loaded;
        image_clone.onerror = image_loaded;
        image_clone.src = images[i].src;
    }

function image_loaded(){
    images_loaded_count++;
    perc_display.innerHTML = (( (100 / images_total_count) * images_loaded_count) << 0 ) + '%';
    if (images_loaded_count >= images_total_count){
        setTimeout(function(){
            if (!preloader.classList.contains('done')){
                preloader.classList.add('done');
            }
        },1000);
    }
};

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



