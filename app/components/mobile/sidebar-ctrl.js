(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('SidebarCtrl', [
            '$animation',
            '$nextFrame',
            '$scope',
            '$timeout',
            '$window',
        function ($animation, $nextFrame, $scope, $timeout, $window) {
            var elWindow = angular.element($window),
                elContent,
                navState = {},
                navTimeout,
                navAnimating = false,
                navStartAnimating = function () {
                    navAnimating = true;
                    $scope.navAnimate = true;

                    // Cancel any failsafe animation end events
                    if (navTimeout !== undefined) {
                        $timeout.cancel(navTimeout);
                        navTimeout = undefined;
                    }

                    // A failsafe animation-end event for IE9
                    navTimeout = $timeout(navChangeComplete, 350);
                },
                navChangeComplete = function () {
                    navTimeout = undefined;
                    
                    if (navAnimating) {
                        navUpdatePos('');
                        navAnimating = false;
                        $scope.navAnimate = false;
                        $scope.navDecorate = $scope.navOpen;
                        $scope.$broadcast('navState', $scope.navOpen);
                    }
                },
                navUpdatePos = function (pos) {
                    elContent.css({
                        '-webkit-transform': pos,
                        '-moz-transform': pos,
                        '-ms-transform': pos,
                        '-o-transform': pos,
                        'transform': pos
                    });
                };

            $scope.navAnimate = false;
            $scope.navOpen = false;
            $scope.navDecorate = false;


            elContent = angular.element('article > header, article > div#mobile-sources');


            // helper functions for setting classes
            $scope.toggleNav = function() {
                navStartAnimating();
                $scope.navDecorate = true;

                $nextFrame().then(function () {
                    $scope.navOpen = !$scope.navOpen;
                    $scope.$broadcast('navChanging');
                });
            };

            $scope.hideNav = function() {
                if ($scope.navOpen) {
                    navStartAnimating();
                    $scope.navOpen = false;
                    $scope.$broadcast('navChanging');
                }
            };

            $scope.showNav = function() {
                if (!$scope.navOpen) {
                    navStartAnimating();
                    $scope.navDecorate = true;

                    // This fixes firefox who requires the navigation to
                    // be decorated before it will animate
                    $nextFrame().then(function () {
                        $scope.navOpen = true;
                        $scope.$broadcast('navChanging');
                    });
                }
            };

            $scope.$on('navHide', function () {
                $nextFrame().then(function () {
                    $scope.hideNav();
                });
            });
            $scope.$on('navShow', function () {
                $nextFrame().then(function () {
                    $scope.showNav();
                });
            });



            // Nav Dragging Code --------------------------------

            angular.element('article').on(
                'webkitTransitionEnd mozTransitionEnd msTransitionEnd oTransitionEnd transitionend',
                'header, div#mobile-sources',
            function(e) {
                if (navAnimating && e.currentTarget === elContent[0]) {
                    if (navTimeout !== undefined) {
                        $timeout.cancel(navTimeout);
                    }
                    $scope.$apply(navChangeComplete);
                }
            });


            $scope.dragStartNav = function($event) {
                // Prevent drag events in desktop mode
                if (navState.dragging) {
                    $event.stopDetect();
                    return;
                }

                $scope.$broadcast('navChanging');

                // Cancel any failsafe animation end events
                if (navTimeout !== undefined) {
                    $timeout.cancel(navTimeout);
                    navTimeout = undefined;
                }

                navAnimating = false;
                $scope.navAnimate = false;
                $scope.navDecorate = true;

                // Keep track of state for default actions and limits
                navState.dragging = true;
                navState.wasOpen = $scope.navOpen;
                navState.maxMovement = $window.Math.round(elWindow.width() * 0.9);
                navState.minMovement = 0;
                navState.threshold = navState.maxMovement / 3;
            };

            $scope.dragEndNav = function() {
                $nextFrame().then(function () {
                    navState.dragging = false;
                
                    if (navState.thresholdReached) {
                        $scope.navOpen = !navState.wasOpen;
                    } else {
                        $scope.navOpen = navState.wasOpen;
                    }

                    // Turn off animations if we were already at the max or min point
                    if (navState.position === navState.maxMovement || navState.position === navState.minMovement) {
                        // Same as animation event ended
                        navAnimating = true;
                        navChangeComplete();
                    } else {
                        navStartAnimating();

                        $nextFrame().then(function () {
                            if ($scope.navOpen) {
                                navUpdatePos('translate(-90%, 0)');
                            } else {
                                navUpdatePos('');
                            }
                        });
                    }
                });
            };

            $scope.dragNav = $animation(function update($event) {
                // Drag calculation here
                if (navState.wasOpen) {
                    navState.position = $event.deltaX;
                } else {
                    navState.position = -$event.deltaX;
                }

                if (navState.position < navState.minMovement) {
                    navState.position = navState.minMovement;
                } else if (navState.position > navState.maxMovement) {
                    navState.position = navState.maxMovement;
                }

                if (navState.position > navState.threshold) {
                    navState.thresholdReached = true;
                } else {
                    navState.thresholdReached = false;
                }
            }, function apply() {
                if (navState.dragging) {
                    var pos;

                    // Dragging still occurring
                    if (navState.wasOpen) {
                        pos = navState.maxMovement - navState.position;
                    } else {
                        pos = navState.position;
                    }

                    navUpdatePos('translate(-' + pos + 'px, 0)');
                }
            });
            // END Nav Dragging --------------------------------
        }]);

}(this.angular));
