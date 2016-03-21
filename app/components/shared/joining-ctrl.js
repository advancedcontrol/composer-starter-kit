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

            $scope.$watch('joined.initiator', function (newId) {
                if (newId && $scope.controlSystem !== newId)
                    $scope.showModal('notify_joining');
                else
                    $scope.closeModal('notify_joining');
            });

        }])


        .controller('BlindCtrl', [
            '$scope',

        function ($scope) {

            $scope.blindChanged = function () {
                var blind = $scope.blind,
                    args = [blind.func];

                blind.args.forEach(function (arg) {
                    args.push(arg);
                });

                args.push($scope.state);

                $scope.coModuleInstance.$exec.apply($scope.coModuleInstance, args);
            };

        }]);

}(this.angular));
