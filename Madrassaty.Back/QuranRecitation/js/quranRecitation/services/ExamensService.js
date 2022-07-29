function examenService ($http, CONSTANTS) {

    // define examens controller url
    var examenCtrlUrl = CONSTANTS.BASE_URL + "Examen/";

    // get examens
    this.GetExamens = function () {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(examenCtrlUrl, config);
    }

    // get examen by id
    this.GetExamenById = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(examenCtrlUrl + id, config);
    }

    // create examen
    this.CreateExamen = function (model) {
     
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(examenCtrlUrl, model, config);
    }

    // update examen
    this.UpdateExamen = function (id, model) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(examenCtrlUrl + id, model, config);
    }

    // delete examen
    this.DeleteExamen = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(examenCtrlUrl + id, config);
    }
};

angular
    .module('isApi')
    .service('examenService', examenService);