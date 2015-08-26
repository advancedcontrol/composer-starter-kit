(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .directive('volumeMute', [

        function () {
            return {
                scope: false,
                restrict: 'A',
                link: function ($scope) {
                    var previousVolume = null,
                        muted = false;

                    $scope.$watch('mute', function (val) {
                        if (val === undefined) {
                            return;
                        }

                        muted = val;

                        if (val === true) {
                            $scope.volume = ($scope.vol_min || 0);
                        } else if (previousVolume !== null) {
                            if (previousVolume === ($scope.vol_min || 0)) {
                                // Unmute to 50% if muted by volume === vol min
                                $scope.volume = Math.ceil(($scope.vol_max || 100) / 2);
                            } else {
                                $scope.volume = previousVolume;
                            }
                        }
                    });

                    $scope.$watch('volume', function (val) {
                        if (!muted && val !== undefined) {
                            previousVolume = val;

                            if (val === ($scope.vol_min || 0)) {
                                $scope.mute = true;
                            } else {
                                $scope.mute = false;
                            }
                        } else {
                            muted = false;
                        }
                    });
                }
            };
        }]);

}(this.angular));
