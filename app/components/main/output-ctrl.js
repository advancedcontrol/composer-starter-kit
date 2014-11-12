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
                        } else {
                            // We want to present the display
                            $scope.coModuleInstance.$exec('present', source, $scope.output.$key);
                            $scope.source = {
                                source: $scope.selectedSource.source,
                                title: $scope.selectedSource.title,
                                type: $scope.selectedSource.type
                            };
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
                            if (!inner.hasClass('enable'))
                                inner.addClass('enable');

                            if (pulsing) {
                                queued = true;
                            } else {
                                animate();
                            }
                        } else {
                            queued = false;
                            if (pulsing) {
                                inner.removeClass('enable');
                            }
                        }
                    });

                }
            };
        }]);

}(this.angular));
