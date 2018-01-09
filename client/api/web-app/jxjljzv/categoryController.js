(function () {
    angular.module('jewelCrud', [])
        .controller('categoryController', ['$scope', '$http', '$log', function ($scope, $http, $log) {

            $scope.data = {};

            let getBaseCategories = () => {
                $http({
                    method: 'GET',
                    url: '/baseCategory'
                })
                    .then(function (res) {
                        console.log('Got baseCategory response: ' + JSON.stringify(res.data));
                        $scope.data.baseCategories = res.data;
                    }, function (err) {
                        $log.err('Base Categories rest call failed');
                    });
            }

            let getCategories = () => {
                $http({
                    method: 'GET',
                    url: '/category'
                })
                    .then(function (res) {
                        console.log('Got response: ' + JSON.stringify(res.data));
                        $scope.data.categories = res.data;
                    }, function (err) {

                    });
            }


            let init = () => {
                $scope.cat = {};
                $scope.addOperation = true;
                $scope.updateOperation = false;

            }
            let catValidation = function(cat){
                if (!cat.name || !cat.base_category_id) {
                    throw new 'Invalid name or baseCategoryId';
                }       
            }
            $scope.addCategory = () => {
                $log.debug("baseCat val: " + $scope.cat.base_category_id);
                // $log.debug("baseCat state: " + $scope.cat.baseCategoryId.$valid);
                // if (!$scope.cat.name || !$scope.cat.base_category_id) {
                //     throw new 'Invalid name or baseCategoryId';
                // }
                catValidation($scope.cat);

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
                catValidation(category);
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
            getBaseCategories();
            getCategories();

        }])
})()