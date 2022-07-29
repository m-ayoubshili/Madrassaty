function interceptors($httpProvider) {

    $httpProvider.interceptors.push(function ($q, $rootScope, $window, $location) {
        return {
            request: function (config) {

                return config;
            },
            requestError: function (rejection) {

                return $q.reject(rejection);
            },
            response: function (response) {
                if (response.status == "401") {
                    $location.path('/login');
                }
                //the same response/modified/or a new one need to be returned.  
                return response;
            },
            responseError: function (rejection) {

                if (rejection.status == "401") {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
};

angular.module('isApi').config(interceptors);