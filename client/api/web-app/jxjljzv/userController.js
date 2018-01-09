(function(){
    angular.module('jewelCrud', [])
        .controller('userController', ['$scope', '$http', function($scope, $http){
            let user = function(){
                $http({
                    method: 'GET',
                    url: '/me'
                })
                .then(function(res){
                    console.log(res);
                    $scope.user = res;
                });
            };

            user();
        }]);
})();