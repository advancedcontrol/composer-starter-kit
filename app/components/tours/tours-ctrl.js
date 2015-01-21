(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('ToursCtrl', [
            '$rootScope',
            '$scope',
            '$http',

        function ($rootScope, $scope, $http) {
            $scope.selectedSource = source;
            $scope.languages = [];
            $scope.playlists = {};
            $scope.tab = null;

            function loadLanguage(lang) {
                var url = $rootScope.playlistsQueryPrefix + lang.id + '/playlists';
                $http.get(url, {
                    responseType: 'json',
                    headers: {
                        'Accept': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    $scope.playlists[data.id] = data.playlists;
                });
            }

            // load groups containing the name 'Tours'; these groups are used
            // to represent the language options available to tour guides. The
            // playlists in each group represent the videos available in each
            // language.
            $http.get($rootScope.languagesQueryURL, {
                responseType: 'json',
                headers: {
                    'Accept': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                $scope.languages = [];
                
                // each group represents a language option
                data.results.forEach(function(group) {
                    $scope.languages.push({
                        name: group.name.replace('Tours: ', ''),
                        id: group.id
                    });
                });

                // sort languages by name, ascending
                $scope.languages = $scope.languages.sort(function (a, b) {
                    return ((a.name < b.name) ? -1 : (b.name > a.name) ? 1 : 0);
                });

                // initialise the UI with the first language tab selected
                $scope.tab = $scope.languages[0].name;

                // start loading playlists for each language
                $scope.languages.forEach(loadLanguage);
            });

            // Updates the currently selected source
            $scope.play = function(playlist) {
                $scope.coModuleInstance.$exec('present', $scope.sources['default']);

                // start the schedule 1 day in the past to work around any
                // time sync issues (phones with times out of sync)
                var now = new Date();
                now.setDate(now.getDate() - 1);
                var startDate = now.toISOString();

                // end the schedule 1 day in the future - this will be enough
                // time to play the content.
                now.setDate(now.getDate() + 2);
                var endDate = now.toISOString();

                $http.post($rootScope.scheduleCreateURL, {
                    group_id: $scope.group_id,
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
                }).error(function(data, status, headers, config) {
                    console.log('error', data, status, config);
                    alert('Sorry, an error occurred while scheduling this playlist. Please try again later.');
                });
            };

            $scope.currentTab = function (tab) {
                $scope.coModuleInstance.$exec('tab', tab);
            };
            // TODO:: Source to name mapping!
        }]);

}(this.angular));
