(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$scope',
            '$rootScope',

        function ($scope, $rootScope) {
            // Provide analytics tracking data
            $scope.$emit('$track', 'state', 'online', 'desktop');

            var selected = $scope.selected = {};

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
                selected.camera = $scope.sources[src];
                selected.camera.source = src;
                $scope.coModuleInstance.$exec('select_camera', src, selected.camera.vc_input);
            };

            $scope.$watch('selected.camera_src', function (current) {
                if (current && $scope.sources) {
                    selected.camera = $scope.sources[current];
                }
            });

            // update the source
            $scope.$on('updateSource', function (event, source) {
                $scope.selectedSource = source;
            });

            $scope.$watch('sources', function (current) {
                if (!current) { return; }

                if (selected.camera_src) {
                    selected.camera = $scope.sources[selected.camera_src];
                    selected.camera.source = selected.camera_src;
                }

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
