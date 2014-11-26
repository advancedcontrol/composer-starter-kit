(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('OptionsCtrl', [
            '$scope',

        function ($scope) {

            // Updates the currently selected source
            $scope.selectSource = function (src) {
                // Update the source (basically matches what the server will return)
                $scope.disp_source = $scope.sources[src];
                $scope.disp_source.source = src;

                // Open the side panel
                $scope.$emit('navShow');
            };
        }]);

}(this.angular));
