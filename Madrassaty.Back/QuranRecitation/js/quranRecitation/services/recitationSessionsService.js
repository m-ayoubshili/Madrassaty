function recitationSessionsService($http, CONSTANTS) {

    // define classrooms controller url
    var recitationCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.RECITATION_SESSIONS_URL;

    // get classrooms
    this.GetRecitationSession = function () {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');
        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };
        return $http.get(recitationCtrlUrl, config);
    }

    // get classroom by id
    this.GetRecitationSessionById = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(recitationCtrlUrl + id, config);
    }

    // create Rescitation Session
    this.CreateRescitationSession = function (model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(recitationCtrlUrl, model, config);
    }

    // update Recitation Session
    this.UpdateRecitationSession = function (id, model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(recitationCtrlUrl + id, model, config);
    }

    // delete Recitation Session
    this.DeleteRecitationSession = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(recitationCtrlUrl + id, config);
    }
};

angular
    .module('isApi')
    .service('recitationSessionsService', recitationSessionsService);