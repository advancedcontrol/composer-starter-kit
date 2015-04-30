(function (angular) {
    'use strict';

    angular.module('AcaEngine')

        .controller('CotagCtrl', [
            '$rootScope',
            '$scope',
            '$comms',

            function ($rootScope, $scope, $comms) {

                $scope.$watch('cotag_domain', function(dom) {
                    if (!dom) { return; } else {
                        $rootScope.cotag = dom;
                    }
                    
                    if (!$comms.hasProvider('cotag')) {
                        var redirect_uri = window.location.origin + '/oauth-resp.html';

                        $comms.addProvider({
                            id: 'cotag',
                            scope: 'public',
                            oauth_server: dom + '/auth/oauth/authorize',
                            oauth_tokens: dom + '/auth/token',
                            redirect_uri: redirect_uri,
                            client_id: window.SparkMD5.hash(redirect_uri),
                            api_endpoint: dom + '/api/',
                            proactive: true,
                            login_redirect: function () {
                                return dom;
                            }
                        });
                    }
                });
            }
        ]);

}(this.angular));
