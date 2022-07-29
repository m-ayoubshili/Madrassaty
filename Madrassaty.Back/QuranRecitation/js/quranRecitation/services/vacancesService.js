function VacanceService($http, CONSTANTS) {

    // define VacanceScolaire controller url
    var VacancesCtrlUrl = CONSTANTS.BASE_URL + "VacanceScolaire/";

    // get classrooms
    this.GetVacances = function () {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };
        return $http.get(VacancesCtrlUrl, config);
    }

    // get Vacance
    this.GetVacanceById = function (Id) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };
        return $http.get(VacancesCtrlUrl + Id, config);
    }

    // create Vacance
    this.CreateVacance = function (model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(VacancesCtrlUrl, model, config);
    }

    // update Vacance
    this.UpdateVacance = function (id, model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(VacancesCtrlUrl + id, model, config);
    }

    // delete Vacance
    this.DeleteVacance = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(VacancesCtrlUrl + id, config);
    }



};

angular
    .module('isApi')
    .service('VacanceService', VacanceService);