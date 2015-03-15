(function (angular) {
    'use strict';

    angular.module('AcaEngine')

        .controller('MainCtrl', [
            '$scope',

            function ($scope) {
                var cam = 1;

                // The list of systems (listed in settings)
                $scope.systems = window.systemsList;

                $scope.nextCam = function () {
                    cam = cam + 1;
                    return cam;
                };
            }
        ]);

}(this.angular));
