(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('ToursCtrl', [
            '$rootScope',
            '$scope',
            '$http',

        function ($rootScope, $scope, $http) {
            $http.get('/api/groups?mine=true&offset=0&q=Tours', {
                responseType: 'json',
                headers: {
                    'Accept': 'application/json'
                }
            }).success(function(data, status, headers, config) {
                $scope.languages = [];
                
                for (var i = 0; i < data.results.length; i++) {
                    var group = data.results[i];

                    $scope.languages.push({
                        name: group.name.replace('Tours: ', ''),
                        id: group.id
                    });
                }

                $scope.languages = $scope.languages.sort(function (a, b) {
                    return ((a.name < b.name) ? -1 : (b.name > a.name) ? 1 : 0);
                });

                $scope.tab = $scope.languages[0].name;
            });

            $scope.tab = null;
            $scope.languages = [];
            $scope.selectedSource = source;

            // Updates the currently selected source
            $scope.selectSource = function (src) {
                angular.extend(source, $scope.sources[src]);
                source.source = src;

                $scope.coModuleInstance.$exec('present', src);

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
                    group_id: $rootScope.groupID,
                    playlist_id: source.playlist_id,
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
                    console.log('success', data, status, headers, config);
                }).error(function(data, status, headers, config) {
                    console.log('error', data, status, headers, config);
                    alert('Sorry, an error occurred while scheduling this playlist. Please try again later.');
                });
            };

            $scope.currentTab = function (tab) {
                $scope.coModuleInstance.$exec('tab', tab);
            };
            // TODO:: Source to name mapping!
        }]);

}(this.angular));
