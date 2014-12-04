(function (angular) {
    'use strict';

    angular.module('AcaEngine')
        .directive('joystick', ['$window', '$timeout', '$animation', function($window, $timeout, $animation) {
            return {
                restrict: 'E',
                transclude: false,
                scope: {
                    img: '@',
                    right: '=',
                    left: '=',
                    center: '=',
                    panTilt: '=',
                    refresh: '=?'
                },
                template: '<img style="display: none;" ng-src="{{img}}" ' +
                            'touch-action="none" ' +
                            'drag-begin="dragStart($event)" drag-stop="dragEnd()" ' +
                            'ng-drag="drag($position)" />',
                link: function(scope, element, attrs) {
                    var joy_pan,
                        joy_tilt,

                        // UI Limits
                        width,
                        height,
                        relWidth,
                        relHeight,
                        handleWidth,

                        // Various stalks
                        nobs = element.children(),
                        handle = angular.element(nobs[0]),

                        timer,
                        invert = attrs.hasOwnProperty('invert') && attrs.invert !== 'false',

                        resize = function () {
                            if (scope.left == undefined || scope.right == undefined) { return; }

                            var range = scope.right - scope.left;
                                // range = large - small

                            handle.show();
                                
                            handleWidth = handle.width();
                            width = element.width();
                            height = element.height();

                            relWidth = range / (width - handleWidth);
                            relHeight = range / (height - handleWidth);

                            //relRight = scope.right / (width - handleWidth);

                            handle.css({
                                top: height / 2 - handleWidth / 2,
                                left: width / 2 - handleWidth / 2
                            });
                        },

                        update_position = function () {
                            var pan = parseInt((relWidth * joy_pan)) + scope.left,
                                tilt = parseInt((relHeight * joy_tilt)) + scope.left;

                            if (pan > scope.right) { pan = scope.right; }
                            if (pan < scope.left) { pan = scope.left; }
                            if (tilt > scope.right) { tilt = scope.right; }
                            if (tilt < scope.left) { tilt = scope.left; }

                            if (invert) {
                                tilt = scope.right + scope.left - tilt;
                            }

                            timer = undefined;
                            scope.panTilt = [pan, tilt];
                        };


                    scope.$watch('left', resize);
                    scope.$watch('right', resize);

                    scope.$watch('refresh', function () {
                        $timeout(function () {
                            resize();
                        }, 0, false);
                    });

                    $timeout(function () {
                        resize();
                    }, 0, false);

                    angular.element($window).on('resize', resize);


                    scope.dragStart = function (e) {
                        e.stopPropagation();
                    };

                    scope.dragEnd = function () {
                        if (timer !== undefined) {
                            $timeout.cancel(timer);
                            timer = undefined;
                        }

                        scope.drag.cancel();
                        scope.panTilt = [scope.center, scope.center];

                        handle.css({
                            top: height / 2 - handle.width() / 2,
                            left: width / 2 - handle.width() / 2
                        });
                    };

                    scope.drag = $animation(function apply(pos) {
                        joy_pan = pos.left;
                        joy_tilt = pos.top;
                    }, function compute() {
                        var handleWidth = handle.width();

                        if (joy_pan > (width - handleWidth)) {
                            joy_pan = width - handleWidth;
                        } else if (joy_pan < 0) {
                            joy_pan = 0
                        }

                        if (joy_tilt > (height - handleWidth)) {
                            joy_tilt = height - handleWidth;
                        } else if (joy_tilt < 0) {
                            joy_tilt = 0
                        }

                        handle.css({
                            top: joy_tilt,
                            left: joy_pan
                        });

                        if (timer === undefined) {
                            timer = $timeout(update_position, 200);
                        }
                    });
                }
            };
        }]);

}(this.angular));
