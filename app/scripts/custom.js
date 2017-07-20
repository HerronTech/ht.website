jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();


    if (scroll >= 190 && jQuery(window).width() > 767 ) {
        jQuery(".topbar").addClass("scrolling");

    } else {
        jQuery(".topbar").removeClass("scrolling");
    }
});

