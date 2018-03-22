(function (angular) {
    'use strict';
    var PER_PAGE = 9;

    angular.module('AcaEngine')
        .controller('TvCtrl', [
            '$scope',

            function ($scope) {
                var hasIcon = {
                    "ABC News 24": true,
                    "ABC 1": true,
                    "ABC 2": true,
                    "ABC 3": true,
                    "One": true,
                    "SBS One": true,
                    "SBS 2": true,
                    "7Mate": true,
                    "Seven": true,
                    "7TWO": true,
                    "Nine": true,
                    "Ten": true,
                    "Eleven": true,
                    "GO": true,
                    "GEM": true,
                    "Bloomberg": true,
                    "CNN": true,
                    "CNBC": true,
                    "BBC World": true,
                    "Sky News": true,
                    "Nick Jr.": true,
                    "Fox Sports": true,
                    "ESPN": true,
                    "Fox Sports News": true,
                    "Fox Footy": true,
                    "NITV": true
                };

                $scope.data = {};
                $scope.$watch('data.channelNames', function (newVal) {
                    if (newVal) {
                        $scope.icons = [];
                        $scope.others = [];
                        angular.forEach(newVal, function (name) {
                            if (name in hasIcon)
                                $scope.icons.push(name);
                            else
                                $scope.others.push(name);
                        })
                    }
                });

                $scope.build_css_class = function (name) {
                    if (name == '7Mate')
                        return 'seven_mate';
                    else if (name == '7TWO')
                        return 'seven_two';
                    else
                        return name.replace(/\s+|\./g, '_').toLowerCase();
                };
            }
        ]);

}(this.angular));
