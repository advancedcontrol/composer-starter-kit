(function(angular) {
    'use strict';

    angular.module('AcaEngine').
        filter('duration', function() {

            // Utility to add leading zero
            var pad = function(n) {
                return (n < 10 ? '0' : '') + n;
            };

            return function(totalSeconds) {

                // Allow for previous times
                var result,
                    hours,
                    mins,
                    secs,
                    sign = totalSeconds < 0 ? '-' : '';

                // Make positive
                totalSeconds = Math.abs(totalSeconds || 0) * 1000;

                // Get time components
                var hours = totalSeconds / 3.6e6 | 0;
                var mins = totalSeconds % 3.6e6 / 6e4 | 0;
                var secs = Math.round(totalSeconds % 6e4 / 1e3);

                // build pretty looking string
                result = '';
                if (hours > 0) {
                    result = result + pad(hours) + ':'; 
                }
                return result + pad(mins) + ':' + pad(secs);
            };
        });

}(this.angular));
