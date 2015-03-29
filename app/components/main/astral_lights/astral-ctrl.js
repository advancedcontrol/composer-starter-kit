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
        },

        area_codes = [88, 89, 90];


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
    settings.area_codes = area_codes;

    // This is the last know level of the last selection you had
    settings.selected_level = [125, 125, 125];
    settings.chandelier_level = [5, 5, 5];


    // Define the controller
    angular.module('AcaEngine')
    
        .controller('AstralCtrl', [
            '$scope',
            '$rootScope',
            '$timeout',

        function ($scope, $rootScope, $timeout) {

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
                        $scope.joinedTo = joinedTo;
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
                $scope.coModuleInstance.$exec('selection', [room], settings.selected);
            };

            $scope.selected = function (room) {
                $scope.coModuleInstance.$exec('selection', [room], settings.selected);
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
            var updateHouse = function (fader, level) {
                $scope.coModuleInstance.$exec('house_level', joinedTo, fader, level);
            };

            $scope.$watch('astrals.onyx_fader', function (val) {
                settings.onyx_fader_ui = val;
            });

            $scope.$watch('astrals.pelmets_fader', function (val) {
                settings.pelmets_fader_ui = val;
            });

            $scope.$watch('astrals.down_fader', function (val) {
                settings.down_fader_ui = val;
            });

            $scope.$watch('astrals.onyx_fader_ui', function (val) {
                if ((val || val === 0) && val !== settings.onyx_fader && settings.onyx_fader !== undefined)
                    updateHouse(1, val);
            });

            $scope.$watch('astrals.pelmets_fader_ui', function (val) {
                if ((val || val === 0) && val !== settings.pelmets_fader && settings.pelmets_fader !== undefined)
                    updateHouse(2, val);
            });

            $scope.$watch('astrals.down_fader_ui', function (val) {
                if ((val || val === 0) && val !== settings.down_fader && settings.down_fader !== undefined)
                    updateHouse(3, val);
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



            // ---------------------------------------------
            // Preset Pop-ups!
            // ---------------------------------------------
            // custom_presets: {number: name}
            // custom_numbers: [4,5,6,7,8,9,10]
            // Save a preset: select a number, give it a name

            $scope.callPreset = function (number) {
                $scope.coModuleInstance.$exec('call_preset', joinedTo, number);
            };

            $scope.setTransition = function (number) {
                $scope.coModuleInstance.$exec('set_transition', joinedTo, number);
            };

            $scope.clearPreset = function (number) {
                $scope.coModuleInstance.$exec('clear_preset', number);
            };


            // Current lighting levels will be saved to the current preset
            $scope.createPreset = function (name) {
                settings.new_preset_name = null;
                $scope.coModuleInstance.$exec('create_preset', joinedTo, name);

                $timeout(function () {
                    $scope.coModuleInstance.$exec('call_named', joinedTo, name);
                });
            };

            $scope.savePreset = function () {
                $scope.coModuleInstance.$exec('save_preset', joinedTo);
            };


            var builtin = {
                '1': 'H&C High',
                '2': 'H&C Medium',
                '3': 'H&C Low',
                '4': 'H&C Off',
                '5': 'H&C Very Low',
                '6': 'House High',
                '7': 'House Medium',
                '8': 'House Low',
                '9': 'House Very Low'
            };
            $scope.$watch('astrals.current_preset', function (preset) {
                if (!preset) {
                    return;
                }

                var can_save = false,
                    current = preset[myIndex],
                    name;

                // Check if save is possible
                if (current < 10) {
                    name = builtin[current];
                } else {
                    can_save = true;
                    angular.forEach(joinedTo, function (val) {
                        if (current !== preset[val]) {
                            can_save = false;
                        }
                    });

                    angular.forEach(settings.all_presets, function (val, key) {
                        if (current === val.number) {
                            name = key;
                        }
                    });
                }
                settings.can_save = can_save;
                settings.current_preset_name = name;
            });

            $scope.$watch('astrals.current_effect', function (preset) {
                if (!preset) {
                    return;
                }

                var current = preset[myIndex],
                    name;

                angular.forEach(settings.chand_transitions, function (val, key) {
                    if (current === val) {
                        name = key;
                    }
                });

                settings.current_effect_name = name;
            });


            // Calculate valid and unused presets
            $scope.$watch('astrals.all_presets', function (presets) {
                if (presets) {
                    var valid = {},
                        unused = settings.custom_range.slice(0), // clone array
                        count = 0;

                    angular.forEach(presets, function (val, name) {
                        var index = unused.indexOf(val.number);

                        if (index > -1) {
                            // The preset is used, lets remove it from this list
                            unused.splice(index, 1);
                        }

                        if (val.applied_to.indexOf(myIndex) > -1) {
                            valid[name] = val.number;
                        }

                        count += 1;
                    });

                    settings.valid_presets = valid;
                    settings.unused_presets = unused;
                    settings.custom_preset_count = count;
                }
            });


            // ------------------------------
            // SPOT LIGHTS
            // ------------------------------
            $scope.updateSpots = function () {
                $scope.coModuleInstance.$exec('spots_enabled', joinedTo, settings.spots_enabled[myIndex]);
            };
        }]);

}(this.angular));
