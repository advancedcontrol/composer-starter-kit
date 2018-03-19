(function (angular) {
    'use strict';

    angular.module('AcaEngine')
    
        .controller('VcCtrl', [
            '$scope',
            '$timeout',

        function ($scope, $timeout) {
            var vc = {},
                searchTimer = null;
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
                if (!val) return;
                $scope.coModuleInstance.$exec('vc_content', $scope.selectedSource.source, val);
            });

            $scope.$watch('vc.status', function (stat) {
                if (stat && stat.callbacknumber) {
                    vc.search_string = stat.callbacknumber;
                    vc.dial_string = stat.callbacknumber;
                }
            });


            // -----------------
            // VC dialing string
            // -----------------
            $scope.$watch('vc.search_string', function (val) {
                if (val !== undefined && vc.module) {

                    if (val.length < 3) {
                        vc.results = [];
                        return;
                    }

                    if (searchTimer) { $timeout.cancel(searchTimer); }
                    searchTimer = $timeout(function () {
                        searchTimer = null;
                        vc.module.$exec('search', val);
                    }, 1000);

                    delete vc.selected;
                    vc.dial_string = val;
                }
            });

            $scope.$watch('vc.selected', function (val) {
                if (val) {
                    vc.dial_string = val.name;
                }
            });
        }]);

}(this.angular));
