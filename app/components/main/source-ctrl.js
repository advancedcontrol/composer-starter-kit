(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$scope',

        function ($scope) {
            // Provides access to the current source
            $scope.selectedSource = source;
            $scope.validated = false;
            $scope.incorrect = false;
            $scope.pin = null;

            // Updates the currently selected source
            $scope.selectSource = function (src) {
                angular.extend(source, $scope.sources[src]);
                source.source = src;

                $scope.coModuleInstance.$exec('present', $scope.tab);
            };

            $scope.currentTab = function (tab) {
                $scope.coModuleInstance.$exec('tab', tab);
            };

            $scope.validate = function(event) {
                if ($scope.pin == '1234') {
                    event.target.blur();
                    $scope.validated = true;
                    $scope.incorrect = false;
                } else {
                    $scope.incorrect = true;
                }
            }

            // TODO:: Source to name mapping!
        }]);

}(this.angular));
