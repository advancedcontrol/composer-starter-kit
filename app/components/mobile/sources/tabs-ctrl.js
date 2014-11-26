(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('TabsCtrl', [
            '$scope',
            '$rootScope',

        function ($scope, $rootScope) {

            // Updates the currently selected source
            $scope.showTab = function (tab) {
                $rootScope.$broadcast('updateTab', tab);
            };

            $scope.$on('updateTab', function (event, tab) {
                $scope.tab = tab;
            });
        }]);

}(this.angular));
