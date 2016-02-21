(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$scope',
            '$rootScope',

        function ($scope, $rootScope) {
            // Provide analytics tracking data
            $scope.$emit('$track', 'state', 'online', 'desktop');

            // Updates the currently selected source
            $scope.selectSource = function (src) {
                $scope.selectedSource = $scope.sources[src];
                $scope.selectedSource.source = src;

                if ($scope.has_preview) {
                    // Provide analytics tracking data
                    $scope.coModuleInstance.$exec('preview', $scope.selectedSource.source);
                    $scope.$emit('$track', 'preview', $scope.selectedSource.record_as || $scope.selectedSource.source);
                } else if ($scope.numOutputs === 1) {
                    var key = Object.keys($scope.outputs)[0];
                    $scope.coModuleInstance.$exec('present', $scope.selectedSource.source, key);
                }

                // Support VC camera selection
                if ($scope.selectedSource.vc_input) {
                    $scope.coModuleInstance.$exec('select_camera', $scope.selectedSource.vc_input);
                }

                // Update the scopes
                $rootScope.$broadcast('updateSource', $scope.selectedSource);
            };

            // update the source
            $scope.$on('updateSource', function (event, source) {
                $scope.selectedSource = source;
            });
        }]);

}(this.angular));
