angular.module('jewelCrud', [])
.controller('mainController', ['$scope', '$interval', function($scope, $interval){
    $scope.test = 'Hahaha';
    $scope.submit = function(){
        $interval(function(){
            $scope.tryAgain = 'Wrong username or password. Try Again';
        }, 100)
        
    }
}])