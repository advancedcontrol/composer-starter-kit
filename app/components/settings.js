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
            comms.host  = 'crownperth.webcontrol.me';
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
                oauth_server: 'http://crownperth.webcontrol.me/auth/oauth/authorize',
                oauth_tokens: 'http://crownperth.webcontrol.me/auth/token',
                redirect_uri: 'http://crownperth.webcontrol.me/oauth-resp.html',
                client_id: 'e37063a7172450ccc568672696ac4c28c2e785b004582ba32d502c0dc4b0ad13',
                api_endpoint: 'http://crownperth.webcontrol.me/control/',
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
                return $location.search().ctrl;
            }, function (value) {
                if (value) {
                    $rootScope.controlSystem = value;
                } else {
                    console.log('No System ID Provided');
                    $rootScope.controlSystem = null;
                }
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
