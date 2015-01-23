(function (window, angular) {
    'use strict';


    angular.module('AcaEngine')
    
        // The authentication service doesn't have to be hosted on the same domain
        // as the control service - hence the complexity of this configuration
        .config([
            '$composerProvider',

        function(comms) {
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
                oauth_server: 'https://control.tafesa.edu.au/auth/oauth/authorize',
                oauth_tokens: 'https://control.tafesa.edu.au/auth/token',
                redirect_uri: 'https://control.tafesa.edu.au/oauth-resp.html',
                client_id: '2ffb63c89459c17288f488616d4a7e94de94628eb6c3b41f6e32e140a0a0ca53',
                api_endpoint: '/api',
                proactive: true
            });
        }]);

}(this, this.angular));
