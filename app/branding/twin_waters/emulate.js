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
                    "start",
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
                },
                "astral_lights": {
                    "title": "Lights"
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
                    "rotation_screen": {
                        "module": "Screen_2",
                        "index": 1,
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
        }, {}],
        Screen: [{
            "screen1": "down",
            "screen2": "up",
            $state: function (pos, index) {
                this['screen' + index] = pos;
            }
        }]
    };

}(this, this.angular));
