(function (window, angular) {
    'use strict';

    window.systemData['sys-B1'] = {
        System: [{
            "$powerup": function () {
                this.state = "online";
                this.tab = this.inputs[0];
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
            "name": "Demo Pod",
            "help_msg": "For help please call <strong>0408419954</strong>",
            "state": "shutdown",
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
                "Laptop"
            ],
            "cameras": [
                "Renewables Workshop",
                "Outdoor Solar",
                "BSI Level 1",
                "BSI Level 2",
                "BSI Level 3",
                "Instrumentation & Mechanical",
                "Gas Services",
                "Electrical & HVAC South",
                "Electrical & HVAC North",
                "Finishing & Wallpaper",
                "Furniture Finishing",
                "Painting & Decorating North",
                "Painting & Decorating South",
                "Plastering North",
                "Plastering South",
                "Brick Laying",
                "Timber Installation North East",
                "Scaffolding",
                "Timber & Roof Installation North",
                "Basic Hand Skills",
                "Timber Installation North West",
                "Timber Installation South West",
                "Primary Mill North East",
                "Secondary Mill South East",
                "Primary Mill North West",
                "Secondary Mill South West",
                "Glass",
                "Aluminium",
                "rick & Tile Cutting"
            ],
            "PC": [
                "g1_pc1"
            ],
            "Laptop": [
                "hdmi_connection"
            ],
            "sources": {
                "g1_pc1": {
                    "title": "PC1",
                    "source": "hdmi",
                    "type": "residentpc",
                    "mod": "Computer",
                    "index": 1,
                    "hasPTZ": true
                },
                "hdmi_connection": {
                    "title": "1G1 Laptop",
                    "source": "hdmi",
                    "type": "aux_hdmi"
                }
            },
            "outputs": {
                "Display_1": {
                    "type": "lcd",
                    "pri": 1,
                    "title": "Main Display"
                }
            },
            "vol_max": 60,
            "vol_min": 0
        }],
        Computer: [{}],
        Camera: [{
            joy_right: 0x99,
            joy_left: 0x1,
            joy_center: 0x50,
            zoom: 25
        }],
        Display: [{}]
    };

}(this, this.angular));
