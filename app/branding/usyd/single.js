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
                console.log('changing tab to ' + tab);
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
            "name": "Carslaw Pod 158",
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown",
            "tab": "PC",
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
            "joined": { // here for joinging room emulation
                rooms: ['sys-B0'],
                initiator: 'sys-B0'
            },
            "inputs": [
                "Wireless",
                "Laptop",
                "Web Conference"
            ],
            "Wireless": [
                "g1_pc1"
            ],
            "Laptop": [
                "laptop_g1"
            ],
            "Web Conference": [
                "tv_receiver"
            ],
            "Receiver": [
                "tv_receiver"
            ],
            "sources": {
                "g1_pc1": {
                    "title": "1G1 PC-1",
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
                    "title": "Laptop VGA",
                    "input": 2,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                },
                "tv_receiver": {
                    "title": "TV Receiver",
                    "input": 2,
                    "source": "tv",
                    "type": "presenter"
                }
            },
            "outputs": {
                "Display_1": {
                    "type": "lcd",
                    "pri": 1,
                    "title": "Pod Display",
                    "no_mute": true
                }
            },
            "vol_max": -20,
            "vol_min": -50,
            "Presenter_hide": true,
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
            $mute_audio: function (mute) {
                this.mute = mute;
                this.volume = 0;
            }
        }]
    };

}(this, this.angular));
