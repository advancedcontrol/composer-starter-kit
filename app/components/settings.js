(function (window, angular) {
    'use strict';

    angular.module('AcaEngine')
        .run([
            '$window',
            'cacheman',
            '$rootScope',
            '$location',
            '$conductor',

        function ($window, cacheman, $rootScope, $location) {
            // Refresh the UI if an update is detected
            // This promise is resolved after a new version
            // of the UI has been downloaded and cached
            cacheman.readyCallback.then(function () {
                $window.location.reload();
            });
        }]);

}(this, this.angular));
