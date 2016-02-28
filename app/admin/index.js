// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  // create an admin application
  var admin = nga.application('My First Admin')
    .baseApiUrl('https://localhost:3000/api/');
  
  admin.addEntity(nga.entity('users'));
  admin.addEntity(nga.entity('articles'));
  
  require('./articles/config')(nga, admin);
  require('./users/config')(nga, admin);
  
  admin.menu(nga.menu()
        .addChild(nga.menu(nga.entity('users')).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(nga.entity('articles')).icon('<span class="glyphicon glyphicon-list-alt"></span>'))
    );
  
  nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
  RestangularProvider.addElementTransformer('users', function(element) {
    element.id = element._id;
    delete element['_id'];
      
    return element;
  });
  
  RestangularProvider.addElementTransformer('articles', function(element) {
    element.id = element._id;
    delete element['_id'];
      
    return element;
  });
}]);