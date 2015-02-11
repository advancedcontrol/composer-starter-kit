(function (angular) {
    'use strict';

    var TODAY = new Date();
    var YEAR = TODAY.getFullYear();
    var MONTH = TODAY.getMonth();
    var DAY = TODAY.getDate();

    var BOOKINGS = [
        {
            time: new Date(YEAR, MONTH, DAY, 10),
            name: 'Meeting 1'
        },
        {
            time: new Date(YEAR, MONTH, DAY, 11),
            name: 'Meeting 2'
        },
        {
            time: new Date(YEAR, MONTH, DAY, 13),
            name: 'Meeting 3'
        },
        {
            time: new Date(YEAR, MONTH, DAY, 14),
            name: 'Meeting 4'
        }
    ];

    angular.module('AcaEngine')
    
        .controller('BookingsCtrl', [
            '$rootScope',
            '$scope',

        function ($rootScope, $scope) {
            $scope.bookings = BOOKINGS;

            $scope.selectBooking = function(booking) {
                $rootScope.meeting = booking;
            }
        }]);

}(this.angular));
