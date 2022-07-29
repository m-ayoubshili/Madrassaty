function schoolService($http, $q, $log, CONSTANTS) {

    // define school controller url
    var schoolCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.SCHOOLS_URL;


    // get schools
    //this.GetSchools = function () {

    //    // add accesstoken in url headers
    //    var accesstoken = sessionStorage.getItem('accessToken');

    //    var config = {
    //        headers: {
    //            'Authorization': 'Bearer ' + accesstoken,
    //            'Content-Type': 'application/json'
    //        }
    //    };

    //    return $http.get(schoolCtrlUrl, config);
    //};

    // get schools
    this.getSchools = function () {
        deferred = $q.defer();
        var resp = $http({
            url: CONSTANTS.BASE_URL + "Schools",
            method: "GET",
        }).success(function (response) {
            $log.log("response: " + CONSTANTS.SHOOLS_URL);
            $log.log(response);
            deferred.resolve(response);
        }).error(function (err, status) {
            $log.log(err);
            $log.log(status);
            deferred.reject(err);
        });
        return deferred.promise;
    };


    // get default school
    this.GetDefaultSchool = function () {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(schoolCtrlUrl + 1, config);
    };

    // put school
    this.UpdateSchool = function (id, model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(schoolCtrlUrl + id, model, config);
    }

    // get school photo path
    this.GetSchoolPhoto = function (photo) {
        var path = CONSTANTS.SCHOOL_PHOTO_PATH;
        if (photo != "" && photo != null) {
            path = path + photo + '?' + new Date().getTime();
        }
        else {
            path = path + "empty-logo.png";
        }

        return path;
    }
};

angular
    .module('isApi')
    .service('schoolService', schoolService);