(function (angular) {
    'use strict';

    angular.module('AcaEngine')

        .directive('display', [
            '$animate',
            '$timeout',
        function ($animate, $timeout) {
            return {
                scope: false,
                restrict: 'A',
                link: function ($scope, element, attrs) {

                    // Breaks module name into its components
                    // We need module name + module index (see settings.js)
                    $scope.device = getModuleParts($scope.output.$key);

                    // Mute / present the source
                    $scope.presetSource = function () {
                        var source = $scope.selectedSource.source;

                        if ($scope.source && source === $scope.source.source) {
                            // We want to mute the display
                            $scope.coModuleInstance.$exec('video_mute', $scope.output.$key);
                            $scope.source = {source: 'none'};
                            $scope.$emit('$track', 'present', $scope.output.$key, 'mute');
                        } else {
                            // We want to present the display
                            $scope.coModuleInstance.$exec('present', source, $scope.output.$key);
                            $scope.$emit('$track', 'present', $scope.output.$key, source);

                            // This is our guess as to what the server will respond with
                            // We set it here to keep the interface reactive
                            $scope.source = {
                                source: $scope.selectedSource.source,
                                title: $scope.selectedSource.title,
                                type: $scope.selectedSource.type
                            };

                            // Force stop pulsing before the animation is complete
                            if (pulsing) {
                                queued = false;
                                inner.removeClass('enable');
                            }
                        }
                    };

                    // --------------------
                    // PULSING OUTPUTS CODE
                    // Pulse the outputs that don't match the currently selected input
                    var pulsing = false,
                        queued = false,
                        inner = element.find('div.inner'),
                        animate = function () {
                            pulsing = true;

                            // Use animation libraries to add the class
                            // However we don't want to animate the removal
                            $animate.addClass(inner, 'pulse').then(function () {
                                inner.removeClass('pulse');
                                if (queued) {
                                    queued = false;
                                    $timeout(animate, 0);
                                } else {
                                    pulsing = false;
                                }
                            });
                        };

                    $scope.$watch('selectedSource.source', function (val) {
                        if (!$scope.source || val !== $scope.source.source) {

                            // Re-enable pulsing if it was force stopped
                            if (!inner.hasClass('enable')) {
                                inner.addClass('enable');
                            }

                            // Queue another round of pulsing if one is in progress
                            if (pulsing) {
                                queued = true;
                            } else {
                                animate();
                            }
                        } else if (pulsing) {
                            // Force stop pulsing before the animation is complete
                            queued = false;
                            inner.removeClass('enable');
                        }
                    });

                }
            };
        }]);

}(this.angular));
