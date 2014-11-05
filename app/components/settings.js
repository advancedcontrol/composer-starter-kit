(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        System: [{
            "name": "Test System",
            "state": "online",
            "inputs": [
                "pc",
                "laptop",
                "camera",
                "vc"
            ],
            "pc": [
                {
                    "source": "g1_pc1",
                    "title": "1G1 PC-1",
                    "type": "residentpc"
                },
                {
                    "source": "g1_pc2",
                    "title": "1G1 PC-2",
                    "type": "residentpc"
                },
                {
                    "source": "g2_pc1",
                    "title": "1G2 PC-1",
                    "type": "residentpc"
                },
                {
                    "source": "g2_pc2",
                    "title": "1G2 PC-2",
                    "type": "residentpc"
                }
            ],
            "laptop": [
                {
                    "source": "laptop_g1",
                    "title": "1G1 Laptop",
                    "type": "hdmi"
                },
                {
                    "source": "laptop_g2",
                    "title": "1G2 Laptop",
                    "type": "hdmi"
                }
            ],
            "camera": [
                {
                    "source": "cam_r_g1",
                    "title": "1G1 Rear",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 1
                },
                {
                    "source": "cam_f_g1",
                    "title": "1G1 Front",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 2
                },
                {
                    "source": "cam_r_g2",
                    "title": "1G2 Rear",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 3
                },
                {
                    "source": "cam_f_g2",
                    "title": "1G2 Front",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 4
                }
            ],
            "vc": [
                {
                    "source": "vc1",
                    "title": "1G1 VC",
                    "type": "vc-active"
                },
                {
                    "source": "vc2",
                    "title": "1G2 VC",
                    "type": "vc-active"
                }
            ],
            "sources": {
                "g1_pc1": {
                    "input": 14,
                    "source": "hdmi"
                },
                "g1_pc2": {
                    "input": 15,
                    "source": "hdmi"
                },
                "g2_pc1": {
                    "input": 1,
                    "source": "hdmi"
                },
                "g2_pc2": {
                    "input": 5,
                    "source": "hdmi"
                },
                "laptop_g1": {
                    "input": 11,
                    "source": "hdmi"
                },
                "laptop_g2": {
                    "input": 2,
                    "source": "hdmi"
                },
                "cam_r_g1": {
                    "input": 12,
                    "source": "hdmi"
                },
                "cam_f_g1": {
                    "input": 13,
                    "source": "hdmi"
                },
                "cam_r_g2": {
                    "input": 10,
                    "source": "hdmi"
                },
                "cam_f_g2": {
                    "input": 9,
                    "source": "hdmi"
                },
                "vc1": {
                    "input": 6,
                    "content": 8
                },
                "vc2": {
                    "input": 3,
                    "content": 6
                }
            },
            "outputs": {
                "Display_1": {
                    "screen": "Screen_1",
                    "output": [
                        3,
                        23
                    ],
                    "audio_out": 21,
                    "mixer_id": 105,
                    "type": "projector",
                    "pri": 1,
                    "title": "G1 Front"
                },
                "Display_2": {
                    "screen": "Screen_2",
                    "output": [
                        4,
                        24
                    ],
                    "audio_out": 22,
                    "mixer_id": 32,
                    "type": "projector",
                    "pri": 2,
                    "title": "G1 Rear"
                },
                "VidConf_1": {
                    "output": [
                        7,
                        9
                    ],
                    "no_audio": true,
                    "no_mod": true,
                    "type": "conference",
                    "pri": 3,
                    "title": "G1 VC"
                },
                "Display_3": {
                    "screen": "Screen_3",
                    "output": [
                        1,
                        21
                    ],
                    "audio_out": 23,
                    "mixer_id": 107,
                    "type": "projector",
                    "pri": 4,
                    "title": "G2 Front",
                    "remote": true
                },
                "Display_4": {
                    "screen": "Screen_4",
                    "output": [
                        2,
                        22
                    ],
                    "audio_out": 24,
                    "mixer_id": 106,
                    "type": "projector",
                    "pri": 5,
                    "title": "G2 Rear",
                    "remote": true
                },
                "VidConf_2": {
                    "output": [
                        5
                    ],
                    "no_audio": true,
                    "no_mod": true,
                    "type": "conference",
                    "pri": 6,
                    "title": "G2 VC",
                    "remote": true
                }
            },
            "lights": {
                "levels": {
                    "Off": 1,
                    "Presentation": 2,
                    "Full": 3
                },
                "default": 3,
                "shutdown": 0 
            },
            "vol_max": 3,
            "vol_min": -50
        }],
        Mixer: [{}],
        Switcher: [{}],
        Lights: [{}],
        Computer: [{}, {}, {}, {}],
        Camera: [{}, {}, {}, {}],
        Display: [{}, {}, {}, {}]
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
                return $location.hash();
            }, function (value) {
                if (value === '') {
                    // default system?
                    $rootScope.controlSystem = 'sys-B0';
                } else {
                    $rootScope.controlSystem = value;
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
