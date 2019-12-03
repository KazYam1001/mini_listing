$(document).on('turbolinks:load', ()=> {
  if (location.pathname.match(/\/products\/search+/)) {
    $('.js-sort').on('change', function() {
      location.href = $(this).val();
    });
  }
});
