(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('PhoneCtrl', [
            '$scope',
            '$timeout',

        function ($scope, $timeout) {
            var phone = {},
                sendSpace = false;
            $scope.phone = phone;

            $scope.$watch('phone_settings', function (val) {
                if (!val) return;

                $timeout(function () {
                    $scope.coModuleInstance.$exec('phone_watch', val.query_ids);
                }, 200);
            });

            $scope.addNum = function (val) {
                if (phone.ringing || phone.incall) {
                    if (sendSpace) {
                        val = val + ' ';
                    }
                    $scope.coModuleInstance.$exec('set_string', $scope.phone_settings.dtmf, val);
                    sendSpace = !sendSpace;
                } else {
                    if (phone.number && phone.number.length)
                        phone.number += val;
                    else
                        phone.number = '' + val;
                }
            };

            $scope.backspace = function () {
                phone.number = phone.number.substring(0, phone.number.length - 1);
            };
        }]);

}(this.angular));
