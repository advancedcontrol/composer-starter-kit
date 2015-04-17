(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server

    window.systemData = window.systemData || {};

    window.systemData['sys-B0'] = {
        Television: [{
            "channelName": "Some example channel",
            "channelNames": [
                "channel 7",
                "channel 10"
            ],
            $goto: function(name) {
                this.channelName = name;
            }
        }]
    };

}(this, this.angular));
