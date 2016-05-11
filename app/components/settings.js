(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        Computer: [{
            authenticated: 1
        }],
        System: [{
            "title": "Studio Projector",
            "tours_pin": "1234",
            "tech_pin": "1978",

            "skip_pin": true,

            // power on/off
            "state": "shutdown",
            $powerup: function() {
                this.state = 'online';
            },

            $shutdown: function() {
                this.state = 'shutdown';
                for (var i = 0; i < this.$_self.Display.length; i += 1) {
                    this.$_self.Display[i].power = false;
                }
            },

            // picture mute
            "muted": false,
            $toggle_mute: function() {
                this.muted = !this.muted;
            },

            // present content
            "group_id": "grp-B2",
            "sources": {
                "default": {
                    "input": 1,
                    "source": "hdmi1"
                }
            },

           $present: function(tab) {
            }
        }],

        /*Screen: [{
            "down": false
        }],*/

        Display: [{
            "power": false
        }]
    };

    angular.module('AcaEngine')
        .run([
            '$window',
            '$location',
            '$rootScope',
            'cacheman',
            '$timeout',
            '$comms',

        function ($window, $location, $rootScope, cacheman, $timeout, $comms) {

            // Grab the system id from the URL
            $rootScope.$watch(function () {
                return $location.search();
            }, function (value) {
                $rootScope.controlSystem = value.channel;
                $rootScope.groupID = value.group;
            });

            // this should go in config?
            $rootScope.scheduleCreateURL = '/api/schedules';
            $rootScope.languagesQueryURL = '/api/groups?mine=true&offset=0&q=ToursGroup';
            $rootScope.playlistsQueryPrefix = '/api/groups/';

            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
