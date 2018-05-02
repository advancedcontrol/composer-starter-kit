(function (window, angular) {
    'use strict';

    var vc_results = [{"name":"105 Phillip 1.01 Multifunction VC Restricted (50 Max)", "phone":"34543545"}, {"name":"105 Phillip 1.02 Multifunction VC Restricted (50 Max)", "phone":null, "department":null, "email":"105Phillip102@det.nsw.edu.au"}, {"name":"105 Phillip 1.03 Multifunction VC Restricted (50 Max)", "phone":null, "department":null, "email":"105Phillip103@det.nsw.edu.au"}, {"name":"105 Phillip 1.04 Immersive Restricted (20 Max)", "phone":null, "department":null, "email":"105Phillip104@det.nsw.edu.au"}, {"name":"105 Phillip 1.05 Surface Hub Restricted (16 Max)", "phone":null, "department":null, "email":"105Phillip105@det.nsw.edu.au"}, {"name":"105 Phillip 1.06 VC Restricted (12 Max)", "phone":null, "department":null, "email":"105Phillip106@det.nsw.edu.au"}, {"name":"105 Phillip 1.07 VC Restricted (12 Max)", "phone":null, "department":null, "email":"105Phillip107@det.nsw.edu.au"}, {"name":"105 Phillip 1.08 VC Restricted (12 Max)", "phone":null, "department":null, "email":"105Phillip108@det.nsw.edu.au"}, {"name":"105 Phillip 1.09 VC Restricted (8 Max)", "phone":null, "department":null, "email":"105Phillip109@det.nsw.edu.au"}, {"name":"105 Phillip 1.10 VC Restricted (8 Max)", "phone":null, "department":null, "email":"105Phillip110@det.nsw.edu.au"}, {"name":"105 Phillip 1.11 VC Restricted (8 Max)", "phone":null, "department":null, "email":"105Phillip111@det.nsw.edu.au"}, {"name":"105 Phillip 1.12 VC Restricted (4 Max)", "phone":null, "department":null, "email":"105Phillip112@det.nsw.edu.au"}, {"name":"105 Phillip 1.13 VC Restricted (4 Max)", "phone":null, "department":null, "email":"105Phillip113@det.nsw.edu.au"}, {"name":"105 Phillip 1.14 VC Restricted (4 Max)", "phone":null, "department":null, "email":"105Phillip114@det.nsw.edu.au"}, {"name":"105 Phillip 1.15 VC (4 Max)", "phone":null, "department":null, "email":"105Phillip115@det.nsw.edu.au"}, {"name":"105 Phillip 10.01 Team Room VC  (16 Max)", "phone":null, "department":null, "email":"105Phillip1001@det.nsw.edu.au"}, {"name":"105 Phillip 10.02  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1002@det.nsw.edu.au"}, {"name":"105 Phillip 10.03  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1003@det.nsw.edu.au"}, {"name":"105 Phillip 10.06  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1006@det.nsw.edu.au"}, {"name":"105 Phillip 10.07  VC  (8 Max)", "phone":null, "department":null, "email":"105Phillip1007@det.nsw.edu.au"}, {"name":"105 Phillip 10.08  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1008@det.nsw.edu.au"}, {"name":"105 Phillip 10.11  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1011@det.nsw.edu.au"}, {"name":"105 Phillip 10.12  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1012@det.nsw.edu.au"}, {"name":"105 Phillip 10.13  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1013@det.nsw.edu.au"}, {"name":"105 Phillip 10.16  VC  (8 Max)", "phone":null, "department":null, "email":"105Phillip1016@det.nsw.edu.au"}, {"name":"105 Phillip 10.17  VC  (4 Max)", "phone":null, "department":null, "email":"105Phillip1017@det.nsw.edu.au"}, {"name":"105 Phillip 10.20 Open Project Space Surface Hub", "phone":null, "department":null, "email":"105Phillip1020@det.nsw.edu.au"}, {"name":"105 Phillip 10.23 Open Project Space Surface Hub", "phone":null, "department":null, "email":"105Phillip1023@det.nsw.edu.au"}, {"name":"105 Phillip 10.26 Open Project Space Surface Hub", "phone":null, "department":null, "email":"105Phillip1026@det.nsw.edu.au"}, {"name":"105 Phillip 11.01 Team Room VC  (16 Max)", "phone":null, "department":null, "email":"105Phillip1101@det.nsw.edu.au"}];

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B9'] = {
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
            // "commands": ["Power on/off"],
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
            zoom: 25,
            "presets": ["Other", "Lectern"]
        },
        {
            joy_right: -0x14,
            joy_left: 0x14,
            joy_center: 0,
            zoom: 80,
            "presets": ["Test", "Lectern"]
        }],
        DigitalIO: [{
            $relay: function (index, state) {
                this.relay1 = state;
            }
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
            $select_camera: function (src, input, output) {
                this.selected_camera = src;
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
            "mics": [
                {
                    name: "Some other mic",
                    mute_id: "test",
                    id: "fader",
                    basic_mixer: true
                },
                {
                    name: "Toogle Mute",
                    no_mute: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Other Mute",
                    mute_only: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Toogle Mute",
                    no_mute: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Other Mute",
                    mute_only: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Toogle Mute",
                    no_mute: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Other Mute",
                    mute_only: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Toogle Mute",
                    no_mute: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Other Mute",
                    mute_only: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Toogle Mute",
                    no_mute: true,
                    mute_id: "test",
                    basic_mixer: true
                },
                {
                    name: "Other Mute",
                    mute_only: true,
                    mute_id: "test",
                    basic_mixer: true
                }
            ],
            "name": "Team Room",
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
            "inputs": [
                "Presentation",
                "VC",
                "TV",
                "Streaming"
            ],
            "TV": [
                "tv_input"
            ],
            "PC": [
                "g1_pc1"
            ],
            "Chromebox": [
                "g1_pc1"
            ],
            "Presentation": [
                "laptop_wireless",
                "laptop_g1",
                "laptop_g2",
                "training_cam",
                "digital_signage"
            ],
            "WePresent": [
                "laptop_wireless"
            ],
            "Laptop": [
                "laptop_usb",
                "laptop_wireless"
            ],
            "Wired": [
                "laptop_usb",
                "laptop_wireless"
            ],
            "VC": [
                "video_conf"
            ],
            "Streaming": [
                "training_cam2"],
            "Camera": [
                "training_cam",
                "training_cam2"
            ],
            "selected_camera": "training_cam",
            "vc_sources": {
                "digital_signage": {
                    "title": "Digital signage",
                    "input": 2,
                    "source": "hdmi",
                    "type": "signage",
                    "colour": "#FFDB8E"
                },
                "tv_input": {
                    "title": "TV",
                    "input": 14,
                    "source": "hdmi",
                    "type": "TV",
                    "colour": "#F58172",
                    "not_vc_content": true
                },
                "g1_pc1": {
                    "title": "Resident PC",
                    "input": 14,
                    "source": "hdmi",
                    "type": "chromebox",
                    "colour": "#F58172"
                }
            },
            "sources": {
                "digital_signage": {
                    "title": "Digital signage",
                    "input": 2,
                    "source": "hdmi",
                    "type": "signage",
                    "colour": "#FFDB8E"
                },
                "tv_input": {
                    "title": "TV",
                    "input": 14,
                    "source": "hdmi",
                    "type": "TV",
                    "colour": "#F58172",
                    "not_vc_content": true
                },
                "g1_pc1": {
                    "title": "Resident PC",
                    "input": 14,
                    "source": "hdmi",
                    "type": "chromebox",
                    "colour": "#F58172"
                },
                "laptop_g1": {
                    "title": "Tablebox front",
                    "input": 11,
                    "source": "hdmi",
                    "type": "aux_hdmi",
                    "colour": "#7BB5D0"
                },
                "laptop_g2": {
                    "title": "Tablebox rear",
                    "input": 2,
                    "source": "hdmi",
                    "type": "aux_hdmi",
                    "colour": "#FFDB8E"
                },
                "laptop_usb": {
                    "title": "Laptop wireless",
                    "input": 2,
                    "source": "hdmi",
                    "type": "wireless",
                    "colour": "#FFDB8E"
                },
                "laptop_wireless": {
                    "title": "Laptop wireless",
                    "input": 2,
                    "source": "hdmi",
                    "type": "wireless",
                    "colour": "#FFDB8E"
                },
                "video_conf": {
                    "title": "Video conference",
                    "input": 9,
                    "source": "hdmi",
                    "type": "presenter",
                    "colour": "#65DCC7"
                },
                "training_cam": {
                    "auto_camera": true,
                    "title": "Camera front",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 1,
                    "ignore": true,
                    "presets": [{
                        "name": "Wide Right",
                        "number": 2
                    }, {
                        "name": "Zoom Lectern",
                        "lookup": "wide_right"
                    }]
                },
                "training_cam2": {
                    "title": "Camera rear",
                    "type": "vc-camera",
                    "mod": "Camera",
                    "index": 2,
                    "ignore": true,
                    "presets": [{
                        "name": "Window Shot",
                        "number": 1
                    }]
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
                    "basic_mixer": true,
                    "type": "lcd",
                    "pri": 1,
                    "title": "Left",
                    "single_audio_out": true
                },
                "Display_2": {
                    "output": [
                        3,
                        23
                    ],
                    "audio_out": 21,
                    "mixer_id": 105,
                    "basic_mixer": true,
                    "type": "lcd",
                    "pri": 1,
                    "title": "Right",
                    "single_audio_out": true
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
        Display: [{
            $mute: function (mute) {
                this.mute = mute;
            }
        },{
            $mute: function (mute) {
                this.mute = mute;
            }
        },{
            $mute: function (mute) {
                this.mute = mute;
            }
        }],
        Bookings: [{
            name: "test",
            searching: false,
            $directory_search: function() {
                this.searching = !this.searching;
                this.directory = JSON.parse(JSON.stringify(vc_results));
            },
            directory: []
        }],
        VidConf: [{
            searching: true,
            results_total: 3,
            $search: function() {
                this.searching = !this.searching;
                this.search_results = vc_results;
            },
            search_results: [],
            call_status: {
                id: 12
                
            },
            $show_camera_pip: function (val) {
                this.camera_pip = val;
            },
            $dial: function (str) {
                this.call_status = {
                    answerstate: "Unanswered",
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
            $button_press: function (val) {
                if (val == 'hangup') {
                    this.call_status = {};
                }
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
