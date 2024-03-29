(function () {
    angular.module('jewelCrud', [])
        .directive('fileModel', ['$parse', function($parse){
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    console.log('COMING IN fileModel');
                    console.log(element);
                    element.on('change', function() {
                        // console.log('COMING IN change-event - fileModel');

                        if(!scope.item.name){
                            alert('Please enter item name before choosing image file')
                            element[0].front_img_file = null;
                            element[0].side_img_file = null;
                            return;
                        }
                        $parse(attrs.fileModel).assign(scope, element[0].files);
                        // $parse(attrs.fileModel).assign(scope, element[0].side_img_file);
                        scope.$apply();
                    });
                }
            };
        }])
        .controller('itemController', ['$scope', '$http', '$log', '$window', function ($scope, $http, $log, $window) {

            $scope.searchText = '';
            
            let getCategories = () => {
                $http({
                    method: 'GET',
                    url: '/category'
                })
                    .then(function (res) {
                        console.log('Got response: ' + JSON.stringify(res.data));
                        $scope.data.categories = res.data;
                    }, function (err) {
                        console.error('Err from Category: ' + err);
                    });
            }

            let addCategoryName = (categories, items) => {
                // Validation
                if (!items || !categories){
                    return items;
                }

                for (item in items) {
                    for (category in categories) {
                        if (categories[category]._id == items[item].category_id){
                            items[item].categoryName = categories[category].name;
                            break;
                        }
                    }
                }
                return items;
            }

            let getItems = () => {
                $http({
                    method: 'GET',
                    url: '/item'
                })
                    .then(function (res) {
                        console.log('Got response: ' + JSON.stringify(res.data));
                        if (!$scope.data.categories) getCategories();
                        let items = addCategoryName($scope.data.categories, res.data);
                        $scope.items = items;

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

            let uploadImg = (fileName) => {
                var formData = new FormData();

                var itemPath = document.getElementById('catSelectView').selectedOptions[0].label;
                if (itemPath){
                    itemPath += '/'
                }

                console.log('REQ FILE NAME: ' + fileName);

                if(fileName.indexOf('front') > -1){
                    angular.forEach($scope.front_img_file, function (file) {
                        formData.append('file', file);
                    });
                } else if (fileName.indexOf('side') > -1) {
                    angular.forEach($scope.side_img_file, function(file){
                        formData.append('file', file);
                    });
                }


                $http({
                    method: 'POST',
                    url: '/item/fileupload',
                    data: formData,
                    params:{
                        fileName: fileName,
                        path: itemPath
                    },
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }

                }).then(function (res){
                    console.log(res);

                }, function(err) {
                    console.log(err);
                });
            };


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
                $window.scrollTo(0, 0);
                $log.debug('Scrolling to top');
            }

            $scope.updateItem = (item) => {


                if ($scope.front_img_file){
                    let fileName = $scope.item._id.substr(0,4) + '_front_' + $scope.item.name.replace(/ /g,"_") + '.' + $scope.front_img_file[0].type.split('/')[1];
                    uploadImg(fileName);
                    fileName && (item.img_path = fileName);
                }
                if ($scope.side_img_file){
                    let fileName = $scope.item._id.substr(0,4) + '_side_' + $scope.item.name.replace(/ /g,"_") + '.' + $scope.side_img_file[0].type.split('/')[1];
                    uploadImg(fileName);
                    fileName && (item.side_img_path = fileName);
                }

                $log.debug('Pre Update Call: ' + JSON.stringify(item));
                const url1 = '/item/' + item._id;
                // $log.debug('Calling url:' + url1);

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
