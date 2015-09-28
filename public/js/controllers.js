angular.module('MyApp.controllers', [])

.controller('CandidatosCtrl',function ($scope, $http, $location, MyFactory) {

    $scope.candidatos = [];
    $scope.posiciones = [];

    IsLogged();

    GetCandidatos();
    GetPosiciones();

    

    $scope.verUsuario = function (id) {
        $location.path('/app/viewer/' + id);
    }

    function IsLogged () {
        if(!MyFactory.session.is_logged)
            $location.path('/app/login');
    }


    function GetCandidatos() {
        MyFactory.service.getCandidatos()
            .then(function (res) {
                $scope.candidatos = res.data;
            } , function (err) {
                console.log(err);
            })
    }

    
    function GetPosiciones() {
        MyFactory.service.getPosiciones()
            .then(function (res) {
                $scope.posiciones = res.data;
            } , function (err) {
                console.log(err);
            })
    }


})


.controller('HeaderCtrl',function ($scope, $http, $location, MyFactory) {
    $scope.path = $location.path();
    $scope.getVisibilidadNavBar = function () {

        return true;
    }

    var location = $location.path();

})

.controller('NuevoCtrl',function ($scope, $http, $location, MyFactory) {


    $scope.items = [1,2,3,4,5];

    // LoadSelectize();


    function LoadSelectize() {
        $(".selectizable").selectize( );
    }

})


.controller('ViewerCtrl',function ($scope, $http, $location, $stateParams, $state, MyFactory) {
    $scope.candidato = {};
    $scope.visto = false;


    console.log($scope.current_state)

    var params = {
        candidato_id : $stateParams.id
    }

    GetCandidato(params);

    $scope.verContacto =  function () {
        $scope.visto = true;
    }


    function GetCandidato(params ) {
        MyFactory.service.getCandidatos(params)
            .then(function (res) {
                $scope.candidato = res.data[0];
                console.log(res.data[0]);
            } , function (err) {
                console.log(err);
            })
    }

})

.controller('AdminCtrl',function ($scope, $http, MyFactory) {


    $scope.candidatos = [];
    $scope.posiciones = [];

    GetCandidatos();
    GetPosiciones();


    function GetCandidatos() {
        MyFactory.service.getCandidatos()
            .then(function(res) {
                $scope.candidatos = res.data;
            }, function(err) {
                console.log(err);
            })
    }


    function GetPosiciones() {
        MyFactory.service.getPosiciones()
            .then(function(res) {
                $scope.posiciones = res.data;
            }, function(err) {
                console.log(err);
            })
    }
})



.controller('LoginCtrl',function ($scope, $http, $location, MyFactory) {


    $scope.formData = {};
    $scope.bad_login = false;

    $scope.login = function () {
        var result =  MyFactory.session.login($scope.formData);

        if(result)
            MyFactory.util.redirigir('vacantes');
        else
            $scope.bad_login = true;
    }

    function GetCandidatos() {
        MyFactory.service.getCandidatos()
            .then(function(res) {
                $scope.candidatos = res.data;
            }, function(err) {
                console.log(err);
            })
    }


    function GetPosiciones() {
        MyFactory.service.getPosiciones()
            .then(function(res) {
                $scope.posiciones = res.data;
            }, function(err) {
                console.log(err);
            })
    }
})
.controller('LogoutCtrl',function ($scope, $location, MyFactory) {

    RedireccionarInicio();

    function RedireccionarInicio () {
        MyFactory.session.logout();
        MyFactory.util.redirigir('index');
    }
})
.controller('LoadingCtrl',function ($scope, $location, $stateParams, $timeout, MyFactory) {    
    Cargar();
    function Cargar() {
        var random = Math.floor((Math.random() * 3) + 1) * 1000;
        $timeout(function() {
            $location.path('/app/' + $stateParams.url);
        }, random);

    }
})


