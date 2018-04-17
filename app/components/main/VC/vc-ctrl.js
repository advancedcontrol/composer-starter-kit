(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('VcCtrl', [
            '$scope',
            '$timeout',

        function ($scope, $timeout) {
            var vc = {},
                searchTimer = null,
                noSearch = false;
            $scope.vc = vc;

            vc.show_directory = false;

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
                vc.dial_string = vc.search_string

                if (vc.status.direction) {
                    vc.module.$exec('send_DTMF', num);
                }
            };

            $scope.focusInput = function () {
                $('div.number input').focus();
            };

            $scope.inputFocused = function () {
                noSearch = false;
                vc.show_directory = true;
            };

            // -----------------
            // VC dialing string
            // -----------------
            $scope.$watch('vc.search_string', function (val) {
                if (noSearch) {
                    noSearch = false;
                    return;
                }

                if (val !== undefined && vc.bookings_mod) {
                    if (val.length < 3) {
                        vc.results = [];
                        return;
                    }

                    if (searchTimer) { $timeout.cancel(searchTimer); }
                    searchTimer = $timeout(function () {
                        searchTimer = null;
                        vc.bookings_mod.$exec('directory_search', val);
                    }, 1000);

                    delete vc.selected;
                    vc.dial_string = val;
                }
            });

            $scope.$watch('vc.selected', function (val) {
                if (val) {
                    if (val.email) {
                        vc.dial_string = val.name;
                    } else {
                        noSearch = true;
                        vc.search_string = vc.dial_string = val.phone;
                    }
                }
            });
        }]);

}(this.angular));
