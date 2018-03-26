(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$scope',
            '$rootScope',

        function ($scope, $rootScope) {
            // Provide analytics tracking data
            $scope.$emit('$track', 'state', 'online', 'desktop');

            $scope.selected = {};

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

                // Update the scopes
                $rootScope.$broadcast('updateSource', $scope.selectedSource);
            };

            // Support VC camera selection
            $scope.selectCamera = function (src) {
                $scope.selected.camera = $scope.sources[src];
                $scope.selected.camera.source = src;
                $scope.coModuleInstance.$exec('select_camera', src, $scope.selected.camera.vc_input);
            };

            $scope.$watch('selected.camera_src', function (current) {
                if (!current) { return; }
                $scope.selected.camera = $scope.sources[current];
            });

            // update the source
            $scope.$on('updateSource', function (event, source) {
                $scope.selectedSource = source;
            });

            $scope.$watch('sources', function (current) {
                if (!current) { return; }

                var vc_sources = {};
                angular.forEach(current, function(value, key) {
                    if (!value.not_vc_content) {
                        vc_sources[key] = value;
                    }
                });

                $scope.vc_sources = vc_sources;
            });
        }]);

}(this.angular));
