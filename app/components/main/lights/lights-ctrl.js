(function (angular) {
    'use strict';


    // Define the controller
    angular.module('AcaEngine')
    
        .controller('BasicLightsCtrl', [
            '$scope',
            '$rootScope',
            '$timeout',

        function ($scope, $rootScope, $timeout) {

            $scope.$watch('fader.level', function (newVal) {
                if (newVal !== undefined) { // 0 is falsey
                    $scope.coModuleInstance.$exec('perform_fade', $scope.fader.name, newVal);
                }
            });

        }]);

}(this.angular));
