(function (angular) {
    'use strict';

    angular.module('AcaEngine')


        .controller('StateCtrl', ['$scope', function ($scope) {
            $scope.state = 'shutdown';
            $scope.setState = function (val) {
                $scope.state = val;
            };
        }])

        .controller('MainCtrl', [
            '$scope',
            '$timeout',

            function ($scope, $timeout) {
                var startTimeout = null;

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
                    if ($scope.pin === $scope.tours_pin) {
                        $scope.validated = 'tours';
                        $scope.coModuleInstance.$exec('powerup');

                    // tech / admin user
                    } else if ($scope.pin === $scope.tech_pin) {
                        $scope.validated = 'tech';

                    } else {
                        $scope.incorrect = true;
                        $scope.validated = false;
                    }

                    if ($scope.validated) {
                        $timeout.cancel(startTimeout);
                        startTimeout = null;
                        $scope.incorrect = false;
                    }
                }

                $scope.$watch('pin', function(val) {
                    if (!val || !$scope.tours_pin || !$scope.tech_pin) {
                        return;
                    }

                    if (val.length === $scope.tours_pin.length || val.length === $scope.tech_pin.length)
                        $scope.validate();
                });

                $scope.$watch('state', function (val) {
                    if (val === 'online') {
                        startTimeout = $timeout(function () {
                            state = 'shutdown';
                            startTimeout = null;
                        }, 60000);
                    } else if (startTimeout) {
                        $timeout.cancel(startTimeout);
                        startTimeout = null;
                    }
                });
            }
        ]);

}(this.angular));
