// angular.module('MyApp', ['ui.router', ''])
angular.module('MyApp', ['ui.router', 'door3.css','MyApp.controllers'])


.run(function($rootScope, $state) {
    $rootScope.state = $state
    $rootScope.current = $state.current;

})


.filter('moment', function() {
    return function(date, method) {
        moment.locale('es');
        var momented = moment(date);
        return momented[method].apply(momented, Array.prototype.slice.call(arguments, 2));
    }
})


.factory('MyFactory', function($http) {
    var obj = {};
    var site_url = 'https://vacantes-zoren101.c9.io/vacantes/service';

    obj.ruta = ''

    obj.getCandidatos = function (params) {
        return $http.post(site_url + '/candidatos', { headers :  {'Content-Type': 'application/x-www-form-urlencoded'} , data :  params });
    }
    
    obj.getPosiciones = function (params) {
    	return $http.post(site_url + '/posiciones', { headers :  {'Content-Type': 'application/x-www-form-urlencoded'} , data :  params});
    }


    return obj;
})



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '',
        abstract: true,
        views: {
            'header': {
                templateUrl: 'templates/navbar.html',
                controller : 'HeaderCtrl'
            }
        }
    })
    .state('app.vacantes', {
        url: '/app/vacantes',
        views: {
            'container@': {
                templateUrl: 'templates/vacantes.html',
                controller: 'CandidatosCtrl'
            }
        }
    })
    .state('app.admin', {
        url: '/app/admin',
        views: {
            'container@': {
                templateUrl: 'templates/admin.html',
                controller: 'AdminCtrl'
            }
        }
    })
    .state('app.nuevo', {
        url: '/app/nuevo',
        views: {
            'container@': {
                templateUrl: 'templates/nuevo.html',
                controller: 'NuevoCtrl'
            }
        }
    })
    .state('app.viewer', {
        url: '/app/viewer/:id',
        views: {
            'container@': {
                templateUrl: 'templates/viewer.html',
                controller: 'ViewerCtrl',
                css : 'public/css/viewer.css'
            }
        }
    })

    // .state('app.vacantes', {
    //     url: '/vacantes',
    //     templateUrl: 'templates/vacantes.html',
    //     controller: 'VacantesCtrl'
    // })



    // .state('app.single', {
    //     url: '/app/vacantes',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/vacantes.html',
    //             controller: 'VacantesCtrl'
    //         }
    //     }
    // });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/vacantes');
})