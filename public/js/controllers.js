angular.module('MyApp.controllers', [])

.controller('CandidatosCtrl',function ($scope, $http, $location, MyFactory) {

    $scope.candidatos = [];
    $scope.posiciones = [];

    GetCandidatos();
    GetPosiciones();

    

    $scope.verUsuario = function (id) {
        $location.path('/app/viewer/' + id);
    }


    function GetCandidatos() {
        MyFactory.getCandidatos()
            .then(function (res) {
                $scope.candidatos = res.data;
            } , function (err) {
                console.log(err);
            })
    }

    
    function GetPosiciones() {
        MyFactory.getPosiciones()
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
    $scope.path = $location.path();
    $scope.getVisibilidadNavBar = function () {

        return true;
    }

    var location = $location.path();

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
        MyFactory.getCandidatos(params)
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
        MyFactory.getCandidatos()
            .then(function(res) {
                $scope.candidatos = res.data;
            }, function(err) {
                console.log(err);
            })
    }


    function GetPosiciones() {
        MyFactory.getPosiciones()
            .then(function(res) {
                $scope.posiciones = res.data;
            }, function(err) {
                console.log(err);
            })
    }
})