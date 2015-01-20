(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server
    //  
    window.systemData = window.systemData || {};
    window.systemData['sys-B0'] = {
        System: [{
            "title": "Western Foyers",

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

            // input tabs
            "inputs": [
                "Loops",
                "TV"
            ],
            "tab": "Loops",
            $tab: function(tab) {
                this.tab = tab;
            },

            // tab content
            "Loops": [
                /*"dining",
                "education",
                "events",
                "history",
                "sponsors",
                "tours"*/
                "mandarin",
                "korean",
                "japanese",
                "german",
                "english",
                "french"
            ],
            "TV": [
                "abc",
                "sbs",
                "c7",
                "c9",
                "c10"
            ],
            "sources": {
                // loops
                "english": {
                    "title": "English",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop",
                    "playlist_id": "ply-BO",
                    "image": "branding/images/oh/tours.jpg",
                    "dur": "2:43"
                },
                "mandarin": {
                    "title": "Mandarin",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop",
                    "playlist_id": "ply-BO",
                    "image": "branding/images/oh/sponsors.jpg",
                    "dur": "2:43"
                },
                "japanese": {
                    "title": "Japanese",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop",
                    "playlist_id": "ply-BO",
                    "image": "branding/images/oh/history.jpg",
                    "dur": "2:43"
                },
                "korean": {
                    "title": "Korean",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop",
                    "playlist_id": "ply-kor",
                    "image": "branding/images/oh/events.jpg",
                    "dur": "2:43"
                },
                "german": {
                    "title": "German",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop",
                    "playlist_id": "ply-ger",
                    "image": "branding/images/oh/education.jpg",
                    "dur": "2:43"
                },
                "french": {
                    "title": "French",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop",
                    "playlist_id": "ply-fre",
                    "image": "branding/images/oh/dining.jpg",
                    "dur": "2:43"
                },

                /*"dining": {
                    "title": "Dining",
                    "dur": "6:33",
                    "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod erat volutpat.",
                    "image": "",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop"
                },
                "education": {
                    "title": "Education",
                    "dur": "4:21",
                    "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod erat volutpat.",
                    "image": "",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop"
                },
                "events": {
                    "title": "Events",
                    "dur": "3:19",
                    "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod erat volutpat.",
                    "image": "",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop"
                },
                "history": {
                    "title": "History",
                    "dur": "5:29",
                    "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod erat volutpat.",
                    "image": "",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop"
                },
                "sponsors": {
                    "title": "Sponsors",
                    "dur": "4:21",
                    "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod erat volutpat.",
                    "image": "",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop"
                },
                "tours": {
                    "title": "Tours",
                    "dur": "7:43",
                    "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod erat volutpat.",
                    "image": "branding/images/oh/tours.jpg",
                    "input": 1,
                    "source": "hdmi1",
                    "type": "loop"
                },*/

                // tv channels
                "abc": {
                    "title": "ABC",
                    "image": "branding/images/oh/abc.jpg",
                    "input": 2,
                    "source": "hdmi2",
                    "type": "tv"
                },
                "sbs": {
                    "title": "SBS",
                    "image": "branding/images/oh/sbs.png",
                    "input": 2,
                    "source": "hdmi2",
                    "type": "tv"
                },
                "c7": {
                    "title": "Channel 7",
                    "image": "branding/images/oh/c7.jpg",
                    "input": 2,
                    "source": "hdmi2",
                    "type": "tv"
                },
                "c9": {
                    "title": "Channel 9",
                    "image": "branding/images/oh/c9.jpg",
                    "input": 2,
                    "source": "hdmi2",
                    "type": "tv"
                },
                "c10": {
                    "title": "Channel 10",
                    "image": "branding/images/oh/c10.jpg",
                    "input": 2,
                    "source": "hdmi2",
                    "type": "tv"
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
    
        // The authentication service doesn't have to be hosted on the same domain
        // as the control service - hence the complexity of this configuration
        .config([
            '$composerProvider',
            '$locationProvider',

        function(comms) {
            // Point these variables to your ACA Engine instance
            // to start interacting with it using ACA Composer
            comms.port  = 80;
            comms.host  = '10.71.1.248';
            comms.tls   = false;

            // This outputs debugging information to console useful
            // if you want to see the communications occurring
            // between the interface and ACA Engine.
            //
            // Should be commented out for production
            comms.debug = true;

            // If you would like to use Authentication then you
            // must point this configuration to your compatible oauth server
            //
            // It's a lazy authentication process so only if a request
            // is made to a protected endpoint or a 401 is received will
            // the auth process activate.
            comms.useService({
                id: 'AcaEngine',
                scope: 'public',
                oauth_server: 'http://sohiptva.soh.com/auth/oauth/authorize',
                oauth_tokens: 'http://sohiptva.soh.com/auth/token',
                redirect_uri: 'http://sohiptva.soh.com/oauth-resp.html',
                client_id: 'df46d04043f6fe1d9949d9effba43b25b664064addfe4670aae8a24fe3f3f570',
                api_endpoint: '/api',
                proactive: true
            });
        }])

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

            // this should go in config?
            $rootScope.scheduleCreateURL = 'http://0.0.0.0:9000/api/schedules';

            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });

            // If auth is in use and we want to trust the device
            // i.e. we don't want to have to log in every time
            // The trust URL would look like: 'http://localhost/#/?trust#sys-id'
            if ($location.search().trust && !$comms.isRemembered('AcaEngine')) {
                // We need time to let the directive load.
                // This will not be required in the future
                $timeout(function () {
                    $comms.rememberMe('AcaEngine');
                }, 0);
            }
        }]);

}(this, this.angular));
