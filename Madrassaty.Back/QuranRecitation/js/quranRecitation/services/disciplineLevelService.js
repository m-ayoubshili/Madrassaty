function disciplineLevelService ($http, CONSTANTS) {

    // define discipline levels controller url
    var disciplineLevelCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.LEVELS_URL;

    // get levels
    this.GetDisciplineLevels = function () {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(disciplineLevelCtrlUrl, config);
    }

    // get levels by discipline
    this.GetLevelsByDiscipline = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(disciplineLevelCtrlUrl + id, config);
    }

    // create level
    this.CreateDisciplineLevel = function (model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(disciplineLevelCtrlUrl, model, config);
    }

    // update level
    this.DeleteDisciplineLevel = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(disciplineLevelCtrlUrl + id, config);
    }

    // assign student to discipline level
    this.AddLevelStudents = function (id, model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(disciplineLevelCtrlUrl + id, model, config);
    }
};

angular
    .module('isApi')
    .service('disciplineLevelService', disciplineLevelService);