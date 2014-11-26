(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$scope',

        function ($scope) {
            // Provides access to the current source
            $scope.selectedSource = source;

            // Updates the currently selected source
            $scope.selectSource = function (src) {
                angular.extend(source, $scope.sources[src]);
                source.source = src;
            };

            // TODO:: Source to name mapping!
        }]);

}(this.angular));
