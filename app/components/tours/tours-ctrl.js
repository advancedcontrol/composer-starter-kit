(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('ToursCtrl', [
            '$rootScope',
            '$timeout',
            '$scope',
            '$http',

        function ($rootScope, $timeout, $scope, $http) {
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
                        name: group.name.replace('ToursGroup: ', ''),
                        id: group.id
                    });
                });

                // sort languages by name, ascending
                $scope.languages = $scope.languages.sort(function (a, b) {
                    return ((a.name < b.name) ? -1 : (b.name > a.name) ? 1 : 0);
                });

                // initialise the UI with the first language tab selected
                if ($scope.languages.length > 0)
                    $scope.tab = $scope.languages[0].name;

                // start loading playlists for each language
                $scope.languages.forEach(loadLanguage);
            });

            var playCount = 0,
                playing;

            function formatDate(date) {
                // format date as DD/MM/YYYY HH:MM(am|pm)
                var str = '';

                // date component
                var day = date.getDate();
                if (day < 10)
                    str += '0';
                str += day + '/';

                var month = date.getMonth() + 1;
                if (month < 10)
                    str += '0';
                str += month + '/';

                str += date.getFullYear() + ' ';

                // time component
                var hour = date.getHours();
                var adjusted = hour;

                // adjust to 12hr time
                if (adjusted == 0)
                    adjusted = '12';
                else if (adjusted > 12)
                    adjusted -= 12;

                if (adjusted <= 9)
                    str += '0';
                str += adjusted + ':';

                var min = date.getMinutes();
                if (min < 10)
                    str += '0';
                str += min;

                if (hour < 12)
                    str += 'am';
                else
                    str += 'pm';

                return str;
            }

            // Updates the currently selected source
            $scope.play = function(playlist, count) {
                playCount = count || 0;

                if (playCount === 0) {
                    $scope.showModal('scheduling');
                }

                // start the schedule 1 day in the past to work around any
                // time sync issues (phones with times out of sync)
                var now = new Date();
                now.setDate(now.getDate() - 1);
                var startDate = formatDate(now);

                // end the schedule 1 day in the future - this will be enough
                // time to play the content.
                now.setDate(now.getDate() + 2);
                var endDate = formatDate(now);

                $http.post($rootScope.scheduleCreateURL, {
                    group_id: $scope.group_id,
                    playlist_id: playlist.id,
                    name: 'tourism',
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

            $scope.currentTab = function (tab) {
                $scope.coModuleInstance.$exec('tab', tab);
            };
            // TODO:: Source to name mapping!
        }]);

}(this.angular));
