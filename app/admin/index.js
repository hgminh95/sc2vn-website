// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', ['ng-admin']);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  // create an admin application
  var admin = nga.application('Admin Control Panel')
    .baseApiUrl('https://localhost:3000/api/');

  admin.addEntity(nga.entity('users'))
  admin.addEntity(nga.entity('articles'))
  admin.addEntity(nga.entity('tournaments'))
  admin.addEntity(nga.entity('matches'))
  admin.addEntity(nga.entity('clans'))
  admin.addEntity(nga.entity('maps'))
  admin.addEntity(nga.entity('settings'))

  require('./articles/config')(nga, admin)
  require('./users/config')(nga, admin)
  require('./tournaments/config')(nga, admin)
  require('./matches/config')(nga, admin)
  require('./clans/config')(nga, admin)
  require('./maps/config')(nga, admin)
  require('./settings/config')(nga, admin)

  admin.menu(nga.menu()
        .addChild(nga.menu(nga.entity('users')).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(nga.entity('articles')).icon('<span class="glyphicon glyphicon-list-alt"></span>'))
        .addChild(nga.menu(nga.entity('tournaments')).icon('<span class="glyphicon glyphicon-knight"></span>'))
        .addChild(nga.menu(nga.entity('matches')).icon('<span class="glyphicon glyphicon-knight"></span>'))
        .addChild(nga.menu(nga.entity('clans')).icon('<span class="glyphicon glyphicon-knight"></span>'))
        .addChild(nga.menu(nga.entity('maps')).icon('<span class="glyphicon glyphicon-knight"></span>'))
        .addChild(nga.menu(nga.entity('settings')).icon('<span class="glyphicon glyphicon-knight"></span>'))
  )

  nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {
  var convertId = function(element) {
    element.id = element._id
    delete element['_id']

    return element
  }

  RestangularProvider.addElementTransformer('articles', function(element) {
    element.id = element._id
    delete element['_id']

    if (element.author != null)
      element.author_id = element.author._id

    return element
  })

  RestangularProvider.addElementTransformer('users', convertId)
  RestangularProvider.addElementTransformer('tournaments', convertId)
  RestangularProvider.addElementTransformer('matches', convertId)
  RestangularProvider.addElementTransformer('clans', convertId)
  RestangularProvider.addElementTransformer('maps', convertId)
}])
