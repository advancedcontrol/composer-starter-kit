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
                    $scope.poweredOutputs = 0

                    $scope.hasScreens = false;
                    $scope.hasLifters = false;
                    angular.forEach(val, function (output) {
                        if (output.screen) {
                            $scope.hasScreens = true;
                        }

                        if (output.lifter) {
                            $scope.hasLifters = true;
                        }

                        // Used to decide if we should show the manual
                        // Display control icon.
                        // Forces people to shutdown if using a single display system with no preview
                        if (!output.no_mod) {
                            $scope.poweredOutputs += 1;
                        }
                    });
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
