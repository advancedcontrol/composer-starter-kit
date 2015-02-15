(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        System: [{
            "title": "Studio Projector",

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

            // picture mute
            "muted": false,
            $toggle_mute: function() {
                this.muted = !this.muted;
            },

            // present content
            "group_id": "grp-B2",
            "sources": {
                "default": {
                    "input": 1,
                    "source": "hdmi1"
                }
            },

           $present: function(tab) {
            }
        }],

        /*Screen: [{
            "down": false
        }],*/

        Display: [{
            "power": false
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
            //comms.port  = 80;
            //comms.host  = '10.71.1.248';
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
                oauth_server: 'http://sohiptva.soh.com/auth/oauth/authorize',
                oauth_tokens: 'http://sohiptva.soh.com/auth/token',
                redirect_uri: 'http://sohiptva.soh.com/oauth-resp.html',
                client_id: 'df46d04043f6fe1d9949d9effba43b25b664064addfe4670aae8a24fe3f3f570',
                login_redirect: function () {
                    var url = encodeURIComponent(document.location.href);
                    return '/auth/login?continue=' + url + '&provider=soh';
                },
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
                $rootScope.controlSystem = value.channel;
                $rootScope.groupID = value.group;
            });

            // this should go in config?
            $rootScope.scheduleCreateURL = '/api/schedules';
            $rootScope.languagesQueryURL = '/api/groups?mine=true&offset=0&q=ToursGroup';
            $rootScope.playlistsQueryPrefix = '/api/groups/';

            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
