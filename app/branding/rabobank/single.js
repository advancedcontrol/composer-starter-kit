(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B8'] = {
        Camera: [{
            joy_right: 0x14,
            joy_left: 0x14,
            joy_center: 0,
            zoom: 25
        }],
        System: [{
            analytics: 'UA-69533861-111',
            "$powerup": function () {
                this.state = "online";
            },
            "$shutdown": function () {
                this.state = "shutdown";
            },
            $tab: function (tab) {
                this.tab = tab;
            },

            $init_vc: function () {
                console.log('phantom on + raising mics + unmuting mics');
            },

            $off_vc: function () {
                console.log('muting mics + phantom off + lower mics');
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
            "phone_settings": {
                "phone_module": "Mixer_1",
                "number_id": "16-10pVcRoomPhoneDialString",
                "dial_id": "16-10pVcRoomPhoneConnect",
                "hangup_id": "16-10pVcRoomPhoneDisconnect",
                "status_id": "16-10pVcRoomPhoneProgress",
                "ringing_id": "16-10pVcRoomPhoneRinging",
                "offhook_id": "16-10pVcRoomPhoneOffHook",
                "query_ids": ["16-10pVcRoomPhoneProgress", "16-10pVcRoomPhoneRinging", "16-10pVcRoomPhoneOffHook"]
            },
            "name": "Meeting Room 13A",
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
            "inputs": [
                "Lectern",
                "Laptop",
                "Wireless",
                "Phone",
                "VC",
                "Camera"
            ],
            "PC": [
                "g1_pc1"
            ],
            "Lectern": [
                "laptop_g1",
                "laptop_g2"
            ],
            "Wireless": [
                "laptop_wireless"
            ],
            "Laptop": [
                "laptop_usb",
                "laptop_wireless"
            ],
            "VC": [
                "video_conf"
            ],
            "Camera": [
                "training_cam"
            ],
            "sources": {
                "g1_pc1": {
                    "title": "Resident PC",
                    "input": 14,
                    "source": "hdmi",
                    "type": "residentpc",
                    "colour": "#F58172"
                },
                "laptop_g1": {
                    "title": "Laptop (HDMI Audio)",
                    "input": 11,
                    "source": "hdmi",
                    "type": "aux_hdmi",
                    "colour": "#7BB5D0"
                },
                "laptop_g2": {
                    "title": "Laptop (3.5mm Audio)",
                    "input": 2,
                    "source": "hdmi",
                    "type": "aux_hdmi",
                    "colour": "#FFDB8E"
                },
                "laptop_usb": {
                    "title": "Laptop Wireless",
                    "input": 2,
                    "source": "hdmi",
                    "type": "wireless",
                    "colour": "#FFDB8E"
                },
                "laptop_wireless": {
                    "title": "Laptop USB",
                    "input": 2,
                    "source": "hdmi",
                    "type": "usb",
                    "colour": "#FFDB8E"
                },
                "video_conf": {
                    "title": "Video Conference",
                    "input": 9,
                    "source": "hdmi",
                    "type": "presenter",
                    "colour": "#65DCC7"
                },
                "training_cam": {
                    "title": "Camera Front",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 1,
                    "ignore": true
                },
                "soft_phone": {
                    "title": "Phone",
                    "type": "soft-phone",
                    "ignore": true
                }
            },
            "outputs": {
                "Display_1": {
                    "output": [
                        3,
                        23
                    ],
                    "audio_out": 21,
                    "mixer_id": 105,
                    "type": "lcd",
                    "pri": 1,
                    "title": "Display"
                },
                "Display_2": {
                    "output": [
                        3,
                        23
                    ],
                    "audio_out": 21,
                    "mixer_id": 105,
                    "type": "lcd",
                    "pri": 1,
                    "title": "Display"
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
            fader_105: -25,
            fader_32: -30,
            fader_107_mute: true,
            "16-10pVcRoomPhoneDialString": '1234',
            $fader: function (fader, volume) {
                this['fader_' + fader] = volume;
            },
            $mute: function (fader, mute) {
                this['fader_' + fader + '_mute'] = mute;
            },
            $phone_number: function (number, id) {
                this[id] = number;
            },
            $phone_dial: function (id) {
                var local = this;
                this["16-10pVcRoomPhoneProgress"] = 'Dialing number';
                this["16-10pVcRoomPhoneRinging"] = true;
            },
            $phone_hangup: function (id) {
                this["16-10pVcRoomPhoneProgress"] = '';
                this["16-10pVcRoomPhoneRinging"] = false;
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
        }]
    };

}(this, this.angular));
