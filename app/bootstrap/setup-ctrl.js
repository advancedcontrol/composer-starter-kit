(function (window, angular) {
    'use strict';


    var bootstrapKey = 'aca.meeting.bootstrap',
        redirectTo = function (system_id) {
            var newUrl,
                index;

            newUrl = window.location.href;
            index = newUrl.lastIndexOf('/') + 1;
            newUrl = newUrl.substr(0, index) + '#/?fixed_device=true&trust=true&ctrl=' + system_id;

            // Perform the redirect
            window.location.href = newUrl;
        };


    angular.module('AcaBootstrap', [
        'ngGesture'  // Gesture events
    ])


    .run(['$rootScope', function ($rootScope) {
        var system_id = localStorage.getItem(bootstrapKey);

        if (system_id) {
            redirectTo(system_id);
        } else {
            $rootScope.loaded = true;
        }
    }])


    .controller('SetupCtrl', [
        '$scope',
    function ($scope) {

        $scope.configure = function (system_id) {
            // Ensure we are saving a valid value
            if (system_id && system_id.length > 5) {
                localStorage.setItem(bootstrapKey, system_id);
                redirectTo(system_id);
            }
        };

    }]);

}(this, this.angular));
