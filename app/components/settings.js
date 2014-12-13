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
            comms.port  = 3000;
            comms.host  = 'localhost';
            comms.tls   = false;

            // This outputs debugging information to console useful
            // if you want to see the communications occurring
            // between the interface and ACA Engine.
            //
            // Should be commented out for production
            comms.debug = false;

            // If you would like to use Authentication then you
            // must point this configuration to your compatible oauth server
            //
            // It's a lazy authentication process so only if a request
            // is made to a protected endpoint or a 401 is received will
            // the auth process activate.
            comms.useService({
                id: 'AcaEngine',
                scope: 'public',
                oauth_server: 'http://localhost:3000/auth/oauth/authorize',
                oauth_tokens: 'http://localhost:3000/auth/token',
                redirect_uri: 'http://localhost:9000/oauth-resp.html',
                client_id: 'df46d04043f6fe1d9949d9effba43b25b664064addfe4670aae8a24fe3f3f570',
                api_endpoint: 'http://localhost:3000/control/',
                proactive: true
            });
        }])

        .run([
            '$window',
            '$location',
            '$rootScope',
            'cacheman',
            '$timeout',
            '$comms',

        function ($window, $location, $rootScope, cacheman, $timeout, $comms) {

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

            // If auth is in use and we want to trust the device
            // i.e. we don't want to have to log in every time
            // The trust URL would look like: 'http://localhost/#/?trust#sys-id'
            if ($location.search().trust && !$comms.isRemembered('AcaEngine')) {
                // We need time to let the directive load.
                // This will not be required in the future
                $timeout(function () {
                    $comms.rememberMe('AcaEngine');
                }, 0);
            }
            
        }]);

}(this, this.angular));
