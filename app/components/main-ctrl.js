(function (angular) {
    'use strict';
    var PER_PAGE = 9;

    angular.module('AcaEngine')
        .controller('MainCtrl', [
            '$scope',
            '$http',
            '$location',

            function ($scope, $http, $location) {
                var hasIcon = {
                    "ABC News 24": true,
                    "ABC 1": true,
                    "ABC 2": true,
                    "ABC 3": true,
                    "One": true,
                    "SBS One": true,
                    "SBS 2": true,
                    "7Mate": true,
                    "Seven": true,
                    "Nine": true,
                    "Ten": true,
                    "Eleven": true,
                    "GO": true,
                    "GEM": true
                };

                $scope.data = {};
                $scope.watch('data.channelNames', function (newVal) {
                    if (newVal) {
                        $scope.icons = [];
                        $scope.dropdown = [];
                        angular.forEach(newVal, function (name) {
                            if (hasIcon[name]) {
                                $scope.icons.push(name);
                            } else {
                                $scope.dropdown.push(name);
                            }
                        })
                    }
                });

                $scope.build_css_class = function (name) {
                    return name.gsub(/\s+/g, '_');
                };
            }
        ]);

}(this.angular));
