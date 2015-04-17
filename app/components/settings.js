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
    
        // The authentication service doesn't have to be hosted on the same domain
        // as the control service - hence the complexity of this configuration
        .config([
            '$composerProvider',
            '$locationProvider',

        function(comms) {
            // Point these variables to your ACA Engine instance
            // to start interacting with it using ACA Composer
            comms.tls   = false;

            // This outputs debugging information to console useful
            // if you want to see the communications occurring
            // between the interface and ACA Engine.
            //
            // Should be commented out for production
            comms.debug = true;

            // If you would like to use Authentication then you
            // must point this configuration to your compatible oauth server
            //
            // It's a lazy authentication process so only if a request
            // is made to a protected endpoint or a 401 is received will
            // the auth process activate.
            comms.useService({
                id: 'Cotag',
                scope: 'public',
                oauth_server: 'http://vl8.ad.life.unsw.edu.au/auth/oauth/authorize',
                oauth_tokens: 'http://vl8.ad.life.unsw.edu.au/auth/token',
                redirect_uri: 'http://vl8.ad.life.unsw.edu.au/oauth-resp.html',
                client_id: '3de2f53e51dce42e1acc023706a95ea4108a397b62eb4b494bc8a866ee8517a9',
                login_redirect: function () {
                    var url = encodeURIComponent(document.location.href);
                    return '/login_ldap?continue=' + url;
                },
                api_endpoint: '/api',
                proactive: true
            });
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
                if (user.sys_admin || user.support) {
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
