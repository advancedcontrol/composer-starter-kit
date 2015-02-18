(function (angular) {
    'use strict';

    var scheduleCreateURL = '/api/schedules';
    var groupQueryURL = '/api/groups?mine=true&offset=0&q=Service';
    var playlistsQueryPrefix = '/api/groups/';

    angular.module('AcaEngine')
    
        .controller('BookingsCtrl', [
            '$rootScope',
            '$scope',
            '$http',

        function ($rootScope, $scope, $http) {
            $rootScope.playlists = $rootScope.playlists || {};

            function loadPlaylists(group) {
                var url = playlistsQueryPrefix + group.id + '/playlists';

                $http.get(url, {
                    responseType: 'json',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    $rootScope.playlists[data.id] = data;
                });
            }


            $http.get(groupQueryURL, {
                responseType: 'json',
                headers: {
                    'Accept': 'application/json'
                }
            }).success(function(data, status, headers, config) {
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
            });

            $scope.selectBooking = function(booking) {
                $rootScope.meeting = $rootScope.playlists[booking.id];
            }
        }]);

}(this.angular));
