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
        Recorder: [{
            "name": "Room 1",
            "cameras": [
                "10.213.0.1",
                "10.213.0.2"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B1'] = {
        Recorder: [{
            "name": "Room 2",
            "cameras": [
                "10.213.0.3",
                "10.213.0.4"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B2'] = {
        Recorder: [{
            "name": "Room 3",
            "cameras": [
                "10.213.0.5",
                "10.213.0.6"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B3'] = {
        Recorder: [{
            "name": "Room 4",
            "cameras": [
                "10.213.0.7",
                "10.213.0.8"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B4'] = {
        Recorder: [{
            "name": "Room 5",
            "cameras": [
                "10.213.0.9",
                "10.213.0.10"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B5'] = {
        Recorder: [{
            "name": "Room 6",
            "cameras": [
                "10.213.0.11",
                "10.213.0.12"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B6'] = {
        Recorder: [{
            "name": "Room 7",
            "cameras": [
                "10.213.0.13",
                "10.213.0.14"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B7'] = {
        Recorder: [{
            "name": "Room 8",
            "cameras": [
                "10.213.0.15",
                "10.213.0.16"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

    window.systemData['sys-B8'] = {
        Recorder: [{
            "name": "Room 9",
            "cameras": [
                "10.213.0.17",
                "10.213.0.18"
            ],
            "recording": false,
            $toggle_recording: function() {
                this.recording = !this.recording;
            }
        }]
    };

}(this, this.angular));
