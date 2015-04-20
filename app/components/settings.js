(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        System: [{
            "title": "White Lady Demo Room 1",

            // power on/off
            "state": "shutdown",
            $powerup: function() {
                this.state = 'online';
            },

            $shutdown: function() {
                this.state = 'shutdown';
                for (var i = 0; i < this.$_self.Display.length; i += 1) {
                    this.$_self.Display[i].power = false;
                }
            },

            // present content
            "room_id": "rom-B0",
            "sources": {
                "default": {
                    "input": 1,
                    "source": "hdmi1"
                }
            }
        }],

        Display: [{
            "power": false,
            "muted": false
        }],

        Mixer: [{
            "muted": false,
            "volume": 100,
            "audio_source": "Computer",
            "video_source": "Computer"
        }]
    };

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
                oauth_server: 'http://localhost:9000/auth/oauth/authorize',
                oauth_tokens: 'http://localhost:9000/auth/token',
                redirect_uri: 'http://localhost:9000/oauth-resp.html',
                client_id: 'df46d04043f6fe1d9949d9effba43b25b664064addfe4670aae8a24fe3f3f570',
                api_endpoint: '/api',
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
                $rootScope.controlSystem = value.channel || 'sys-B0';
                $rootScope.groupID = value.group;
            });


            $rootScope.showPopup = function (name) {
                var newVal = !$rootScope[name]

                $rootScope.showDvd = false;
                $rootScope.showMics = false;
                $rootScope.showDisplay = false;
                $rootScope.showCamera = false;

                $rootScope[name] = newVal;
            };

            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
