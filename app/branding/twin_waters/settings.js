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
            comms.port  = 80;
            comms.host  = 'controlatntwr.webcontrol.me';
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
                id: 'AcaEngine',
                scope: 'public',
                oauth_server: 'http://controlatntwr.webcontrol.me/auth/oauth/authorize',
                oauth_tokens: 'http://controlatntwr.webcontrol.me/auth/token',
                redirect_uri: 'http://controlatntwr.webcontrol.me/oauth-resp.html',
                client_id: '4edc680cdeafb2730d221ccd9c0d38e6872c84c402c782034f03d47e118f0ed0',
                login_redirect: function () {
                    var url = encodeURIComponent(document.location.href);
                    return '/auth/login?continue=' + url + '&provider=developer'
                },
                api_endpoint: '/control/',
                proactive: true
            });
        }]);

        

}(this, this.angular));
