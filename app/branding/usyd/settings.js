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
                oauth_server: 'https://cntrl-web-uat-1.ucc.usyd.edu.au/auth/oauth/authorize',
                oauth_tokens: 'https://cntrl-web-uat-1.ucc.usyd.edu.au/auth/token',
                redirect_uri: 'https://cntrl-web-uat-1.ucc.usyd.edu.au/oauth-resp.html',
                client_id: 'aa549e0f7e1c5be36045b81b9edb6d6b8a29e7730814bcf5f1b0314f2e52806a',
                api_endpoint: '/api',
                proactive: true,
                login_redirect: function () {
                    var url = encodeURIComponent(document.location.href);
                    return '/auth/login?continue=' + url + '&provider=usyd';
                }
            });
        }]);

}(this, this.angular));
