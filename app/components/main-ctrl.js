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
                    channel_name: true
                };

                // disk space remaining
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
