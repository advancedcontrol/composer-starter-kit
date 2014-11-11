(function (angular) {
    'use strict';

    var grabParts = function (key) {
        var parts = key.split('_'),
            index = parseInt(parts[parts.length - 1], 10),
            module;

        parts.splice(parts.length - 1, 1);
        module = parts.join('_');

        return {
            module: module, 
            index: index
        };
    };

    angular.module('AcaEngine')
    
        .controller('OutputCtrl', [
            '$scope',

        function ($scope) {
            // Breaks module name into its components
            // We need module name + module index
            $scope.device = grabParts($scope.output.$key);
        }]);

}(this.angular));
