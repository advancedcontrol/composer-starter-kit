(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B3'] = {
        System: [{
            analytics: 'UA-69533861-1',
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
            "name": "Multi Display Room",
            "joining_rooms": ['sys-B0', 'sys-B1', 'sys-B2'],
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown",
            "tab": "PC",
            "inputs": [
                "PC",
                "Laptop",
                "Visualiser"
            ],
            "PC": [
                "g1_pc1"
            ],
            "Laptop": [
                "laptop_g1",
                "laptop_g2"
            ],
            "Visualiser": [
                "vis"
            ],
            "sources": {
                "g1_pc1": {
                    "title": "Resident PC",
                    "input": 14,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "laptop_g1": {
                    "title": "Laptop HDMI",
                    "input": 11,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                },
                "laptop_g2": {
                    "title": "Laptop 2 HDMI",
                    "input": 11,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                },
                "vis" : {
                    "title": "Visualiser",
                    "input": 10,
                    "source": "hdmi",
                    "type": "visualiser"
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
                    "title": "Projector"
                },
                "Display_2": {
                    "output": [
                        3,
                        23
                    ],
                    "audio_out": 21,
                    "mixer_id": 105,
                    "type": "lcd",
                    "pri": 2,
                    "title": "NEC LCD"
                }
            },
            "has_preview": 4,
            "vol_max": 3,
            "vol_min": -50,
            $lights_to: function (level) {
                this.light_level = level;
            }
        }],
        Mixer: [{
            fader_106: 1,
            fader_107: 2,
            fader_105: -25,
            fader_32: -30,
            fader_107_mute: true, 
            $fader: function (fader, volume) {
                this['fader_' + fader] = volume;
            },
            $mute: function (fader, mute) {
                this['fader_' + fader + '_mute'] = mute;
            } 
        }],
        Computer: [{}],
        Display: [{
            $mute: function (mute) {
                this.mute = mute;
            }
        },{
            $mute: function (mute) {
                this.mute = mute;
            }
        }],
        Visualiser: [{
            $frozen: function (freeze) {
                this.frozen = freeze;
            },
            $lamp: function (freeze) {
                if (!this.frozen)
                    this.lamp = freeze;
            },
            $sharp: function (freeze) {
                if (!this.frozen)
                    this.sharp = freeze;
            }
        }]
    };

}(this, this.angular));
