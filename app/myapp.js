/*globals angular */
'use strict';

angular.module('tested-facts', [])
    .controller('FactsControllers', function ($scope, $http, $timeout, $interval) {

        $scope.name = 'Tested Facts';
        $scope.headline = 'Facts from Around the World';
        $scope.data = {
            value: [{
                id: '0',
                joke: 'Click the fetch button to learn intriguing facts'
            }]
        };
        $scope.error = '';

        $scope.updateLoader = function () {
            $scope.data.value[0].id += '.';
        };

        $scope.fetchFacts = function () {
            $scope.data.value = [{id: ' ...', joke: ''}];

            var isLoading = $interval(function () {
                $scope.updateLoader();
            }, 1000);

            $timeout(function () {
                $http.get('http://api.icndb.com/jokes/random/5')
                    .then(function (response) {
                        // FIXME! here is a bug ;-)
                        $interval.cancel(isLoading);
                        $scope.data = response.data;
                        $scope.error = '';
                    }, function () {
                        $interval.cancel(isLoading);
                        $scope.error = 'Error fetching facts :-(';
                    });

            }, 3000);
        };

    })
    .filter('searchFor', function () {
        return function (arr, searchString) {

            if (!searchString) {
                return arr;
            }

            var result = [];

            searchString = searchString.toLowerCase();

            angular.forEach(arr, function (item) {
                if (item.joke.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }
            });

            return result;
        };
    });
