(function (window, angular) {
    'use strict';

    // NOTE:: window.systemData is used for development.
    //  In production the interface will obtain this information from the server

    window.systemData = window.systemData || {};

    window.systemsList = [
        'sys-B0',
        'sys-B1',
        'sys-B2',
        'sys-B3',
        'sys-B4',
        'sys-B5',
        'sys-B6',
        'sys-B7',
        'sys-B8'
    ];

    window.systemData['sys-B0'] = {
        System: [{
            "name": "Room 1",
            "cameras": [
                "10.213.0.1",
                "10.213.0.2"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B1'] = {
        System: [{
            "name": "Room 2",
            "cameras": [
                "10.213.0.3",
                "10.213.0.4"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B2'] = {
        System: [{
            "name": "Room 3",
            "cameras": [
                "10.213.0.5",
                "10.213.0.6"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B3'] = {
        System: [{
            "name": "Room 4",
            "cameras": [
                "10.213.0.7",
                "10.213.0.8"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B4'] = {
        System: [{
            "name": "Room 5",
            "cameras": [
                "10.213.0.9",
                "10.213.0.10"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B5'] = {
        System: [{
            "name": "Room 6",
            "cameras": [
                "10.213.0.11",
                "10.213.0.12"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B6'] = {
        System: [{
            "name": "Room 7",
            "cameras": [
                "10.213.0.13",
                "10.213.0.14"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B7'] = {
        System: [{
            "name": "Room 8",
            "cameras": [
                "10.213.0.15",
                "10.213.0.16"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B8'] = {
        System: [{
            "name": "Room 9",
            "cameras": [
                "10.213.0.17",
                "10.213.0.18"
            ]
        }],

        Recorder: [{
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

}(this, this.angular));
