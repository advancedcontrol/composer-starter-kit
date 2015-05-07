(function (window, angular) {
    'use strict';


    window.systemsList = window.systemsList || [
        'sys_7-10', // 802 - Trauma 1
        'sys_7-11', // 803 - Trauma 2
        'sys_7-12', // 806 - T01
        'sys_7-13', // 807 - T02
        'sys_7-14', // 808 - T03
        'sys_7-15', // 809 - T04
        'sys_7-18', // 810 - T05
        'sys_7-19', // 824 - T06
        'sys_7-1A', // 823 - T07
        'sys_7-1B', // 811 - T08
        'sys_7-1C', // 812 - T09
        'sys_7-1D', // 813 - Family 1
        'sys_7-1E', // 814 - Family 2
        'sys_7-1F', // 820 - Group 1
        'sys_7-1G', // 819 - Group 2
        'sys_7-1H', // 827 - Neuro 1
        'sys_7-1I'  // 827A - Neuro 2
    ];


    angular.module('AcaEngine')

        .config([
            '$compileProvider'

        function ($compileProvider) {
            // Allow the RTSP links to be displayed
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|rtsp):/);
        }])

        .run([
            '$window',
            'cacheman',
            'User',
            '$rootScope',
            '$location',
            '$conductor',

        function ($window, cacheman, User, $rootScope, $location) {
            User.get_current().then(function (user) {
                // admins are allowed access to all cameras
                if (user.sys_admin || user.support || user.supervisor) {
                    $rootScope.authorised = true;

                // other users can see the waiting room camera
                } else if ($location.search().cam == '10.213.0.27') {
                    $rootScope.authorised = true;

                // all other requests are denied
                } else {
                    document.location = document.location.pathname + '403.html';
                }
            });

            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
