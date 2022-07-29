function statusService($http, $q, $log, CONSTANTS) {
    this.getStatus = function () {
        deferred = $q.defer();
        var resp = $http({
            url: CONSTANTS.BASE_URL +"MemberStatus",  /*CONSTANTS.STATUS_URL,*/
            method: "GET",
        }).success(function (response) {
            $log.log("response: " + CONSTANTS.STATUS_URL);
            console.log(response);
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

app.service('statusService', statusService);