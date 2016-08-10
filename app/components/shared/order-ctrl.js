(function (angular) {
    'use strict';

    // Define the controller
    angular.module('AcaEngine')
    
        .controller('OrderCtrl', [
            '$scope',

        function ($scope) {
            var book = {drinks: []};
            $scope.book = book;

            $scope.reset = function () {
                book.drinks = [];
            };

            $scope.selected = function (category, beverage, selected) {
                book.selected = angular.copy(beverage);
                book.selected.items = {};
                if (book.selected.extras) {
                    angular.forEach(category.extras, function(value, key) {
                        book.selected.items[key] = value[0];
                    });
                }
            };

            $scope.addToOrder = function () {
                if (book.selected) {
                    book.drinks.push(angular.copy(book.selected));
                }
            };

            $scope.generateName = function (item) {
                var order = item.name;

                if (item.extras) {
                    order += " with ";
                    var extras = [];

                    angular.forEach(item.items, function (value, key) {
                        if (value === 'none') {
                            value = 'no';
                        }
                        extras.push(value + ' ' + key);
                    });

                    order += ' ' + extras.join(' and ');
                }

                return order;
            };

            $scope.removeItem = function (index) {
                book.drinks.splice(index, 1);
            };

            $scope.buildOrder = function () {
                var order = [];

                book.drinks.forEach(function (item) {
                    order.push({
                        qty: 1,
                        notes: null,
                        item: $scope.generateName(item)
                    });
                });

                return order;
            };

            $scope.submit_order = function () {
                if (book.drinks.length > 0) {
                    $scope.coModuleInstance.$exec('commit_order', $scope.buildOrder());
                    return true;
                }
                return false;
            };
        }]);

}(this.angular));
