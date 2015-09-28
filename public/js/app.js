// angular.module('MyApp', ['ui.router', ''])
angular.module('MyApp', ['ui.router', 'door3.css', 'MyApp.controllers'])


.run(function($rootScope, $state, $stateParams) {
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


.factory('MyFactory', function($http, $location, $timeout) {
    var obj = {};
    var site_url = 'http://localhost/rh/service';
    // var site_url = 'https://vacantes-zoren101.c9.io/vacantes/service';

    obj.service = {}
    obj.session = {}
    obj.util = {}

    obj.session.is_logged = false;

    obj.session.login = function (formData) {
        if (formData.usuario == 'admin' && formData.password == '1234') {
            this.is_logged = true;
        }
        return this.is_logged;
    }

    obj.session.logout = function () {
        this.is_logged = false;
    }

    obj.util.redirigir = function (url) {
        $location.path('/app/loading/' + url);

        // $timeout(function() {
        //     $location.path('/app/' + url);
        // }, 3000);
    }

    obj.service.getCandidatos = function(params) {
        return $http.post(site_url + '/candidatos', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: params
        });
    }

    obj.service.getPosiciones = function(params) {
        return $http.post(site_url + '/posiciones', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: params
        });
    }


    return obj;
})



.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('app', {
                // url: '/app',
                url: '',
                abstract : true,
                views: {
                    'header': {
                        templateUrl: 'templates/navbar-index.html'
                    }, 'container@': {
                        templateUrl: '',
                    }
                }
            })
            .state('app.index', {
                url: '/app/index',
                views: {
                    'container@': {
                        templateUrl: 'templates/start.html',
                        css: 'public/css/landing-page.css'
                    },
                    'header': {
                        templateUrl: 'templates/navbar-index.html'
                    }
                }
            })
            .state('app.vacantes', {
                url: '/app/vacantes',
                views: {
                    'container@': {
                        templateUrl: 'templates/vacantes.html',
                        controller: 'CandidatosCtrl',
                        css: 'public/css/vacantes.css'
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
                        css: 'public/css/viewer.css'
                    }
                }
            })
            .state('app.loading', {
                url: '/app/loading/:url',
                views: {
                    'container@': {
                        templateUrl: 'templates/loading.html',
                        controller: 'LoadingCtrl',
                        css: 'public/css/loading.css'
                    }
                }
            })
            .state('app.login', {
                url: '/app/login',
                views: {
                    'container@': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl',
                        css: 'public/css/main.css'
                    }
                }
            })
            .state('app.logout', {
                url: '/app/logout',
                views: {
                    'container@' : {
                        controller: 'LogoutCtrl'
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
            $urlRouterProvider.otherwise('/app/index');
        })