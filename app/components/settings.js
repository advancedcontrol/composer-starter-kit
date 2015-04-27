(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        System: [{
            "title": "White Lady Demo Room 1",

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

            // present content
            "room_id": "rom-B0",
            "sources": {
                "default": {
                    "input": 1,
                    "source": "hdmi1"
                }
            }
        }],

        Display: [{
            "power": false,
            "muted": false
        }],

        Mixer: [{
            "muted": false,
            "volume": 100,
            "audio_source": "Computer",
            "video_source": "Computer"
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
                $rootScope.controlSystem = value.channel || 'sys-B0';
                $rootScope.groupID = value.group;
            });


            $rootScope.showPopup = function (name) {
                var newVal = !$rootScope[name]

                $rootScope.showDvd = false;
                $rootScope.showMics = false;
                $rootScope.showDisplay = false;
                $rootScope.showCamera = false;

                $rootScope[name] = newVal;
            };

            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
