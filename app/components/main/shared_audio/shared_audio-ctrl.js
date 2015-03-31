(function (angular) {
    'use strict';


    // Define the controller
    angular.module('AcaEngine')
    
        .controller('SharedAudioCtrl', [
            '$scope',
            '$rootScope',
            '$timeout',

        function ($scope, $rootScope, $timeout) {

            var track = {},
                master_volume = function (newVol) {
                    if (newVol !== track.master_remote) {
                        $scope.coModuleInstance.$exec('master_volume', newVol);
                    }
                };

            $scope.track = track;

            $scope.$watch('track.master_local', function (newVal) {
                if (newVal !== undefined) { // 0 is falsey
                    master_volume(newVal);
                }
            });

            $scope.$watch('track.master_remote', function (newVal) {
                if (newVal !== undefined) { // 0 is falsey
                    track.master_local = newVal;
                }
            });

        }]);

}(this.angular));
