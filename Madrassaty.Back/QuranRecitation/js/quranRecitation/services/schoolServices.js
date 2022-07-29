function schoolService($http, $q, $log,CONSTANTS) {

    this.getSchools = function () {

        deferred = $q.defer();

        var resp = $http({
            url: CONSTANTS.BASE_URL + CONSTANTS.SHOOLS_URL,
            method: "GET",
        }).success(function (response) {
            $log.log("response: " + CONSTANTS.SHOOLS_URL);
            $log.log(response);
            deferred.resolve(response);
        })
        .error(function (err, status) {
            $log.log(err);
            $log.log(status);
            deferred.reject(err);
        });
        return deferred.promise;
    };
};

app.service('schoolService', schoolService);