$(document).ready(() => {
  $('.link-nav-item').click((e) => {
    const scrollTo = $(e.target).attr('href');

    if ($(scrollTo).length != 0) {
      $('html, body').animate({ scrollTop: $(scrollTo).offset().top }, 500);
    }
    return false;
  });
});