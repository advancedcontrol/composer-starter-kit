(function (angular) {
    'use strict';

    angular.module('AcaEngine')
        .factory('GoogleAnalytics', [
            '$rootScope',
            '$location',
            'User',
        function ($rootScope, $location, User) {
            var fixed_panel = $location.search().hasOwnProperty('fixed_device'),
                sys_id = $location.search().ctrl,
                system_name,
                queue = [],
                timers = {},
                self = this,
                user,
                analytics_id,
                configured = false,
                types = {
                    present: function (output_name, source_name) {
                        // Clear existing timers
                        if (timers[output_name]) {
                            clearInterval(timers[output_name]);
                            delete timers[output_name];
                        }

                        // Just in case
                        if (!source_name) {
                            source_name = 'none';
                        }

                        ga('set', 'dimension5', source_name);
                        ga('set', 'dimension6', output_name);

                        // Set the page to te latest source
                        ga('set', 'page', '/present/' + source_name);
                        ga('set', 'title', source_name);
                        ga('send', 'pageview');

                        // Update the source timer
                        if (source_name !== 'none') {
                            // Must be presented for 2min to count towards stats
                            // This allows monitoring of around 600 spaces that are in use constantly for 8hours a day for free
                            // or 1200 spaces that are used for around 4 hours a day etc
                            timers[output_name] = setInterval(function () {
                                ga('send', 'event', 'presenting', source_name);
                            }, 120000);
                        }
                    },
                    preview: function (source_name) {
                        ga('send', 'event', 'preview', source_name);
                    },
                    popup: function (name) {
                        ga('send', 'event', 'popup', name);
                    },
                    state: function (state, mode) {
                        if (state === 'online') {
                            ga('set', 'dimension4', mode);
                        } else {
                            // Reset the presentation statistics (we're offline)
                            angular.forEach(timers, function (id) {
                                clearInterval(id);
                            });
                        }

                        // Update the page
                        console.log('Google Analytics: New state', state);
                        ga('set', 'page', '/' + state);
                        ga('set', 'title', state);
                        ga('send', 'pageview');
                    }
                },
                record_event = function (type, arg1, arg2, arg3) {
                    types[type](arg1, arg2, arg3);
                },
                configure_analytics = function () {
                    if (user && analytics_id && sys_id && system_name) {
                        // Configure Analytics here
                        ga('create', {
                            trackingId: analytics_id,
                            cookieDomain: 'auto',
                            userId: user.id,
                            anonymizeIp: false,
                            title: system_name
                        });

                        // Track interesting data about this connection
                        if (user.sys_admin) {
                            ga('set', 'dimension1', 'admin');
                        } else if (user.support) {
                            ga('set', 'dimension1', 'support');
                        } else {
                            ga('set', 'dimension1', 'user');
                        }
                        
                        ga('set', 'dimension2', fixed_panel);
                        ga('set', 'dimension3', sys_id);

                        configured = true;
                        console.log('Google Analytics: Loaded');

                        // Record any queued events
                        var i;
                        for (i = 0; i < queue.length; i += 1) {
                            record_event.apply(self, queue[i]);
                        }
                    }
                };


            // We watch for this event to update our statistics
            $rootScope.$on('$track', function (event, type, arg1, arg2, arg3) {
                if (configured) {
                    record_event(type, arg1, arg2, arg3);
                } else {
                    queue.push([type, arg1, arg2, arg3]);
                }
            });


            // ----------------------------
            // Collect the interesting data
            // ----------------------------
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
                        // New analytics ID
                        location.reload();
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
                        ga('set', 'dimension3', sys_id);

                        // Reset timers
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
                        ga('set', 'title', system_name);
                    }
                }
            });

            return {};
        }])

        // Load this service
        .run(['GoogleAnalytics', angular.noop]);

}(this.angular));

// Google analytics tracker object
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

