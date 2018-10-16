(function (angular) {
    'use strict';

    angular.module('AcaEngine', [
        'ngSanitize', // AngularJS text sanitation support
        'ngAnimate',  // AngularJS Animation support
        'angular-virtual-keyboard',

        'ngGesture',  // Gesture events
        'coAnimate',  // Key frame animations
        'coUtils',    // UI Widgets
        'Composer'    // Resources + OAuth + ACA Engine API
    ])

    // Allow pan-y by default
    .config([
        '$gestureProvider',
    function(gesture) {
        gesture.setGestureDefaults({
            touchAction: 'pan-y'
        });
    }])

    // This is our dom-ready function
    .run([
        '$window',
        '$document',
        '$rootScope',
        '$timeout',
        '$interval',

    function($window, $document, $rootScope, $timeout, $interval) {
        var elWindow = angular.element($window),
            elHtml = angular.element('html'),
            elBody = angular.element('body'),

            setHeightWidth = function() {
                    elHtml
                        .width('100%')        // Fix manual override we made earlier
                        .height('100%');

                    // Revert back to a general viewport
                    angular.element('meta[name="viewport"]').attr('content', 'user-scalable=no, width=device-width, minimum-scale=0.25, maximum-scale=1.6');

                    // We no longer need to listen for these events
                    elWindow
                        .off('orientationchange', setHeightWidth)
                        .off('resize', setHeightWidth);
            },

            isRunningStandalone = function() {
                try {
                    return (window.matchMedia('(display-mode: standalone)').matches);
                } catch (e) {
                    return false;
                }
            };

        // Ang Smith (iOS god)
        if ($document.width() < $window.innerWidth) {
            // Detects and fixes a bug in iOS where the iPad makes all pages
            // 768px wide and in portrait mode by default (WTF)

            // This viewport fix ensures that once we set the width manually a resize
            // triggered by a scroll bounce does not return to the previous state
            angular.element('meta[name="viewport"]').attr('content', 'user-scalable=no, width=' + $window.innerWidth + ', minimum-scale=1, maximum-scale=1');
            elHtml
                .width($window.innerWidth + 'px')
                .height($window.innerHeight + 'px');

            // Undo these ludicrous changes as soon as iOS is ready to allow it
            elWindow
                .on('orientationchange resize', setHeightWidth);
        }

        // Support iOS and Android Application mode
        if ($window.navigator.standalone) {
            elBody.addClass('ios-app-mode');

            if ($window.history.length > 1) {
                $rootScope.show_back_btn = true;
            }
        } else if (isRunningStandalone()) {
            if ($window.history.length > 1) {
                $rootScope.show_back_btn = true;
            }
        }

        $rootScope.goback = function () {
            $window.history.go(-1);
            return false;
        };

        $rootScope.width = $window.innerWidth;
        $rootScope.height = $window.innerHeight;

        elWindow.on('orientationchange resize', function () {
            $rootScope.width = $window.innerWidth;
            $rootScope.height = $window.innerHeight;
            $rootScope.$apply();
        });

        //
        // Remove the loading indicator
        //
        $rootScope.loaded = true;

        //
        // Try to ensure we are always connected
        //
        var refreshTimer = null;
        $rootScope.$watch('$composerConnected', function (value) {
            if (refreshTimer) {
                $timeout.cancel(refreshTimer);
            }

            if (!value) {
                // Reload the page after 3min of being disconnected
                refreshTimer = $timeout(function () {
                    $window.location.reload();
                }, 180000);
            }
        });

        //
        // Prevent iOS from going into deep sleep
        //
        var keepAlive = angular.element('<div class="keep-alive" />');
        $interval(function () {
            // Modifies the DOM
            elBody.append(keepAlive);

            $timeout(function () {
                keepAlive.detach();
            }, 15000);
        }, 30000);
    }])


    // This is our system ID and authentication function
    .run([
        '$window',
        '$location',
        '$rootScope',
        'cacheman',
        '$timeout',
        '$comms',

    function ($window, $location, $rootScope, cacheman) {

        // Grab the system id from the URL
        $rootScope.$watch(function () {
            return $location.search();
        }, function (value) {
            if (value.ctrl === '') {
                // default system?
                $rootScope.noSystemSelected = true;
            } else {
                $rootScope.noSystemSelected = false;
                $rootScope.controlSystem = value.ctrl;
            };
        });

        // Refresh the UI if an update is detected
        // This promise is resolved after a new version
        // of the UI has been downloaded and cached
        cacheman.readyCallback.then(function () {
            $window.location.reload();
        });
    }]);

}(this.angular));
