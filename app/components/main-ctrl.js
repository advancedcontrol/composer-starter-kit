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

                // camera urls are protected behind one time auth requests. make a request
                // to the api to generate a camera url
                $scope.cameraURLs = {};

                $scope.generateURL = function(ip, view) {
                    console.log('requesting URL for', ip);
                    $http.get('http://vl8.ad.life.unsw.edu.au/api/webcams?camera_ip=' + ip + '&view=' + view)
                    .success(
                        function(data, status, headers, config) {
                            $scope.cameraURLs[ip] = data.url;
                        }
                    );
                }

                // the reception camera is handled specially
                $scope.generateURL('10.213.0.27', 'thumbnail');

                // full screen images are shown on page in an image tag to work
                // around Chrome not understanding how to deal with mjpeg
                $scope.fullImageCam  = $location.search().cam;
                $scope.fullImageRTSP = $location.search().rtsp;
                $scope.fullImageURL  = null;

                if ($scope.fullImageCam) {
                    $http.get('http://vl8.ad.life.unsw.edu.au/api/webcams?camera_ip=' + $scope.fullImageCam + '&view=full')
                    .success(
                        function(data, status, headers, config) {
                            $scope.fullImageURL = data.url;
                        }
                    );
                }

                $scope.showFullImage = function(cam) {
                    var url = $location.path($location.path()).search({cam: cam}).absUrl();
                    var newWindow = window.open(url, '_blank');
                    newWindow.focus();
                }
            }
        ]);

}(this.angular));
