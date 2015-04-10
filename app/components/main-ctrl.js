(function (angular) {
    'use strict';
    var PER_PAGE = 9;

    angular.module('AcaEngine')
        .controller('MainCtrl', [
            '$scope',
            '$http',
            '$location',

            function ($scope, $http, $location) {
                // disk space remaining
                $scope.remaining = 'unknown';

                $http.get('http://cam10.cams.vl8.ad.life.unsw.edu.au:4567/remaining.json').success(
                    function(data, status, headers, config) {
                        $scope.remaining = data.remaining;
                    }
                );

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

                var pageNum = $location.search().page;
                if (pageNum)
                    $scope.page = parseInt(pageNum, 10);
                else
                    $scope.page = 1;

                var start = ($scope.page - 1) * PER_PAGE;
                $scope.currentSystems = $scope.systems.slice(start, start + PER_PAGE);

                $scope.gotoPage = function(num) {
                    if ($scope.page == num)
                        return;
                    $location.path($location.path()).search({page: num}).replace();
                    window.location.reload();
                }

                // full screen images are shown on page in an image tag to work
                // around Chrome not understanding how to deal with mjpeg
                $scope.fullImageURL = $location.search().imageurl;

                $scope.showFullImage = function(cindex, cam) {
                    var url = "http://cam" + cindex + ".cams.vl8.ad.life.unsw.edu.au:8080/camera/" + cam + "/full";
                    $location.path($location.path()).search({imageurl: url}).replace();
                    window.location.reload();
                }
            }
        ]);

}(this.angular));
