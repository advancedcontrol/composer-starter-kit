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

                    $scope.$watch('audio.virtual_mute', function (val) {
                        if (val === undefined) {
                            return;
                        }

                        muted = val;

                        if (val === true) {
                            $scope.audio.volume = ($scope.audio.min_actual || 0);
                        } else if (previousVolume !== null) {
                            if (previousVolume === ($scope.audio.min_actual || 0)) {
                                // Unmute to 50% if muted by volume === vol min
                                $scope.audio.volume = Math.ceil(($scope.audio.max_actual || 100) / 2);
                            } else {
                                $scope.audio.volume = previousVolume;
                            }
                        }
                    });

                    $scope.$watch('audio.volume', function (val) {
                        if (!muted && val !== undefined) {
                            previousVolume = val;

                            if (val === ($scope.audio.min_actual || 0)) {
                                $scope.audio.virtual_mute = true;
                            } else {
                                $scope.audio.virtual_mute = false;
                            }
                        } else {
                            muted = false;
                        }
                    });
                }
            };
        }])

        .controller('JointAudioCtrl', [
            '$scope',

        function ($scope) {
            var set_on_load = false,
                audio = {},
                shared = {},
                isNum = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                },
                check_level = function (level) {
                    var min = audio.min_actual,
                        max = audio.max_actual,
                        percent;

                    // Prevent a feedback loop due to value rounding
                    if (shared.volume && convert_level(shared.volume) === level)
                        return;

                    if (isNum(max) && isNum(min)) {
                        percent = 100 * (level - min) / (max - min);
                        shared.volume = percent;
                    }
                },
                convert_level = function (percent) {
                    var min = audio.min_actual,
                        max = audio.max_actual,
                        value;

                    if (isNum(max) && isNum(min)) {
                        value = ((max - min) * (percent / 100)) + min;
                        return Math.round(value);
                    }
                };


            $scope.audio = audio;
            $scope.shared = shared;


            $scope.$watch('audio.volume', function (level) {
                // Local Change
                if (isNum(level)) {
                    check_level(level);
                }
            });

            $scope.$watch('shared.volume', function (level) {
                // Local Change
                if (isNum(level)) {
                    audio.volume = convert_level(level);
                }
            });


            $scope.$watch('audio.devmin', function (level) {
                // Local Change
                if (isNum(level) && !isNum(audio.min)) {
                    audio.min_actual = level;
                }
            });

            $scope.$watch('audio.devmax', function (level) {
                // Local Change
                if (isNum(level) && !isNum(audio.max)) {
                    audio.max_actual = level;
                }
            });

            $scope.$watch('audio.min', function (level) {
                // Local Change
                if (isNum(level)) {
                    audio.min_actual = level;
                }
            });

            $scope.$watch('audio.max', function (level) {
                // Local Change
                if (isNum(level)) {
                    audio.max_actual = level;
                }
            });

            // ---------------------------------------------
            // This tracks the current source for Analytics:
            // ---------------------------------------------
            $scope.$watch('source.source', function (source) {
                if (source) {
                    $scope.$emit('$track', 'present', $scope.output.$key, source);
                }
            });

        }]);

}(this.angular));
