(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //

    window.systemData = window.systemData || {};

    window.systemData['sys-B0'] = {
        System: [{
            "name": "Room 1",
            "cameras": [
                "10.213.0.1",
                "10.213.0.2"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B1'] = {
        System: [{
            "name": "Room 2",
            "cameras": [
                "10.213.0.3",
                "10.213.0.4"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B2'] = {
        System: [{
            "name": "Room 3",
            "cameras": [
                "10.213.0.5",
                "10.213.0.6"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B3'] = {
        System: [{
            "name": "Room 4",
            "cameras": [
                "10.213.0.7",
                "10.213.0.8"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B4'] = {
        System: [{
            "name": "Room 5",
            "cameras": [
                "10.213.0.9",
                "10.213.0.10"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B5'] = {
        System: [{
            "name": "Room 6",
            "cameras": [
                "10.213.0.11",
                "10.213.0.12"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B6'] = {
        System: [{
            "name": "Room 7",
            "cameras": [
                "10.213.0.13",
                "10.213.0.14"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B7'] = {
        System: [{
            "name": "Room 8",
            "cameras": [
                "10.213.0.15",
                "10.213.0.16"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B8'] = {
        System: [{
            "name": "Room 9",
            "cameras": [
                "10.213.0.17",
                "10.213.0.18"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
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
                $rootScope.controlSystem = value.sys || 'sys-B0';
            });

            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
