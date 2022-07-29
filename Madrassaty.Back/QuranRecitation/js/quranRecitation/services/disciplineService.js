function disciplineService ($http, CONSTANTS) {

    // define discipline controller url
    var disciplineCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.DISCIPLINES_URL;

    // get disciplines
    this.GetDisciplines = function () {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(disciplineCtrlUrl, config);
    }

    // get discipline by id
    this.GetDisciplineById = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(disciplineCtrlUrl + id, config);
    }

    // update discipline
    this.UpdateDiscipline = function (id, model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(disciplineCtrlUrl + id, model, config);
    }

    // create discipline
    this.CreateDiscipline = function (model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(disciplineCtrlUrl, model, config);
    }

    // delete discipline
    this.DeleteDiscipline = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(disciplineCtrlUrl + id, config);
    }
};

angular
    .module('isApi')
    .service('disciplineService', disciplineService);