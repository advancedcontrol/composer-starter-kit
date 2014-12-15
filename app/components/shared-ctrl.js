(function (angular) {
    'use strict';

    angular.module('AcaEngine')
        .controller('SharedCtrl', [
            '$scope',

        function ($scope) {

            // So we can decide to hide or show the output pane
            $scope.$watch('outputs', function (val) {
                if (val) {
                    $scope.outputNames = Object.keys(val);
                    $scope.numOutputs = $scope.outputNames.length;
                }
            });

            $scope.classify = function (val) {
                return 'ch-' + val.split(' ').join('').toLowerCase();
            };

            $scope.toInt = function (val) {
                return parseInt(val);
            };

        }]);

}(this.angular));
