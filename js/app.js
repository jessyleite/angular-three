var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: './app.html',
            controller: 'MainController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);


app.controller('MainController', function ($scope) {

    $scope.models = ['superman', 'supergirl', 'joker'];
    $scope.model = 'superman';
    $scope.scale = 1;
    $scope.camera = new THREE.Vector3(0, 0, 100);
    $scope.fps = 0;

    $scope.sayHello = function () {
        $scope.$broadcast('sayHelloFromController', null);
    };

    $scope.$on('sayHelloFromThree', function (event, args) {
        console.log('Three says hello via Controller');
    });


});