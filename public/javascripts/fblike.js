var FACEBOOK_APP_ID = '1694735120796708';
window.fbAsyncInit = function() {
  FB.init({
    appId      : FACEBOOK_APP_ID,
    xfbml      : true,
    version    : 'v2.5'
  });
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId=" + FACEBOOK_APP_ID;
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));