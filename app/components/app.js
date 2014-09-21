(function (angular) {
    'use strict';

    angular.module('AcaEngine', [
        'ngSanitize', // AngularJS text sanitation support
        'ngAnimate',  // AngularJS Animation support

        'ngGesture',  // Gesture events
        'coUtils',    // UI Widgets
        'Composer'    // Resources + OAuth + ACA Engine API
    ])

    // This is our dom-ready function
    .run([
        '$window',
        '$document',
        '$rootScope',

    function($window, $document, $rootScope) {
        var elWindow = angular.element($window),
            elHtml = angular.element('html'),

            setHeightWidth = function() {
                    elHtml
                        .width('100%')        // Fix manual override we made earlier
                        .height('100%');

                    // Revert back to a general viewport
                    angular.element('meta[name="viewport"]').attr('content', 'user-scalable=no, width=device-width, minimum-scale=0.25, maximum-scale=1.6');

                    // We no longer need to listen for these events
                    elWindow
                        .unbind('orientationchange', setHeightWidth)
                        .unbind('resize', setHeightWidth);
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
                .bind('orientationchange resize', setHeightWidth);
        }

        // Support iOS Application mode
        if ($window.navigator.standalone) {
            angular.element('body').addClass('ios-app-mode');
        }

        // Remove the loading indicator
        $rootScope.ready = true;
    }]);

}(this.angular));
