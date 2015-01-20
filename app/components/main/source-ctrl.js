(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$rootScope',
            '$scope',
            '$http',

        function ($rootScope, $scope, $http) {
            // Provides access to the current source
            $scope.selectedSource = source;
            $scope.validated = false;
            $scope.incorrect = false;
            $scope.pin = '';

            $scope.addToPin = function(char) {
                // all pin codes are 4 characters. if there are 3 characters
                // and a fourth is being entered, validate the pin. if 4
                // characters are present, overwrite the pin from the beginning
                // (i.e the pin was entered and invalid, new characters are
                // intended to be the start of a new entry)
                if ($scope.pin.length <= 3) {
                    $scope.pin += char.toString();
                } else {
                    $scope.pin = char.toString();
                    $scope.validated = false;
                    $scope.incorrect = false;
                }

                if ($scope.pin.length != 4)
                    return;

                if ($scope.pin == '1234') {
                    //event.target.blur();
                    $scope.validated = true;
                    $scope.incorrect = false;
                    $scope.coModuleInstance.$exec('projector_on');
                } else {
                    $scope.incorrect = true;
                }
            }

            $scope.clearPin = function() {
                $scope.pin = '';
                $scope.incorrect = false;
                $scope.validated = false;
            }

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
