(function (angular) {
    'use strict';

    // Define the controller
    angular.module('AcaEngine')
    
        .controller('OrderCtrl', [
            '$scope',

        function ($scope) {

            $scope.generateName = function (item) {
                var order = '';
                item.forEach(function (part) {
                    order += part.name + ' - ';
                });
                return order.substr(0, order.length - 3);
            };

            $scope.removeItem = function (array, item) {
                var index = array.indexOf(item);
                if (index !== -1) {
                    array.splice(index, 1);
                }
            };

            $scope.buildOrder = function (items) {
                var order = [];

                items.forEach(function (item) {
                    order.push({
                        qty: item.qty,
                        notes: item.notes,
                        item: $scope.generateName(item)
                    });
                });

                return order;
            }

        }]);

}(this.angular));
