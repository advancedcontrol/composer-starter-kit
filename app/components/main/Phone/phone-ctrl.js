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
                phone.settings = val;
            });

            $scope.$watch('phone.dsp_connected', function (val) {
                if (!val) return;
                $scope.coModuleInstance.$exec('phone_watch', phone.settings.query_ids);
            });

            $scope.addNum = function (val) {
                if (phone.number && phone.number.length)
                        phone.number += val;
                    else
                        phone.number = '' + val;

                if (phone.ringing || phone.incall) {
                    if (sendSpace) {
                        val = val + ' ';
                    }
                    $scope.coModuleInstance.$exec('set_string', $scope.phone_settings.dtmf, val);
                    sendSpace = !sendSpace;
                }
            };

            $scope.backspace = function () {
                phone.number = phone.number.substring(0, phone.number.length - 1);
            };

            $scope.clear = function () {
                phone.number = '';
            };
        }]);

}(this.angular));
