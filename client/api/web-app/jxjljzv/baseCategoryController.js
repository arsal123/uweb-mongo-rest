(function () {
    angular.module('jewelCrud', [])
        .controller('baseCategoryController', ['$scope', '$http', '$log', function ($scope, $http, $log) {


            let getCategories = () => {
                $http({
                    method: 'GET',
                    url: '/baseCategory'
                })
                    .then(function (res) {
                        console.log('Got response: ' + JSON.stringify(res.data));
                        $scope.categories = res.data;
                    }, function (err) {

                    });
            }

            let init = () => {
                $scope.cat = {};
                $scope.addOperation = true;
                $scope.updateOperation = false;

            }
            $scope.addCategory = () => {
                $http({
                    method: 'POST',
                    url: '/baseCategory',
                    data: $scope.cat
                })
                    .then(function (res) {
                        $log.info('Response from post:' + JSON.stringify(res.data));
                        $scope.cat = {}
                        getCategories()
                    })
            }

            $scope.startUpdate = (baseCategory) => {
                $scope.addOperation = false;
                $scope.updateOperation = true;

                // $log.debug(JSON.stringify(baseCategory));

                $scope.cat = baseCategory;
            }

            $scope.updateCategory = (baseCategory) => {
                $log.debug('Pre Update Call: ' + JSON.stringify(baseCategory));
                const url1 = '/baseCategory/' + baseCategory._id;
                $log.debug('Calling url:' + url1);

                $http({
                    method: 'PUT',
                    url: url1,
                    data: baseCategory
                })
                    .then(function (res) {
                        $log.info('Response from put:' + JSON.stringify(res.data));
                        init();
                    });

                // init();
            }

            $scope.deleteCategory = (baseCategory) => {
                $http({
                    method: 'DELETE',
                    url: '/baseCategory/' + baseCategory._id,
                })
                    .then(function (res) {
                        $log.info('Response from delete:' + JSON.stringify(res.data));
                        getCategories();
                    }, function(err){
                        $log.err('Err in updating base category: '+ JSON.stringify(res.data));
                    })
            }

            // Start of command execution
            init();
            getCategories();

        }])
})()