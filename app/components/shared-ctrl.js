(function (angular) {
    'use strict';

    angular.module('AcaEngine')
        .controller('SharedCtrl', [
            '$scope',

        function ($scope) {

            $scope.selectedOutput = null;

            // So we can decide to hide or show the output pane
            $scope.$watch('outputs', function (val) {
                if (val) {
                    $scope.outputNames = Object.keys(val);
                    $scope.numOutputs = $scope.outputNames.length;
                    $scope.selectedOutput = $scope.outputNames[0];
                    $scope.output = $scope.outputs[$scope.selectedOutput];
                }
            });

            $scope.$watch('selectedOutput', function (out) {
                if (out && $scope.outputs) {
                    $scope.output = $scope.outputs[out];
                }
            });

            $scope.selectOutput = function (output) {
                $scope.selectedOutput = output;
            };

        }]);

}(this.angular));
