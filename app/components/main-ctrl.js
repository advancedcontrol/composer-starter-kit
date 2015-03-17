(function (angular) {
    'use strict';
    var PER_PAGE = 9;

    angular.module('AcaEngine')
        .controller('MainCtrl', [
            '$scope',

            function ($scope) {
                // The list of systems (listed in settings)
                $scope.systems = window.systemsList;

                // only PER_PAGE systems are shown at once to work around:
                // https://code.google.com/p/chromium/issues/detail?id=362004
                $scope.currentSystems = [];

                // There is also a connection limit per page
                var cam = 1;
                $scope.nextCam = function () {
                    cam = cam + 1;
                    return cam;
                };

                // ng-repeat only works over collections
                $scope.pageNums = [];
                var numPages = Math.ceil($scope.systems.length / PER_PAGE);
                for (var i = 1; i <= numPages; i++)
                    $scope.pageNums.push(i);

                $scope.gotoPage = function(pageNum) {
                    if ($scope.page == pageNum)
                        return;
                    $scope.page = pageNum;
                    var start = (pageNum - 1) * PER_PAGE;
                    $scope.currentSystems = $scope.systems.slice(start, start + PER_PAGE);
                }

                $scope.gotoPage(1);
            }
        ]);

}(this.angular));
