(function (angular) {
    'use strict';


    angular.module('AcaEngine')
    
        .controller('OptionsCtrl', [
            '$scope',
            '$rootScope',

        function ($scope, $rootScope) {
            // Updates the currently selected source
            $scope.selectSource = function (src) {
                // Update the source (basically matches what the server will return)
                var selectedSource = $scope.sources[src];
                selectedSource.source = src;

                // Update the scopes
                $rootScope.$broadcast('updateSource', selectedSource);

                // Open the side panel
                $scope.$emit('navShow');
            };


            // update the source
            $scope.$on('updateSource', function (event, source) {
                $scope.selectedSource = source;
            });



            $scope.selectOutput = function (output) {
                $rootScope.$broadcast('updateOutput', output, $scope.outputs[output]);
            };

            $scope.$on('updateOutput', function (event, output, details) {
                $scope.current_output = output;
                $scope.output = details;
                $scope.output.$key = current_output;
            });
        }]);

}(this.angular));
