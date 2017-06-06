(function () {
    angular.module('jewelCrud', [])
        .controller('itemController', ['$scope', '$http', '$log', function ($scope, $http, $log) {


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

            let getItems = () => {
                $http({
                    method: 'GET',
                    url: '/item'
                })
                    .then(function (res) {
                        console.log('Got response: ' + JSON.stringify(res.data));
                        $scope.items = res.data;
                    }, function (err) {

                    });
            }

            let init = () => {
                $scope.data = {};
                $scope.item = {};
                $scope.addOperation = true;
                $scope.updateOperation = false;
                getCategories();
            }

            $scope.addItem = () => {
                $http({
                    method: 'POST',
                    url: '/item',
                    data: $scope.item
                })
                    .then(function (res) {
                        $log.info('Response from post:' + JSON.stringify(res.data));
                        $scope.item = {}
                        getItems()
                    })
            }

            $scope.startUpdate = (item) => {
                $scope.addOperation = false;
                $scope.updateOperation = true;

                // $log.debug(JSON.stringify(item));

                $scope.item = item;
            }

            $scope.updateItem = (item) => {
                $log.debug('Pre Update Call: ' + JSON.stringify(item));
                const url1 = '/item/' + item._id;
                $log.debug('Calling url:' + url1);

                $http({
                    method: 'PUT',
                    url: url1,
                    data: item
                })
                    .then(function (res) {
                        $log.info('Response from put:' + JSON.stringify(res.data));
                        init();

                    });

                // init();
            }

            $scope.deleteItem = (item) => {
                $http({
                    method: 'DELETE',
                    url: '/item/' + item._id,
                })
                    .then(function (res) {
                        $log.info('Response from delete:' + JSON.stringify(res.data));
                        getItems();
                    })
            }

            // Start of command execution
            init();
            getItems();

        }])
})()