(function (angular) {
    'use strict';

    angular.module('AcaEngine')

        .controller('MainCtrl', [
            '$scope',

            function ($scope) {
                // TODO: load list of systems properly
                $scope.systems = [
                    'sys-B0',
                    'sys-B1',
                    'sys-B2',
                    'sys-B3',
                    'sys-B4',
                    'sys-B5',
                    'sys-B6',
                    'sys-B7',
                    'sys-B8'
                ];
            }
        ]);

}(this.angular));
