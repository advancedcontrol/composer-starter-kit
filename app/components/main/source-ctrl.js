(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$scope',
            '$rootScope',

        function ($scope, $rootScope) {
            // Updates the currently selected source
            $scope.selectSource = function (src) {
                $scope.selectedSource = $scope.sources[src];
                $scope.selectedSource.source = src;

                if ($scope.has_preview) {
                    $scope.coModuleInstance.$exec('preview', $scope.selectedSource.source);
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
