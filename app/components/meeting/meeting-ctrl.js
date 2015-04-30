(function (angular) {
    'use strict';

    var TODAY = new Date();
    var YEAR = TODAY.getFullYear();
    var MONTH = TODAY.getMonth();
    var DAY = TODAY.getDate();

    var playCount = 0,
        playing;

    angular.module('AcaEngine')
    
        .controller('MeetingCtrl', [
            '$rootScope',
            '$scope',
            '$http',
            '$timeout',

        function ($rootScope, $scope, $http, $timeout) {
            $scope.selected = null;
            $scope.playing = null;
            $rootScope.playlistData = $rootScope.playlistData || {};

            $scope.back = function() {
                $rootScope.meeting = null;
            };

            // ------------------------
            // playlists
            // ------------------------
            function processPlaylist(playlist, data, status, headers, config) {
                angular.extend(data, playlist);
                $rootScope.playlistData[playlist.id] = data;
                $scope.selected = data;
            }

            $scope.selectPlaylist = function(playlist) {
                $scope.selected = $rootScope.playlistData[playlist.id];

                if ($rootScope.debug) {
                    processPlaylist(playlist, window.cotagData.playlist);
                } else {
                    $http.get($rootScope.cotag + '/api/playlists/' + playlist.id + '/playlist_revisions/published', {
                        responseType: 'json',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).success(function(data, status, headers, config) {
                        processPlaylist(playlist, data, status, headers, config);
                    });
                }
            };

            // ------------------------
            // start playback
            // ------------------------
            $scope.play = function(playlist, count) {
                if ($rootScope.debug)
                    return;

                /*if ($scope.playing && (playlist.id == $scope.playing.id)) {
                    $scope.playing = null;
                } else {
                    $scope.playing = playlist;
                }*/

                playCount = count || 0;

                if (playCount === 0) {
                    $scope.showModal('scheduling');
                }

                // start the schedule 1 day in the past to work around any
                // time sync issues (phones with times out of sync)
                var now = new Date();
                now.setDate(now.getDate() - 1);
                var startDate = now.toISOString();

                // end the schedule 1 day in the future - this will be enough
                // time to play the content.
                now.setDate(now.getDate() + 2);
                var endDate = now.toISOString();

                $http.post('/api/schedules', {
                    group_id: playlist.group_id, // TODO:: This should be grabbed from the header!
                    playlist_id: playlist.id,
                    once: true,
                    priority: 1,
                    start_date: startDate,
                    end_date: endDate
                }, {
                    responseType: 'json',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    console.log('success', data, status, config);
                    $scope.closeModal('scheduling');
                    $scope.showModal('scheduled');

                }).error(function(data, status, headers, config) {
                    console.log('error', data, status, config);

                    if (playCount >= 2) {
                        $scope.showModal('schedfailed');

                    } else {
                        $timeout(function () {
                            $scope.play(playing, playCount + 1);
                        }, 1000);
                    }
                });
            };
            
        }]);

}(this.angular));
