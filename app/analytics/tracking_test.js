(function (angular) {
    'use strict';

    angular.module('AcaEngine')
        .factory('TrackingTest', [
            '$rootScope',
            '$location',
            'User',
        function ($rootScope, $location, User) {
            var fixed_panel = $location.search().hasOwnProperty('fixed_device'),
                sys_id = $location.search().ctrl,
                queue = [],
                self = this,
                user,
                analytics_id,
                system_name,
                configured = false,
                types = {
                    present: function (output_name, source_name) {
                        console.warn('Tracking', output_name, source_name);
                    },
                    preview: function (source_name) {
                        console.warn('Event preview', source_name);
                    },
                    popup: function (name) {
                        console.warn('Event popup', name);
                    },
                    state: function (state, mode) {
                        if (state === 'online') {
                            console.warn('Tracking', state, mode);

                            // Update mode here
                        } else {
                            console.warn('Tracking', state);
                        }
                    }
                },
                record_event = function (type, arg1, arg2, arg3) {
                    types[type](arg1, arg2, arg3);
                },
                configure_analytics = function () {
                    if (user && analytics_id && sys_id && system_name) {
                        // Configure Analytics here

                        configured = true;

                        var i;
                        for (i = 0; i < queue.length; i += 1) {
                            record_event.apply(self, queue[i]);
                        }
                    }
                };

            User.get_current().then(function (usr) {
                user = usr;

                configure_analytics();
            });

            $rootScope.$watch('analytics', function (val) {
                if (val) {
                    analytics_id = val;

                    if (!configured) {
                        configure_analytics();
                    } else {
                        // Update analytics here
                    }
                }
            });

            $rootScope.$watch('controlSystem', function (val) {
                if (val) {
                    sys_id = val;

                    if (!configured) {
                        configure_analytics();
                    } else {
                        // Update analytics here
                    }
                }
            });

            $rootScope.$watch('SystemName', function (val) {
                if (val) {
                    system_name = val;

                    if (!configured) {
                        configure_analytics();
                    } else {
                        // Update analytics here
                    }
                }
            });

            $rootScope.$on('$track', function (event, type, arg1, arg2, arg3) {
                if (configured) {
                    record_event(type, arg1, arg2, arg3);
                } else {
                    queue.push([type, arg1, arg2, arg3]);
                }
            });

            return {};
        }])

        // Load this service
        .run(['TrackingTest', angular.noop]);

}(this.angular));

// Attach analytics tracker here
