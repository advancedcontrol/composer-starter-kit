(function (angular) {
    'use strict';

    angular.module('AcaEngine')

        .controller('MainCtrl', [
            '$scope',

            function ($scope) {
                // ---------------------------------------------
                // pin code
                // ---------------------------------------------
                $scope.validated = false;
                $scope.incorrect = false;
                $scope.pin = '';

                $scope.addToPin = function(char) {
                    // all pin codes are 4 characters. if there are 3 characters
                    // and a fourth is being entered, validate the pin. if 4
                    // characters are present, overwrite the pin from the beginning
                    // (i.e the pin was entered and invalid, new characters are
                    // intended to be the start of a new entry)
                    if ($scope.pin.length <= 3) {
                        $scope.pin += char.toString();
                    } else {
                        $scope.pin = char.toString();
                        $scope.validated = false;
                        $scope.incorrect = false;
                    }
                }

                $scope.clearPin = function() {
                    $scope.pin = '';
                    $scope.incorrect = false;
                    $scope.validated = false;
                }

                $scope.validate = function() {
                    // tours user
                    if ($scope.pin == '1234') {
                        $scope.validated = 'tours';
                        $scope.coModuleInstance.$exec('projector_on');

                    // tech / admin user
                    } else if ($scope.pin == '1988') {
                        $scope.validated = 'tech';

                    } else {
                        $scope.incorrect = true;
                        $scope.validated = false;
                    }

                    if ($scope.validated)
                        $scope.incorrect = false;
                }

                $scope.$watch('pin', function(val) {
                    if (val.length == 4)
                        $scope.validate();
                });
            }
        ]);

}(this.angular));
