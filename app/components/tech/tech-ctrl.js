(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('TechCtrl', [
            '$scope',

        function ($scope) {
            $scope.inputs = ['hdmi', 'vga'];
        }]);

}(this.angular));
