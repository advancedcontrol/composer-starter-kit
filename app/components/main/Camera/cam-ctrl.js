(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('CamCtrl', [
            '$scope',

        function ($scope) {
            $scope.panTilt = null;
            $scope.$watch('panTilt', function (val) {
                if (val) {
                    val = angular.copy(val);
                    val.unshift('joystick');
                    $scope.coModuleInstance.$exec.apply(
                        $scope.coModuleInstance,
                        val
                    );
                }
            });
        }]);

}(this.angular));
