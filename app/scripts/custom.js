jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();

    if (scroll >= 90 && jQuery(window).width() > 767 ) {
        jQuery(".navbar").addClass("scrolling");

    } else {
        jQuery(".navbar").removeClass("scrolling");
    }
});

