$(document).ready(function() {
  $('#thumbnail').hover(
    function() {
      $('#thumbnail').popover('show');
    },
    function() {
      $('#thumbnail').popover('hide');
    }
  );
});

$(function() {
  $('#thumbnail').popover({
    trigger: 'manual',
    html: true,
    title: '<strong>Preview</strong>',
    content: 'There is no image',
    placement: 'bottom',
    container: 'form'
  });

  $('#thumbnail:file').change(function() {
    var file = this.files[0];
    var reader = new FileReader();
    var img = $('<img/>', {
      id: 'image-preview'
    });
    reader.onload = function(e) {
      img.attr('src', e.target.result);
      img.attr('style', 'max-width: 100%; max-height: 100%')
      $('#thumbnail').attr('data-content', $(img)[0].outerHTML).popover('show');
    };
    reader.readAsDataURL(file);
  });
});