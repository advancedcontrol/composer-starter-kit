(function (angular) {
    'use strict';

    // Define the controller
    angular.module('AcaEngine')
    
        .controller('JoiningCtrl', [
            '$scope',

        function ($scope) {

            $scope.joiner = {
                selected: {}
            };
            $scope.joinRooms = function () {
                var rooms = [];

                angular.forEach($scope.joiner.selected, function (value, key) {
                    if (value === true) {
                        rooms.push(key);
                    }
                });

                rooms.unshift('join');
                $scope.coModuleInstance.$exec.apply($scope.coModuleInstance, rooms);
            };

        }]);

}(this.angular));
