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
            "name": "Western Foyers",
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown",
            "tab": "Laptop",
            "inputs": [
                "Laptop",
                "PC"
            ],
            "PC": [
                "sign1",
                "sign2",
                "sign3"
            ],
            "Laptop": [
                "laptop1",
                "laptop2",
                "laptop3"
            ],
            "sources": {
                "sign1": {
                    "title": "Playhouse Signage",
                    "input": 5,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "sign2": {
                    "title": "Studio Signage",
                    "input": 6,
                    "source": "hdmi",
                    "type": "residentpc"
                },
                "sign3": {
                    "title": "Drama Signage",
                    "input": 7,
                    "source": "hdmi",
                    "type": "residentpc"
                },

                "laptop1": {
                    "title": "Playhouse AUX",
                    "input": 1,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                },
                "laptop2": {
                    "title": "Studio AUX",
                    "input": 2,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                },
                "laptop3": {
                    "title": "Drama AUX",
                    "input": 3,
                    "source": "hdmi",
                    "type": "aux_hdmi"
                }
            },
            "outputs": {
                "Display_1": {
                    "lifter": {
                        "module": "Lifter_1",
                        "index": 1
                    },
                    "output": 1,
                    "no_audio": true,
                    "type": "projector",
                    "pri": 1,
                    "title": "Playhouse"
                },
                "Display_2": {
                    "lifter": {
                        "module": "Lifter_2",
                        "index": 1
                    },
                    "output": 2,
                    "no_audio": true,
                    "type": "projector",
                    "pri": 1,
                    "title": "Studio"
                },
                "Display_3": {
                    "lifter": {
                        "module": "Lifter_3",
                        "index": 1
                    },
                    "output": 3,
                    "no_audio": true,
                    "type": "projector",
                    "pri": 1,
                    "title": "Drama"
                }
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
        },{
            $mute: function (mute) {
                this.mute = mute;
            }
        }]
    };

}(this, this.angular));
