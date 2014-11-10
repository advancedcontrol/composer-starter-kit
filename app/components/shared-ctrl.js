(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        // The authentication service doesn't have to be hosted on the same domain
        // as the control service - hence the complexity of this configuration
        .controller('SharedCtrl', [
            '$scope',

        function ($scope) {

            // So we can decide to hide or show the output pane
            $scope.$watch('outputs', function (val) {
                if (val) {
                    $scope.numOutputs = Object.keys(val).length;
                }
            });

        }]);

}(this.angular));
