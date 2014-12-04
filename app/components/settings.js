(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        System: [{
            "$powerup": function () {
                this.state = "online";
            },
            "$shutdown": function () {
                this.state = "shutdown";
            },
            $tab: function (tab) {
                this.tab = tab;
            },

            $show: function (source, display) {
                var src = this.sources[source];

                console.log("SOURCE SELECT", display, source);

                // Return source and source title
                this[display] = {
                    source: source,
                    title: src.title,
                    type: src.type
                };

                // Clear mute
                if (this.outputs[display] && !this.outputs[display].no_mod) {
                    var parts = getModuleParts(display);
                    this.$_self[parts.module][parts.index - 1].mute = false;
                }
            },
            $present: function (source, display) {
                var self = this,
                    src = this.sources[source];

                // Blank means all displays
                if (display == null) {
                    display = 'all_displays';
                }

                if (display == 'all_displays') {
                    angular.forEach(this.outputs, function (val, key) {
                        self.$show.apply(self, [source, key]);
                    });

                    this[display] = {
                        source: source,
                        title: src.title,
                        type: src.type
                    };
                } else {
                    this.$show.apply(self, [source, display]);
                    this['all_displays'] = null;
                }
            },
            $video_mute: function (display) {
                this[display] = {
                    source: 'none'
                };

                if (!this.outputs[display].no_mod) {
                    var parts = getModuleParts(display);
                    this.$_self[parts.module][parts.index - 1].mute = true;
                }
            },
            "name": "Demo Room",
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown",
            "tab": "Camera",
            "apps": ['explorer', 'firefox', 'vlc', 'sankore'],
            "channels": [
                "7 Digital",
                "7TWO",
                "7mate",
                "ABC News",
                "ABC1",
                "ABC2",
                "ABC3",
                "ELEVEN",
                "GEM",
                "GO",
                "Nine",
                "ONE",
                "TEN",
                "ABC Dig"
            ],
            "inputs": [
                "PC",
                "Laptop",
                "Camera",
                "VC"
            ],
            "PC": [
                "g1_pc1",
                "g1_pc2",
                "g2_pc1",
                "g2_pc2"
            ],
            "Laptop": [
                "laptop_g1",
                "laptop_g2"
            ],
            "Camera": [
                "cam_r_g1",
                "cam_f_g1",
                "cam_r_g2",
                "cam_f_g2"
            ],
            "VC": [
                "vc1",
                "vc2"
            ],
            "sources": {
                "g1_pc1": {
                    "title": "1G1 PC-1",
                    "input": 14,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "g1_pc2": {
                    "title": "1G1 PC-2",
                    "input": 15,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "g2_pc1": {
                    "title": "1G2 PC-1",
                    "input": 1,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "g2_pc2": {
                    "title": "1G2 PC-2",
                    "input": 5,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "laptop_g1": {
                    "title": "1G1 Laptop",
                    "input": 11,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                },
                "laptop_g2": {
                    "title": "1G2 Laptop",
                    "input": 2,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                },
                "cam_r_g1": {
                    "title": "1G1 Rear",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 1,
                    "input": 12,
                    "source": "hdmi"
                },
                "cam_f_g1": {
                    "title": "1G1 Front",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 2,
                    "input": 13,
                    "source": "hdmi"
                },
                "cam_r_g2": {
                    "title": "1G2 Rear",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 3,
                    "input": 10,
                    "source": "hdmi"
                },
                "cam_f_g2": {
                    "title": "1G2 Front",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 4,
                    "input": 9,
                    "source": "hdmi"
                },
                "vc1": {
                    "title": "1G1 VC",
                    "type": "vc-active",
                    "input": 6,
                    "content": 8
                },
                "vc2": {
                    "title": "1G2 VC",
                    "type": "vc-active",
                    "input": 3,
                    "content": 6
                }
            },
            "outputs": {
                "Display_1": {
                    "screen": {
                        "module": "Screen_1",
                        "index": 1
                    },
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
                    "screen": {
                        "module": "Screen_2",
                        "index": 1
                    },
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
                    "screen": {
                        "module": "Screen_3",
                        "index": 1
                    },
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
                    "screen": {
                        "module": "Screen_4",
                        "index": 1
                    },
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
            "light_level": "Off",
            "lights": {
                "levels": [
                    {
                        "name": "Full",
                        "trigger": 3
                    },
                    {
                        "name": "Presentation",
                        "trigger": 2
                    },
                    {
                        "name": "Off",
                        "trigger": 1
                    }
                ],
                "default": 3,
                "shutdown": 0,
                "present": 2,
                "group": 12
            },
            "vol_max": 3,
            "vol_min": -50,
            $lights_to: function (level) {
                this.light_level = level;
            }
        }],
        Mixer: [{
            fader_106: 1,
            fader_107: 2,
            fader_105: 3,
            fader_32: -30,
            fader_107_mute: true, 
            $fader: function (fader, volume) {
                this['fader_' + fader] = volume;
            },
            $mute: function (fader, mute) {
                this['fader_' + fader + '_mute'] = mute;
            } 
        }],
        Switcher: [{}],
        Lights: [{}],
        Computer: [{}, {}, {}, {}],
        Camera: [{
            joy_right: 50,
            joy_left: 1,
            joy_center: 25,
            zoom: 25
        }, {
            joy_right: 50,
            joy_left: 1,
            joy_center: 25,
            zoom: 1
        }, {
            joy_right: 50,
            joy_left: 1,
            joy_center: 25,
            zoom: 75
        }, {
            joy_right: 50,
            joy_left: 1,
            joy_center: 25,
            zoom: 10
        }],
        Display: [{
            $mute: function (mute) {
                this.mute = mute;
            }
        }, {
            $mute: function (mute) {
                this.mute = mute;
            }
        }, {
            $mute: function (mute) {
                this.mute = mute;
            }
        }, {
            $mute: function (mute) {
                this.mute = mute;
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
