(function (angular) {
    'use strict';

    var source = {};

    angular.module('AcaEngine')
    
        .controller('SourceCtrl', [
            '$scope',
            '$rootScope',
            '$timeout',

        function ($scope, $root, $timeout) {
            var roomOutputs = function () {
                $scope.roomOutputs = [];
                angular.forEach($scope.outputs, function (out) {
                    if (out.sys_id === $scope.selectedRoom) {
                        $scope.roomOutputs.push(out);
                    }
                });

                $scope.output = $scope.roomOutputs[0];
            };

            $scope.output = null;
            $scope.selectOutput = function (out) {
                if (out) {
                    $scope.output = out;
                }
            };

            // Ensure the selected room is valid
            $scope.$watch('outputs', function (outputs) {
                if (outputs && $scope.selectedRoom) {
                    roomOutputs();
                }
            });

            $scope.selectRoom = function (sysId) {
                $scope.selectedRoom = sysId;

                // List the Outputs in this room
                if ($scope.outputs) {
                    roomOutputs();
                }
            };

            // Selected Room Sources:
            $scope.selectSource = function (systemId, name, details) {
                details.sys_id = systemId;
                details.src_id = name;
                $scope.selectedDetails = details;
                $scope.selectedSource = systemId + '_' + name;
            };

            // All outputs (across all the joined rooms)
            $scope.addOutputs = function (systemId, outHash) {
                $scope.output_lookup = $scope.output_lookup || {};
                $scope.outputs = $scope.outputs || [];

                angular.forEach(outHash, function (details, name) {
                    var lookup = systemId + '_' + name,
                        currentOutput;

                    details.sys_id = systemId;
                    details.out_id = name;
                    details.current_source = 'none';

                    // Check the output doesn't already exist in the array
                    currentOutput = $scope.output_lookup[lookup];
                    if (currentOutput !== undefined) {
                        $scope.outputs[currentOutput] = details;
                    } else {
                        $scope.outputs.push(details);
                        $scope.output_lookup[lookup] = $scope.outputs.length - 1;
                    }
                });
            };

        }])

        .controller('SyncOutputCtrl', [
            '$scope',

        function ($scope) {

            $scope.$watch('output', function (out) {
                if (out) {
                    $scope.out = out;
                }
            });

        }]);

}(this.angular));
