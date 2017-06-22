let crudApp = angular.module('jewelCrud', ['ui.router']);

crudApp.conf(function ($stateProvider) {
  let mainState = {
    name: 'main',
    url: '/',
    templateUrl: 'main.html'
  }

  

  $stateProvider.state(mainState);
  
});

crudApp.controller('mainController', ['$scope', '$interval', function($scope, $interval){
    $scope.test = 'Hahaha';
    $scope.submit = function(){
        $interval(function(){
            $scope.tryAgain = 'Wrong username or password. Try Again';
        }, 100)
        
    }
}])