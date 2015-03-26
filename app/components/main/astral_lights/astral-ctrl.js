(function (angular) {
    'use strict';


    // -------------------------------------------------
    //  Keep track of all settings globally
    // -------------------------------------------------
    var settings = {},
        roomSizes = [6, 3, 6],

        checkSelected = function (setting, index) {
            var checked = true;

            angular.forEach(setting[index], function (val) {
                if (!val) {
                    checked = false;
                }
            });

            return checked;
        },

        performToggle = function (arr, newVal) {
            var len = arr.length,
                i;

            for (i = 0; i < len; i += 1) {
                arr[i] = newVal;
            }
        },

        // These are the actual Astral room IDs
        rooms = {
            'sys_3-18': 0,
            'sys_3-19': 1,
            'sys_3-1A': 2
        };


    // -----------------------------------------------------------
    //  Init data structures (these will be updated by the server)
    // -----------------------------------------------------------
    settings.selected = [
        [true, true, true, true, true, true],
        [true, true, true],
        [true, true, true, true, true, true]
    ];

    settings.chandelier = [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true]
    ];

    settings.checkBoxes = [false, false, false];

    // This is the last know level of the last selection you had
    settings.selected_level = [125, 125, 125];
    settings.chandelier_level = [5, 5, 5];
    settings.house_levels = [[],[],[]];


    // Define the controller
    angular.module('AcaEngine')
    
        .controller('AstralCtrl', [
            '$scope',
            '$rootScope',

        function ($scope, $rootScope) {

            // -------------------------------------------
            // Keep track of which rooms we are joined too
            // -------------------------------------------
            var myIndex = null,
                joinedTo = null,
                checkJoins = function (joins) {
                    joins = joins || $scope.joinedRooms.rooms;

                    if (joins && joins.length > 0) {

                        joinedTo = [];
                        angular.forEach(joins, function (join) {
                            var index = rooms[join];
                            if (index !== undefined) {
                                joinedTo.push(index);
                            }
                        });

                    } else if (myIndex !== null) {
                        joinedTo = [myIndex];
                    }

                    if (joinedTo) {
                        $scope.show_astral_1 = false;
                        $scope.show_astral_2 = false;
                        $scope.show_astral_3 = false;
                        angular.forEach(joinedTo, function (room) {
                            $scope['show_astral_' + (room + 1)] = true;
                        });
                    }
                };

            $scope.$watch('controlSystem', function (system) {
                myIndex = rooms[system];
                $scope.systemIndex = myIndex;
                checkJoins();
            });

            $scope.$watch('joinedRooms.rooms', function (joins) {
                checkJoins(joins);
            });


            // --------------------------------------------
            // Light selection settings
            // --------------------------------------------
            $scope.astrals = settings;


            // Core lighting selection helpers
            $scope.toggleAll = function (room) {

                performToggle(settings.selected[room], settings.checkBoxes[room]);
                $scope.coModuleInstance.$exec('select', [room], settings.selected);
            };

            $scope.selected = function (room) {
                $scope.coModuleInstance.$exec('select', [room], settings.selected);
                settings.checkBoxes[room] = checkSelected(settings.selected, room);
            };

            $scope.$watch('astrals.selected', function (newSelected) {
                if (newSelected) {
                    var i;
                    for (i = 0; i < 3; i += 1) {
                        settings.checkBoxes[i] = checkSelected(newSelected, i);
                    }
                }
            });

            $scope.$watch('astrals.selected_level', function (levels) {
                if (levels) {
                    settings.local_level = levels[myIndex];
                }
            });

            $scope.sendCurrentLevel = function () {
                $scope.coModuleInstance.$exec('selected_level', joinedTo, settings.local_level);
            };

            $scope.$watch('astrals.local_level', function (level) {
                if (level !== settings.selected_level[myIndex]) {
                    angular.forEach(joinedTo, function (index) {
                        settings.selected_level[index] = level;
                    });
                    
                    $scope.sendCurrentLevel();
                }
            });



            // --------------------------------------------
            // House Lighting
            // --------------------------------------------
            $scope.$watch('astrals.house_levels', function (levels) {
                if (levels) {
                    settings.onyx_fader = levels[myIndex][0];
                    settings.pelmets_fader = levels[myIndex][1];
                    settings.down_fader = levels[myIndex][2];
                }
            });

            var updateHouse = function (fader, level) {
                if (settings.house_levels && level !== settings.house_levels[myIndex][fader]) {
                    angular.forEach(joinedTo, function (index) {
                        settings.house_levels[index][fader] = level;
                    });

                    $scope.coModuleInstance.$exec('house_level', joinedTo, fader, level);
                }
            };

            $scope.$watch('astrals.onyx_fader', function (val) {
                if (val !== undefined)
                    updateHouse(0, val);
            });

            $scope.$watch('astrals.pelmets_fader', function (val) {
                if (val !== undefined)
                    updateHouse(1, val);
            });

            $scope.$watch('astrals.down_fader', function (val) {
                if (val !== undefined)
                    updateHouse(2, val);
            });



            // ---------------------------------------------------
            // Chandelier Pop-up
            // ---------------------------------------------------
            $scope.toggleChand = function (value) {
                angular.forEach(joinedTo, function (room) {
                    performToggle(settings.chandelier[room], value);
                });
                
                $scope.coModuleInstance.$exec('chandelier_select', joinedTo, settings.chandelier);
            };

            $scope.selectChand = function (index) {
                var value = settings.chandelier[myIndex][index];

                angular.forEach(joinedTo, function (room) {
                    settings.chandelier[room][index] = value;
                });

                $scope.coModuleInstance.$exec('chandelier_select', joinedTo, settings.chandelier);
            };

            $scope.sendCurrentChandLevel = function () {
                $scope.coModuleInstance.$exec('chandelier_level', joinedTo, settings.local_chand);
            };

            $scope.$watch('astrals.chandelier_level', function (levels) {
                if (levels) {
                    settings.local_chand = levels[myIndex];
                }
            });

            $scope.$watch('astrals.local_chand', function (level) {
                if (level !== settings.chandelier_level[myIndex]) {
                    angular.forEach(joinedTo, function (index) {
                        settings.chandelier_level[index] = level;
                    });
                    
                    $scope.sendCurrentChandLevel();
                }
            });


            // Preset Saving / callback
            // TODO:: This is probably why we have to join rooms at the light controller level
            // ---------------------------------------------
        }]);

}(this.angular));
