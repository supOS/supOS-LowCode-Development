function addSidebarExtend() {
  $('.sidebar li').each(function() {
    if ($(this).children('ul').length) {
      $(this).children('a').prepend('<img class="arrowBtn" src="/vendor/image/arrow.svg" />');
      $(this).children('ul').hide(0);
    }
    if ($(this).children('a').attr('href') === window.location.hash.split('?')[0] && !$(this).hasClass('active')) {
      $(this).addClass('active');
    }
  });

  $('.sidebar li.active').each(function() {
    if ($(this).children('ul').length) {
      $(this).children('ul').show(0);
      $(this).children('a').children('img').addClass('open');
    }
    $(this).parents('li').each(function() {
      if ($(this).children('ul').length) {
        $(this).children('a').children('img').addClass('open');
        $(this).children('ul').show(0);
      }
    });
  });

  $('.sidebar .arrowBtn').click(function(e) {
    e.preventDefault();
    var opened = false;
    if ($(this).hasClass('open')) {
      opened = true;
    }
    $(this)[opened ? 'removeClass' : 'addClass']('open');
    $(this).parents('li:first').children('ul')[opened ? 'hide' : 'show'](300);
  });
}