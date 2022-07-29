function moutounService($http, CONSTANTS) {

    // define MoutounCtrlUrl controller url
    var MoutounCtrlUrl = CONSTANTS.BASE_URL + "Moutoun/";

    // add accesstoken in url headers
    var accesstoken = sessionStorage.getItem('accessToken');

    var config = {
        headers: {
            'Authorization': 'Bearer ' + accesstoken,
            'Content-Type': 'application/json'
        }
    };

    // get Moutoun
    this.GetMoutouns = function () {
        return $http.get(MoutounCtrlUrl, config);
    }

    // get Moutoun
    this.GetMoutounById = function (Id) {
        return $http.get(MoutounCtrlUrl + Id, config);
    }

    // create Moutoun
    this.CreateMoutoun = function (model) {
        return $http.post(MoutounCtrlUrl, model, config);
    }

    // update Moutoun
    this.UpdateMoutoun = function (id, model) {
        return $http.put(MoutounCtrlUrl + id, model, config);
    }

    // delete Moutoun
    this.DeleteMoutoun = function (id) {
        return $http.delete(MoutounCtrlUrl + id, config);
    }

};

angular
    .module('isApi')
    .service('moutounService', moutounService);