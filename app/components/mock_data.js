(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server

    window.systemData = window.systemData || {};

    window.systemData['sys-B0'] = {
        Television: [{
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
                "Colour Bars",
                "Concert Hall Long View Camera",
                "AUX SDI 1",
                "Joan Sutherland Theatre Long View Camera",
                "AUX SDI 2",
                "Drama Theatre Long View Camera",
                "The Studio Long View Camera",
                "Play House Theatre Long View Camera",
                "Utzon Room Long View Camera",
                "AUX HDMI 1"
            ],
            $goto: function(name) {
                this.channelName = name;
            }
        }]
    };

}(this, this.angular));
