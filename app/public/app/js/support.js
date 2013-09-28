function scrollClick(obj) {
    $('html, body').animate({
        scrollTop: $(obj).offset().top - 140
    }, 1000);
}

