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
            "name": "Maroochy Room",
            "site_name": "Twin Waters",
            "access_attempts": 1,
            "help_msg": "For help please call <strong>0408419954</strong>",
            "mixer_type": "basic",
            "state": "shutdown", // basic, booked, advanced
            //"tab": "Lights",
            "tabs": {
                "basic": [
                    "lights",
                    "help",
                    "start"
                ],
                "client": [
                    "lights",
                    "help",
                    "vision", // DualVision for dual displays
                    "audio",
                    "end"
                ],
                "advanced": [
                    "light_faders",
                    "vision", // DualVision for dual displays
                    "audio",
                    "end"
                ]
            },
            "levels": [
                {
                    "name": "Lectern Mic",
                    "mixer": "Mixer_1",
                    "mute_id": 219,
                    "id": 119,
                    "min": 0,
                    "max": 65535
                },
                {
                    "name": "Resident PC",
                    "mixer": "Mixer_1",
                    "mute_id": 211,
                    "id": 111,
                    "min": 0,
                    "max": 65535
                },
                {
                    "name": "Client Laptop",
                    "mixer": "Mixer_1",
                    "mute_id": 204,
                    "id": 104,
                    "min": 0,
                    "max": 65535
                },
                {
                    "name": "Aux In",
                    "mixer": "Mixer_1",
                    "mute_id": 220,
                    "id": 120,
                    "min": 0,
                    "max": 65535
                }
            ],
            "pages": {
                "lights": {
                    "title": "Lighting"
                },
                "light_faders": {
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
                "pc": {
                    "title": "PC",
                    "input": 12,
                    "source": "hdbaset",
                    "type": "residentpc"
                },
                "laptop": {
                    "title": "Laptop",
                    "source": "hdbaset",
                    "input": 4,
                    "type": "laptop"
                }
            },
            "Display_1": 'blank',
            "outputs": {
                "Display_1": {
                    "title": "Projector",
                    "type": "projector",
                    "output": [
                        7,
                        4
                    ],
                    "screen": {
                        "module": "Screen_1",
                        "index": 1,
                        "binding": "screen"
                    }
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
        Lights: [{
            "light_levels": [
                {
                    "name": "Full",
                    "trigger": 1,
                    "message": "Lights are at Full"
                },
                {
                    "name": "Presentation",
                    "trigger": 2,
                    "message": "Lights in Presentation mode"
                },
                {
                    "name": "Low",
                    "trigger": 3,
                    "message": "Lights are dimmed"
                },
                {
                    "name": "Off",
                    "trigger": 4,
                    "message": "Lights Off"
                }
            ],


            "light_names": {
                "Full": 1,
                "Presentation": 2,
                "Low": 3,
                "Off": 4,
            },
            "light_level": "Off",
            $perform_trigger: function (level) {
                this.light_level = level;
            }
        }],
        Mixer: [{}],
        Lifter: [{
            "lifter1_rotation": 'inactive',
            $state: function (newState) {
                this.lifter1_rotation = newState;
            }
        }],
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
        }],
        Joiner: [{
            "joined": {
                rooms: ['sys-B0'],
                initiator: 'sys-B0'
            },
            "rooms": {
                "sys-B0": "Maroochy"
            },
            $unjoin: function () {
                this.joined = {
                    rooms: ['sys-B0'],
                    initiator: 'sys-B0'
                };
            },
            $join: function () {
                this.joined = {
                    rooms: Array.prototype.slice.call(arguments),
                    initiator: 'sys-B0'
                };
            }
        }]
    };

}(this, this.angular));
