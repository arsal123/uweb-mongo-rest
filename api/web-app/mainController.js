let crudApp = angular.module('jewelCrud', ['ui.router']);

// crudApp.config(function ($stateProvider) {
//   let mainState = {
//     name: 'main',
//     url: '/auth',
//     templateUrl: 'list.html'
//   }

//   $stateProvider.state(mainState);
  
// });

crudApp.controller('mainController', ['$scope', '$interval', function($scope, $interval){
    $scope.test = 'Hahaha';
    $scope.submit = function(){
        $interval(function(){
            $scope.tryAgain = 'Wrong username or password. Try Again';
        }, 100)
        
    }
}])