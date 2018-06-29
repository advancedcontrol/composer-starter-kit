(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('VcCtrl', [
            '$scope',
            '$timeout',

        function ($scope, $timeout) {
            var vc = {}, noSearch = false;
            $scope.vc = vc;

            $scope.$watch('vc.accept_reject', function (val) {
                if (val === true) {
                    $scope.showModal('vc_accept');
                } else if (val === false) {
                    $scope.closeModal('vc_accept');
                }
            });

            // -----------------------
            // Content Select Feedback
            // -----------------------
            $scope.$watch('vc.current_content', function (val) {
                if (!val) return;
                vc.content_source = val;
            });

            $scope.$watch('vc.content_source', function (val) {
                if (!val && val !== "") return;
                $scope.coModuleInstance.$exec('vc_content', $scope.selectedSource.source, val);
            });

            $scope.$watch('vc.status', function (stat) {
                if (stat && stat.callbacknumber) {
                    vc.search_string = stat.callbacknumber;
                    vc.dial_string = stat.callbacknumber;
                }
            });

            $scope.dial = function (num) {
                noSearch = true;
                vc.search_string = (vc.search_string || '') + num;
                vc.dial_string = vc.search_string;

                if (vc.status.direction) {
                    vc.module.$exec('send_DTMF', num);
                } else {
                    delete vc.selected;
                }
            };

            $scope.backspace = function () {
                noSearch = true;
                delete vc.selected;
                vc.search_string = (vc.search_string || '');
                vc.search_string = vc.search_string.substring(0, vc.search_string.length - 1);
                vc.dial_string = vc.search_string;
            };

            $scope.clear = function () {
                noSearch = true;
                delete vc.selected;
                vc.dial_string = vc.search_string = '';
            };

            $scope.disconnect = function () {
                vc.module.$exec('call', 'disconnect');
                vc.module.$exec('clear_search_results');
            };

            // -----------------
            // VC dialing string
            // -----------------
            $scope.$watch('vc.search_string', function (val) {
                if (noSearch) {
                    noSearch = false;
                    return;
                }

                if (val !== undefined && vc.module) {
                    vc.module.$exec('search', val);

                    delete vc.selected;
                    vc.dial_string = val;
                }
            });

            $scope.$watch('vc.selected', function (val) {
                if (val) {
                    vc.dial_string = val.methods[0].number;
                }
            });
        }]);

}(this.angular));
