function tinymce_init(selectorID, _inline) {
  $(document).ready(function() {
    console.log(selectorID);
    tinymce.init({
      selector: selectorID,
      inline: _inline,
      plugins: 'image imagetools media fullscreen textcolor link',
      toolbar: 'undo edo | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | link image media | fullscreen'
    });
  });
}