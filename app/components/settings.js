(function (window, angular) {
    'use strict';

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
            '$rootScope',
            '$location',
            '$conductor',

        function ($window, cacheman, $rootScope, $location) {
            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
