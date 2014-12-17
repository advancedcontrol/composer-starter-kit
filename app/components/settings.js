(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        System: [{
            $powerup: function () {
                this.state = "basic";
                this.tab = this.tabs[this.state][0];
            },
            $shutdown: function () {
                this.state = "shutdown";
            },
            $tab: function (tab) {
                this.tab = tab;
            },
            $present: function (source, display) {
                if (source === 'none') {
                    this[display] = 'none';

                    // Mute the display as well
                    if (!this.outputs[display].no_mod) {
                        var parts = getModuleParts(display);
                        this.$_self[parts.module][parts.index - 1].mute = true;
                    }
                } else {
                    var src = this.sources[source];

                    // Return source and source title
                    this[display] = source;

                    // Clear mute
                    if (!this.outputs[display].no_mod) {
                        var parts = getModuleParts(display);
                        this.$_self[parts.module][parts.index - 1].mute = false;
                    }
                }
            },
            $changeState: function (pass) {
                var newState;

                if (pass == '1234') {
                    newState = 'client';
                } else if (pass == 'admin') {
                    newState = 'advanced';
                } else {
                    // inform user of issue
                    this.access_attempts += 1;
                    return;
                }

                // Check if we are actually shutting down
                if (this.state === newState) {
                    this.$shutdown();
                } else {
                    this.state = newState;
                    this.tab = this.tabs[this.state][0];
                }
            },
            "name": "Demo Room",
            "access_attempts": 1,
            "help_msg": "For help please call <strong>0408419954</strong>",
            //"state": "shutdown", // basic, booked, advanced
            //"tab": "Lights",
            "tabs": {
                "basic": [
                    "help",
                    "start"
                ],
                "client": [
                    "vision", // DualVision for dual displays
                    "audio",
                    "help",
                    "end"
                ],
                "advanced": [
                    "vision", // DualVision for dual displays
                    "audio",
                    "end"
                ]
            },
            "presets": {
                "All Rooms - Stage North": 1001,
                "All Rooms - Stage West": 1002,
                "All Rooms - Stage East": 1003,
                "Rooms 1&2 - Stage West": 1004,
                "Rooms 1&2 - Stage North": 1005,
                "Rooms 2&3 - Stage North": 1006,
                "Rooms 2&3 - Stage East": 1007,
                "No Mic Input Selected": 1008,
                "Room 1 - Stage West": 1009,
                "Room 1 - Stage North": 1010,
                "Room 2 - Stage North": 1011,
                "Room 3 - Stage North": 1012,
                "Room 3 - Stage East": 1013,
                "Room 1 Clear": 1016,
                "Room 2 Clear": 1017,
                "Room 3 Clear": 1018,
                "Room 1 Unlinked": 1019,
                "Room 2 Unlinked": 1020,
                "Room 3 Unlinked": 1021,
                "Alt Rooms 1&2 - Stage West": 1022,
                "Alt Rooms 1&2 - Stage North": 1023,
                "Alt Rooms 2&3 - Stage North": 1024,
                "Alt Rooms 2&3 - Stage East": 1025
            },
            "levels": [{
                name: "S1 Input 1",
                mixer: "Mixer_1",
                id: 29,
                index: 1,
                max: 12,
                min: -100
            },
            {
                name: "S1 Input 2",
                mixer: "Mixer_1",
                id: 30,
                index: 1,
                max: 12,
                min: -100
            }],
            "pages": {
                "vision": {
                    "title": "Vision"
                },
                "audio": {
                    "title": "Audio"
                },
                "start": {
                    "title": "Start Meeting"
                },
                "end": {
                    "title": "End Meeting"
                },
                "help": {
                    "title": "Help"
                }
            },
            "sources": {
                "respc": {
                    "title": "Resident PC",
                    "input": 1,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "laptop": {
                    "title": "Client Laptop",
                    "input": 2,
                    "source": "hdmi",
                    "type": "laptop"
                },
                "vga": {
                    "title": "AUX Input",
                    "source": "vga",
                    "type": "vga"
                }
            },
            "Display_1": 'blank',
            "outputs": {
                "Display_1": {
                    "type": "projector",
                    "screen": {
                        "module": "Screen_1",
                        "index": 1,
                        "binding": "screen"
                    },
                    "lift": {
                        "module": "Screen_1",
                        "index": 2,
                        "binding": "screen"
                    },
                    "output": [
                        1
                    ],
                    "title": "Primary Projector"
                },
                "Display_2": {
                    "type": "projector",
                    "screen": {
                        "module": "Screen_2",
                        "index": 1,
                        "binding": "screen"
                    },
                    "lift": {
                        "module": "Screen_2",
                        "index": 2,
                        "binding": "screen"
                    },
                    "output": [
                        1
                    ],
                    "title": "Secondary Projector"
                }
            },
            "help_message": "For support, select the most appropriate option from the list below and press submit",
            "help_sms": {
                "to": "+61458596026"
            },
            "help_options": [
                "My laptop won't display",
                "No sound is coming from the speakers",
                "I have an issue with the lights",
                "There is an issue with the display or projector",
                "General support required"
            ]
        }],
        Switcher: [{}],
        Lights: [{}],
        Mixer: [{}],
        Display: [{
            "power": true,
            $power: function (val) {
                this.power = val;
            }
        }, {}],
        Screen: [{
            "screen1": "down",
            "screen2": "up",
            $state: function (pos, index) {
                this['screen' + index] = pos;
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
