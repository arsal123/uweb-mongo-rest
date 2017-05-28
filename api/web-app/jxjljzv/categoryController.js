(function () {
    angular.module('jewelCrud', [])
        .controller('categoryController', ['$scope', '$http', '$log', function ($scope, $http, $log) {


            let getCategories = () => {
                $http({
                    method: 'GET',
                    url: '/category'
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
                    url: '/category',
                    data: $scope.cat
                })
                    .then(function (res) {
                        $log.info('Response from post:' + JSON.stringify(res.data));
                        $scope.cat = {}
                        getCategories()
                    })
            }

            $scope.startUpdate = (category) => {
                $scope.addOperation = false;
                $scope.updateOperation = true;

                // $log.debug(JSON.stringify(category));

                $scope.cat = category;
            }

            $scope.updateCategory = (category) => {
                $log.debug('Pre Update Call: ' + JSON.stringify(category));
                const url1 = '/category/' + category._id;
                $log.debug('Calling url:' + url1);

                $http({
                    method: 'PUT',
                    url: url1,
                    data: category
                })
                    .then(function (res) {
                        $log.info('Response from put:' + JSON.stringify(res.data));
                        init();
                    });

                // init();
            }

            $scope.deleteCategory = (category) => {
                $http({
                    method: 'DELETE',
                    url: '/category/' + category._id,
                })
                    .then(function (res) {
                        $log.info('Response from delete:' + JSON.stringify(res.data));
                        getCategories();
                    })
            }

            // Start of command execution
            init();
            getCategories();

        }])
})()