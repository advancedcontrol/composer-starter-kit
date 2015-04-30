(function (angular) {
    'use strict';

    var groupQueryURL = '/api/groups?mine=true&offset=0';
    var playlistsQueryPrefix = '/api/groups/';

    angular.module('AcaEngine')
    
        .controller('BookingsCtrl', [
            '$rootScope',
            '$scope',
            '$http',

        function ($rootScope, $scope, $http) {
            $rootScope.playlists = $rootScope.playlists || {};

            // ------------------------
            // playlists/meeting
            // ------------------------
            function loadPlaylists(group) {
                var url = $rootScope.cotag + playlistsQueryPrefix + group.id + '/playlists';

                if ($rootScope.debug) {
                    var data = window.cotagData.playlist;
                    $rootScope.playlists[data.id] = data;
                } else {
                    $http.get(url, {
                        responseType: 'json',
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).success(function(data, status, headers, config) {
                        $rootScope.playlists[data.id] = data;
                    });
                }
            }


            // ------------------------
            // groups/bookings
            // ------------------------
            function processGroups(data, status, headers, config) {
                $scope.bookings = [];
                
                // each group represents a language option
                data.results.forEach(function(group) {
                    $scope.bookings.push({
                        name: group.name.replace('Service: ', ''),
                        id: group.id
                    });
                });

                // TODO:: Sort by meta data (expiry date, delivery date etc)

                // start loading playlists for each language
                $scope.bookings.forEach(loadPlaylists);
            }

            if ($rootScope.debug) {
                processGroups(window.cotagData.groups);
            } else {
                $http.get($rootScope.cotag + groupQueryURL, {
                    responseType: 'json',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    processGroups(data, status, headers, config);
                });
            }

            $scope.selectBooking = function(booking) {
                $rootScope.meeting = $rootScope.playlists[booking.id];
            }
        }]);

}(this.angular));
