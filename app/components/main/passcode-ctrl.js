(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('PasscodeCtrl', [
            '$scope',

        function ($scope) {
            var currentVal;

            $scope.attempting = false;
            $scope.$watch('access_attempts', function (val) {
                if (val && currentVal !== val && $scope.attempting) {
                    $scope.showModal('bad_passcode');
                }
                
                $scope.attempting = false;
                currentVal = val;
            });
        }]);

}(this.angular));
