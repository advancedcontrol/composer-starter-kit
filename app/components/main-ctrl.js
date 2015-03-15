(function (angular) {
    'use strict';

    angular.module('AcaEngine')

        .controller('MainCtrl', [
            '$scope',

            function ($scope) {
                // The list of systems (listed in settings)
                $scope.systems = window.systemsList;
            }
        ]);

}(this.angular));
