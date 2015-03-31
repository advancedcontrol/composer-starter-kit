(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys_3-18'] = {
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
            "name": "Astral 1",
            "access_attempts": 1,
            "site_name": "Crown",
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown", // basic, booked, advanced
            //"tab": "Lights",
            "tabs": {
                "basic": [
                    "shared_audio",
                    "lights",
                    "help",
                    "start"
                ],
                "client": [
                    "vision", // DualVision for dual displays
                    "shared_audio",
                    "help",
                    "lights",
                    "end"
                ],
                "advanced": [
                    "vision", // DualVision for dual displays
                    "audio",
                    "astral_lights",
                    "shared_audio",
                    "joining",
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
                },
                "lights": {
                    "title": "Lights"
                },
                "joining": {
                    "title": "Room Joining"
                },
                "shared_audio": {
                    "title": "Audio"
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
        }],
        Joiner: [{
            "joined": {
                rooms: ['sys_3-18', 'sys_3-19'],
                initiator: 'sys_3-18'
            },
            "rooms": {
                "sys_3-18": "Astral 1",
                "sys_3-19": "Astral 2",
                "sys_3-1A": "Astral 3"
            },
            $unjoin: function () {
                this.joined = {
                    rooms: ['sys_3-18'],
                    initiator: 'sys_3-18'
                };
            },
            $join: function () {
                this.joined = {
                    rooms: Array.prototype.slice.call(arguments),
                    initiator: 'sys_3-18'
                };
            }
        }],
        Lighting: [{
            "area88_chan0_level": 50,
            "area88_chan1_level": 125,
            "area88_chan2_level": 250,
            "area89_chan0_level": 50,
            "area89_chan1_level": 125,
            "area89_chan2_level": 250,
            "area90_chan0_level": 50,
            "area90_chan1_level": 125,
            "area90_chan2_level": 250,

            $light_level: function (area, level, channel) {
                var setting = "area" + area + "_chan" + channel + "_level";
                this[setting] = level;

                console.log('LIGHT LEVEL: ' + setting + ' = ' + level);
            }
        }],
        Lights: [{
            "light_levels": [
                {
                    "name": "Full",
                    "trigger": 3,
                    "message": "Lights are at Full"
                },
                {
                    "name": "Presentation",
                    "trigger": 2,
                    "message": "Lights in Presentation mode",
                },
                {
                    "name": "Off",
                    "trigger": 1,
                    "message": "Lights Off"
                }
            ],
            "light_names": {
                "Full": {
                    "message": "Lights are at Full"
                },
                "Presentation": {
                    "message": "Lights in Presentation mode"
                },
                "Off": {
                    "message": "Lights Off"
                },
            },
            "light_level": "Off",
            $perform_trigger: function (level) {
                this.light_level = level;
            }
        }],
        AstralLights: [{
            "selected": [
                [true, true, true, true, true, true],
                [true, true, true],
                [true, true, true, true, false, true]
            ],
            "selected_level": [125, 125, 125],

            $selection: function (rooms, selections) {
                var sys = this;

                angular.forEach(rooms, function (room) {
                    sys.selected[room] = selections[room];
                });
            },

            $selected_level: function (rooms, level) {
                var sys = this;

                angular.forEach(rooms, function (room) {
                    sys.selected_level[room] = level;
                });
            },

            $house_level: function (rooms, section, level) {
                var part,
                    sys = this,
                    areas = [88, 89, 90];

                if (typeof(section) === 'string') {
                    part = 0;

                    if (section === 'pelmets') {
                        part = 1;
                    } else if (section === 'downlights') {
                        part = 2;
                    }
                } else {
                    part = section;
                }

                angular.forEach(rooms, function (room) {
                    sys.$_self['Lighting'][0].$light_level(areas[room], level, part);
                });
            },


            "chandelier": [
                [true, true, true, true, true],
                [true, true, true, true, true],
                [true, true, true, true, true]
            ],

            $chandelier_select: function (rooms, selections) {
                var sys = this;

                angular.forEach(rooms, function (room) {
                    sys.chandelier[room] = selections[room];
                });
            },




            // These are the currently selected presets
            "presets": [10, 11, 12],
            "effects": [1, 2, 3],
            "custom_presets": {
                "My custom preset": {
                    "applied_to": [2, 1],
                    "number": 10
                },
                "This does somthing": {
                    "applied_to": [0, 1],
                    "number": 11
                }
            },
            "custom_numbers": [10, 11, 12, 13],
            "chandelier_presets": {
                "Red": 1,
                "Rainbow Slow Fade": 2,
                "Blue": 3,
                "Magenta": 4
            },

            $create_preset: function (rooms, name) {
                var number = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
                console.log("CREATING PRESET: ", number, name, " on ", rooms);

                this.custom_presets = angular.extend({}, this.custom_presets);

                this.custom_presets[name] = {
                    applied_to: rooms,
                    number: number
                };
            },

            $clear_preset: function (preset) {
                console.log("CLEAR PRESET: ", preset);
                var name;
                angular.forEach(this.custom_presets, function (value, key) {
                    if (value.number === preset) {
                        name = key;
                    }
                });

                if (name) {
                    this.custom_presets = angular.extend({}, this.custom_presets);
                    delete this.custom_presets[name];
                }
            },


            $call_named: function (rooms, name) {
                var number = this.custom_presets[name].number;
                this.$call_preset(rooms, number);
            },

            $call_preset: function (rooms, preset) {
                var rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                    i;

                for (i = 0; i < rooms.length; i += 1) {
                    this.presets[rooms[i]] = preset;
                }

                console.log("CALLING PRESET: ", preset, " on ", rooms);

                // Bug in angular equals?
                for (i = 0; i < rand; i += 1) {
                    this.presets.push(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
                }

                this.presets = this.presets.slice(0, 3);
            },


            $set_transition: function (rooms, preset) {
                this.effects[0] = preset;
                console.log("SETTING EFFECT: ", preset, " on ", rooms);

                // Bug in angular equals?
                var rand = Math.floor(Math.random() * (10 - 1 + 1)) + 1,
                    i;
                for (i = 0; i < rand; i += 1) {
                    this.effects.push(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
                }

                this.effects = this.effects.slice(0, 3);
            },

            "spots_enabled": [true, false, false],
            $spots_enabled: function (rooms, val) {
                var sys = this;

                angular.forEach(rooms, function (room) {
                    sys.spots_enabled[room] = val;
                });

                console.log("SPOTS ENABLED: ", val, " on ", rooms);
            }
        }]
    };





    window.systemData['sys_3-19'] = {
        System: [{
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
            "name": "Astral 2",
            "sources": {
                "respc": {
                    "title": "Signage PC",
                    "input": 1,
                    "source": "hdmi",
                    "type": "residentpc"
                }
            },
            "Room_Display_1": 'blank',
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
                    "title": "Projector"
                }
            }
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
        }],
        Screen: [{
            "screen1": "up",
            $state: function (pos, index) {
                this['screen' + index] = pos;
            }
        }]
    };









    window.systemData['sys_3-1A'] = {
        System: [{
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
            "name": "Astral 3",
            "sources": {
                "respc": {
                    "title": "Signage PC",
                    "input": 1,
                    "source": "hdmi",
                    "type": "residentpc"
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
                    "title": "Projector in Rm3"
                }
            }
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
        }],
        Screen: [{
            "screen1": "up",
            $state: function (pos, index) {
                this['screen' + index] = pos;
            }
        }]
    };


}(this, this.angular));
