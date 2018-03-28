(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //
    window.systemData = window.systemData || {};
    window.systemData['sys-B8'] = {
        Television: [{
            "name": "L16 Stairs",
            "box_id": 23,
            "channelName": "ABC News 24",
            "channelNames": [
                "ABC News 24",
                "ABC 1",
                "ABC 2",
                "ABC 3",
                "One",
                "SBS One",
                "SBS 2",
                "7Mate",
                "Seven",
                "7TWO",
                "Nine",
                "Ten",
                "Eleven",
                "GO",
                "GEM",
                "Bloomberg",
                "CNN",
                "CNBC",
                "BBC World",
                "Sky News",
                "Nick Jr.",
                "Fox Sports",
                "Fox Sports 2",
                "Fox Sports 3",
                "ESPN",
                "ESPN 1",
                "Fox Sports News",
                "Fox Footy",
                "Some other channel"
            ],
            $goto: function(name) {
                this.channelName = name;
            },
            "input_list": {
                hdmi: "HDMI",
                vga: "VGA",
                display_port: "Display Port"
            }
        }],
        Camera: [{
            joy_right: -0x14,
            joy_left: 0x14,
            joy_center: 0,
            zoom: 25
        },
        {
            joy_right: -0x14,
            joy_left: 0x14,
            joy_center: 0,
            zoom: 80
        }],
        Bookings: [{
            order_status: 'idle',
            waiter_status: 'idle',
            waiter_call: true,

            //meeting_ending: true,
            last_meeting_started: 23,
            meeting_pending: 24,
            meeting_ending: false,

            $waiter_call: function (state) {
                this.waiter_call = state;
                if (state) {
                    this.waiter_status = 'pending';
                } else {
                    this.waiter_status = 'idle';
                }
            },
            $commit_order: function () {
                this.order_status = 'pending';
            }
        }],
        DigitalIO: [{
            $relay: function (index, state) {
                this.relay1 = state;
            }
        }],
        System: [{
            "phone_quick_dial": "0408419954",
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

            $vc_content: function (out, inp) {
                this.vc_content_source = inp;
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
            "mics_mutes": [105, 106, 107],
            "name": "Ballet Rehearsal Room",
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown",
            "tab": "Presentation",
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
            "audio_sources": [
                "Bluetooth",
                "Mini-jack 202",
                "Minijack 203",
                "USB Audio"
            ],
            "vol_max": 200,
  "vol_min": -1000,
  "audio_inputs": [
    "bluetooth",
    "usb",
    "mini3_5",
    "xlr_1",
    "xlr_2"
  ],
  "inputs": [
      "Presentation",
      "TV"
  ],
  "Presentation": [
    "laptop_hdmi",
    "sdi",
    "long_view",
    "television"
  ],
  "TV": [
    "television"
  ],
  "sources": {
    "laptop_hdmi": {
        "title": "HDMI Input",
        "mixer_id": ["BRRSourceMixer:Mixer18x1Input3Gain", "BRRSourceMixer:Mixer18x1Input4Gain"],
        "feedback_id": "BRRSourceMixer:Mixer18x1Input3Gain",
        "mute_id": ["BRRSourceMixer:Mixer18x1Input3Mute", "BRRSourceMixer:Mixer18x1Input4Mute"],
        "mute_feedback_id": "BRRSourceMixer:Mixer18x1Input3Mute",

        "input": 1,
        "source": "hdmi",
        "type": "aux_hdmi"
    },
    "sdi": {
        "title": "SDI (no audio)",
        "no_audio": true,

        "input": 2,
        "source": "hdmi",
        "type": "usb"
    },
    "long_view": {
        "title": "Venue Long View",
        "mixer_id": ["BRRSourceMixer:Mixer18x1Input3Gain", "BRRSourceMixer:Mixer18x1Input4Gain"],
        "feedback_id": "BRRSourceMixer:Mixer18x1Input3Gain",
        "mute_id": ["BRRSourceMixer:Mixer18x1Input3Mute", "BRRSourceMixer:Mixer18x1Input4Mute"],
        "mute_feedback_id": "BRRSourceMixer:Mixer18x1Input3Mute",

        "input": 3,
        "source": "hdmi",
        "type": "aux_hdmi"
    },
    "television": {
        "title": "TV",
        "mixer_id": ["BRRSourceMixer:Mixer18x1Input3Gain", "BRRSourceMixer:Mixer18x1Input4Gain"],
        "feedback_id": "BRRSourceMixer:Mixer18x1Input3Gain",
        "mute_id": ["BRRSourceMixer:Mixer18x1Input3Mute", "BRRSourceMixer:Mixer18x1Input4Mute"],
        "mute_feedback_id": "BRRSourceMixer:Mixer18x1Input3Mute",

        "input": 4,
        "source": "hdmi",
        "type": "aux_hdmi"
    },

    "pa_patch_1": {
        "title": "PA 03 Patch 1",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input1Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input1Mute"
    },
    "pa_patch_2": {
        "title": "PA 03 Patch 2",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input2Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input2Mute"
    },
    "bluetooth": {
        "title": "Bluetooth",
        "no_mod": true,
        "mixer_id": ["BRRSourceMixer:Mixer18x1Input5Gain", "BRRSourceMixer:Mixer18x1Input6Gain"],
        "feedback_id": "BRRSourceMixer:Mixer18x1Input5Gain",
        "mute_id": ["BRRSourceMixer:Mixer18x1Input5Mute", "BRRSourceMixer:Mixer18x1Input6Mute"],
        "mute_feedback_id": "BRRSourceMixer:Mixer18x1Input5Mute"
    },
    "usb": {
        "title": "USB Audio",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input7Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input7Mute"
    },
    "xlr_1": {
        "title": "BRR XLR 1",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input8Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input8Mute"
    },
    "xlr_2": {
        "title": "BRR XLR 2",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input9Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input9Mute"
    },
    "mini3_5": {
        "title": "BRR Mini-Jack",
        "no_mod": true,
        "mixer_id": ["BRRSourceMixer:Mixer18x1Input10Gain", "BRRSourceMixer:Mixer18x1Input11Gain"],
        "feedback_id": "BRRSourceMixer:Mixer18x1Input10Gain",
        "mute_id": ["BRRSourceMixer:Mixer18x1Input10Mute", "BRRSourceMixer:Mixer18x1Input11Mute"],
        "mute_feedback_id": "BRRSourceMixer:Mixer18x1Input10Mute"
    },
    "dante_1": {
        "title": "Dante 1",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input12Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input12Mute"
    },
    "dante_2": {
        "title": "Dante 2",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input13Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input13Mute"
    },
    "dante_3": {
        "title": "Dante 3",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input14Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input14Mute"
    },
    "dante_4": {
        "title": "Dante 4",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input15Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input15Mute"
    },
    "dante_5": {
        "title": "Dante 5",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input16Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input16Mute"
    },
    "dante_6": {
        "title": "Dante 6",
        "no_mod": true,
        "mixer_id": "BRRSourceMixer:Mixer18x1Input17Gain",
        "mute_id": "BRRSourceMixer:Mixer18x1Input17Mute"
    }
  },
  "outputs": {
      "Display_1": {
          "output": 1,
          "type": "lcd",
          "pri": 1,
          "title": "Display",
          "hide_audio": true
      }
  },
  "lighting_group": 4,
  "trigger_app": 20,
  "lights": {
    "levels": [
      {"name": "Full", "trigger": 255},
      {"name": "Screen Scene", "trigger": 1},
      {"name": "Mirror Scene", "trigger": 2},
      {"name": "Low", "trigger": 10},
      {"name": "Off", "trigger": 0},
    ]
  },
            "mics": [{
                "name": "PA-03 Patch 1",
                "basic_mixer": true,
                "no_mute": true,
                "id": "BRRMic/LineInH.P.SOH-BRR-IO-Frame-1SlotAChannel1PreampGain",
                "min": -1000,
                "max": 200
            }, {
                "name": "PA-03 Patch 2",
                "basic_mixer": true,
                "no_mute": true,
                "id": "BRRMic/LineInH.P.SOH-BRR-IO-Frame-1SlotAChannel2PreampGain",
                "min": -1000,
                "max": 200
            }
            , {
                "name": "BRR PA-01 XLR 1",
                "basic_mixer": true,
                "no_mute": true,
                "id": "BRRAtteroTechUnD4I-LInputGain1",
                "min": -1000,
                "max": 200
            }, {
                "name": "BRR PA-01 XLR 2",
                "basic_mixer": true,
                "no_mute": true,
                "id": "BRRAtteroTechUnD4I-LInputGain2",
                "min": -1000,
                "max": 200
            }],
            $lights_to: function (level) {
                this.light_level = level;
            },
            $share_volume: function (disp, vol) {
                this[disp + '_volume'] = parseInt(vol);
            }
        }],
        Mixer: [{
            fader106: 1,
            fader107: 2,
            fader105: -25,
            fader32: -30,
            fader107_mute: true,
            "16-10pVcRoomPhoneDialString": '1234',
            $fader: function (fader, volume) {
                this['fader' + fader] = volume;
            },
            $mute: function (fader, mute) {
                var self = this;
                if (fader[0]) {
                    angular.forEach(fader, function (fad) {
                        self['fader' + fad + '_mute'] = mute;
                    });
                } else {
                    this['fader' + fader + '_mute'] = mute;
                }
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
        Skype: [{
            room_user: "meeting.room.email",
            incoming_call: false,
            $mute: function () {
                console.log('testing');
                self.incomming_call = true;
                self.incoming_call = true;
            }
        }],
        Display: [{
            $mute: function (mute) {
                this.mute = mute;
            }
        },{
            $mute: function (mute) {
                this.mute = mute;
            }
        }],
        VidConf: [{
            results_total: 0,
            search_results: [
                {
                    methods: [{
                        contactmethodid: "1",
                        number: "10.243.218.232",
                        calltype: "Video"
                    }],
                    name: "Rabobank Sydney - Garden Amphitheater",
                    contactid: "localContactId-3",
                    title: "Rabobank Sydney"
                },
                {
                    methods: [{
                        contactmethodid: "1",
                        number: "10.243.218.230",
                        calltype: "Video"
                    }],
                    name: "Rabobank Sydney - Macarthur Room",
                    contactid: "localContactId-1",
                    title: "Rabobank Sydney"
                },
                {
                    methods: [{
                        contactmethodid: "1",
                        number: "10.243.218.232",
                        calltype: "Video"
                    }],
                    name: "Rabobank Sydney - Garden Amphitheater",
                    contactid: "localContactId-3",
                    title: "Rabobank Sydney"
                }
            ],
            call_status: {
                id: 12

            },
            $show_camera_pip: function (val) {
                this.camera_pip = val;
            },
            $dial: function (str) {
                this.call_status = {
                    answerstate: "Unanswered",
                    callbacknumber: "h323:10.243.218.235",
                    callpriority: "None",
                    calltype: "Video",
                    devicetype: "Endpoint",
                    direction: "Incoming",
                    displayname: "RAIFFEISEN",
                    duration: "3647017",
                    encryption: "Aes-128",
                    facilityserviceid: "0",
                    id: 11,
                    modifystate: "Idle",
                    placedonhold: "False",
                    protocol: "h323",
                    receivecallrate: "1920",
                    remotenumber: "10.243.218.235",
                    status: "Ringing",
                    transmitcallrate: "1920",
                };
            },
            $call: function (func, val) {
                if (func == 'disconnect') {
                    this.call_status = {};
                } else if (func == 'hold' || func == 'resume') {
                    this.call_status = {
                        answerstate: "Unanswered",
                        callbacknumber: "h323:10.243.218.235",
                        callpriority: "None",
                        calltype: "Video",
                        devicetype: "Endpoint",
                        direction: "Incoming",
                        displayname: "RAIFFEISEN",
                        duration: "3647017",
                        encryption: "Aes-128",
                        facilityserviceid: "0",
                        id: 11,
                        modifystate: "Idle",
                        placedonhold: "False",
                        protocol: "h323",
                        receivecallrate: "1920",
                        remotenumber: "10.243.218.235",
                        status: func == 'hold' ? "OnHold" : "Ringing",
                        transmitcallrate: "1920",
                    };
                }
            }
        }]
    };

}(this, this.angular));
