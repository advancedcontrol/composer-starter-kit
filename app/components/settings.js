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
                this.tab = 'lights';
            },
            $shutdown: function () {
                this.state = "shutdown";
            },
            $tab: function (tab) {
                this.tab = tab;
            },
            $present: function (source) {
                var display = 'Display_1';

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
                if (pass == '1234') {
                    this.state = 'client';
                } else if (pass == 'admin') {
                    this.state = 'advanced';
                } else {
                    // inform user of issue
                    // TODO:: notification system
                }
            },
            "name": "Demo Room",
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown", // basic, booked, advanced
            "tab": "Lights",
            "tabs": {
                "basic": [
                    "lights",
                    "help",
                    "start"
                ],
                "client": [
                    "lights",
                    "vision", // DualVision for dual displays
                    "audio",
                    "help",
                    "end"
                ],
                "advanced": [
                    "lights",
                    "vision", // DualVision for dual displays
                    "audio",
                    "end"
                ]
            },
            "pages": {
                "lights": {
                    "title": "Lighting"
                },
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
                        "index": 1
                    },
                    "lift": {
                        "module": "Screen_1",
                        "index": 2
                    },
                    "output": [
                        1
                    ],
                    "title": "Demo Room Projector"
                }
            },
            "light_level": "Off",
            "light_levels": [
                "Off",
                "Presentation",
                "Discussion",
                "Full"
            ],
            "light_presets": {
                "Off": {
                    "trigger": 1,
                    "message": "Room lights are off.<br />Please select a preset"
                },
                "Presentation": {
                    "trigger": 2,
                    "message": "Lights are on Presentation mode"
                },
                "Discussion": {
                    "trigger": 3,
                    "message": "Lights are on Discussion mode"
                },
                "Full": {
                    "trigger": 4,
                    "message": "Lights are at full brightness"
                }
            }
        }],
        Switcher: [{}],
        Lights: [{}],
        Display: [{
            "power": true,
            $power: function (val) {
                this.power = val;
            }
        }],
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
