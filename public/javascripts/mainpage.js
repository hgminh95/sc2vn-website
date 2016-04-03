$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('#nav').addClass('shrink');
  } else {
    $('#nav').removeClass('shrink');
  }
});

$(document).ready(function() {
  $(".alert").fadeTo(10000, 500).slideUp(500, function(){
    $(".alert").alert('close');
  });
})
