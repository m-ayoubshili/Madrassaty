function presencesService($http, CONSTANTS) {

    // define presences controller url
    var presencesCtrlUrl = CONSTANTS.BASE_URL + "Presences"; 

    // get presences
    this.GetPresences = function (CourseId, LevelId, DisciplineId) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(presencesCtrlUrl +"?courseId="+ CourseId + "&levelId="+LevelId+"&DisciplineId="+DisciplineId, config);
    }

    // update presences
    this.UpdatePresence = function (model) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(presencesCtrlUrl, model, config);
    }

    // update All presences
    this.UpdateAllPresence = function (model) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(presencesCtrlUrl + "?courseId=" + model.CourseId + "&disciplineId=" + model.DisciplineId + "&levelId=" + model.LevelId + "&present=" + model.Present, null, config);
    }



    // delete presences
    this.DeletePresence = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(presencesCtrlUrl + id, config);
    }
};

angular
    .module('isApi')
    .service('presencesService', presencesService);