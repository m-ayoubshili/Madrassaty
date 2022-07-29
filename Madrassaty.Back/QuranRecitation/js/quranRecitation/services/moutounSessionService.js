function moutounSessionService($http, CONSTANTS) {

    // define MoutounSessionCtrlUrl controller url
    var MoutounSessionCtrlUrl = CONSTANTS.BASE_URL + "MoutounSession/";

    // add accesstoken in url headers
    var accesstoken = sessionStorage.getItem('accessToken');

    var config = {
        headers: {
            'Authorization': 'Bearer ' + accesstoken,
            'Content-Type': 'application/json'
        }
    };

    // get MoutounSession
    this.GetMoutounSessions = function () {
        return $http.get(MoutounSessionCtrlUrl, config);
    }

    // get MoutounSession
    this.GetMoutounSessionById = function (Id) {
        return $http.get(MoutounSessionCtrlUrl + Id, config);
    }

    // create MoutounSession
    this.CreateMoutounSession = function (model) {
        return $http.post(MoutounSessionCtrlUrl, model, config);
    }

    // update MoutounSession
    this.UpdateMoutounSession = function (id, model) {
        return $http.put(MoutounSessionCtrlUrl + id, model, config);
    }

    // delete MoutounSession
    this.DeleteMoutounSession = function (id) {
        return $http.delete(MoutounSessionCtrlUrl + id, config);
    }

};

angular
    .module('isApi')
    .service('moutounSessionService', moutounSessionService);