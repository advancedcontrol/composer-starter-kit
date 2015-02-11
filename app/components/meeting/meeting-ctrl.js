(function (angular) {
    'use strict';

    var TODAY = new Date();
    var YEAR = TODAY.getFullYear();
    var MONTH = TODAY.getMonth();
    var DAY = TODAY.getDate();

    var MEETING = {
        name: 'Meeting 1',
        playlists: [
            {
                id: 1,
                index: 1,
                name: 'Intro Music',
                audio: true,
                video: false,
                duration: 300,
                auto_next: false,
                entries: [
                    {
                        id: 1,
                        name: 'Track 1',
                        duration: 100,
                        transition: 2,
                        index: 1,
                        media_type: 2
                    },
                    {
                        id: 2,
                        name: 'Track 2',
                        duration: 50,
                        transition: 2,
                        index: 2,
                        media_type: 2
                    },
                    {
                        id: 3,
                        name: 'Track 3',
                        duration: 150,
                        transition: 2,
                        index: 3,
                        media_type: 2
                    }
                ]
            },
            {
                id: 2,
                index: 2,
                name: 'Photos',
                audio: false,
                video: true,
                duration: 75,
                auto_next: false,
                repeat: true,
                entries: [
                    {
                        id: 4,
                        name: 'Photo 1',
                        duration: 15,
                        transition: 2,
                        index: 1,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster1.jpg'
                    },
                    {
                        id: 5,
                        name: 'Photo 2',
                        duration: 15,
                        transition: 2,
                        index: 2,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster2.jpg'
                    },
                    {
                        id: 6,
                        name: 'Photo 3',
                        duration: 15,
                        transition: 2,
                        index: 3,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster3.jpg'
                    },
                    {
                        id: 7,
                        name: 'Photo 4',
                        duration: 15,
                        transition: 2,
                        index: 4,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster4.jpg'
                    },
                    {
                        id: 8,
                        name: 'Photo 5',
                        duration: 15,
                        transition: 2,
                        index: 5,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster5.jpg'
                    }
                ]
            }
        ]
    };

    var IMPROMPTU = {
        name: 'Impromptu Meeting',
        playlists: [
            {
                id: 1,
                index: 1,
                name: 'USB - Audio Content',
                audio: true,
                video: false,
                duration: 300,
                auto_next: false,
                entries: [
                    {
                        id: 1,
                        name: 'Track 1',
                        duration: 100,
                        transition: 2,
                        index: 1,
                        media_type: 2
                    },
                    {
                        id: 2,
                        name: 'Track 2',
                        duration: 50,
                        transition: 2,
                        index: 2,
                        media_type: 2
                    },
                    {
                        id: 3,
                        name: 'Track 3',
                        duration: 150,
                        transition: 2,
                        index: 3,
                        media_type: 2
                    }
                ]
            },
            {
                id: 2,
                index: 2,
                name: 'USB - Image Content',
                audio: false,
                video: true,
                duration: 75,
                auto_next: false,
                repeat: true,
                entries: [
                    {
                        id: 4,
                        name: 'Photo 1',
                        duration: 15,
                        transition: 2,
                        index: 1,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster1.jpg'
                    },
                    {
                        id: 5,
                        name: 'Photo 2',
                        duration: 15,
                        transition: 2,
                        index: 2,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster2.jpg'
                    },
                    {
                        id: 6,
                        name: 'Photo 3',
                        duration: 15,
                        transition: 2,
                        index: 3,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster3.jpg'
                    },
                    {
                        id: 7,
                        name: 'Photo 4',
                        duration: 15,
                        transition: 2,
                        index: 4,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster4.jpg'
                    },
                    {
                        id: 8,
                        name: 'Photo 5',
                        duration: 15,
                        transition: 2,
                        index: 5,
                        media_type: 1,
                        default_poster_url: '/branding/images/poster5.jpg'
                    }
                ]
            }
        ]
    };

    angular.module('AcaEngine')
    
        .controller('MeetingCtrl', [
            '$rootScope',
            '$scope',

        function ($rootScope, $scope) {
            $scope.selected = null;
            $scope.playing = null;

            if ($rootScope.meeting == 'impromptu')
                $scope.meeting = IMPROMPTU;
            else
                $scope.meeting = MEETING;

            $scope.back = function() {
                $rootScope.meeting = null;
            }

            $scope.selectPlaylist = function(playlist) {
                $scope.selected = playlist;
            }

            $scope.play = function(playlist) {
                if ($scope.playing && (playlist.id == $scope.playing.id)) {
                    $scope.playing = null;
                } else {
                    $scope.playing = playlist;
                }
            }
            
        }]);

}(this.angular));
