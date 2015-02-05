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
            comms.port = 3000;

            // If you would like to use Authentication then you
            // must point this configuration to your compatible oauth server
            //
            // It's a lazy authentication process so only if a request
            // is made to a protected endpoint or a 401 is received will
            // the auth process activate.
            comms.useService({
                id: 'AcaEngine',
                scope: 'public',
                oauth_server: 'http://192.168.15.2:9000/auth/oauth/authorize',
                oauth_tokens: 'http://192.168.15.2:9000/auth/token',
                redirect_uri: 'http://192.168.15.2:9000/oauth-resp.html',
                client_id: 'df46d04043f6fe1d9949d9effba43b25b664064addfe4670aae8a24fe3f3f570',
                api_endpoint: '/api',
                proactive: true,
                login_redirect: function () {
                    var url = encodeURIComponent(document.location.href);
                    return '/auth/login?continue=' + url + '&provider=developer';
                }
            });
        }]);

}(this, this.angular));
