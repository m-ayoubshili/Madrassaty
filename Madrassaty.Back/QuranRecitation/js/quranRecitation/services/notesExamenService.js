function notesExamenService($http, CONSTANTS) {

    // define notesExamen controller url
    var notesExamenCtrlUrl = CONSTANTS.BASE_URL + "ExamenNotes";

    // get notesExamen
    this.GetNotesExamen = function (examenId, DisciplineId, LevelId) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(notesExamenCtrlUrl + "?examenId=" + examenId+ "&DisciplineId=" + DisciplineId + "&levelId=" + LevelId , config);
    }

    // update notesExamen
    this.UpdateNoteExamen = function (model) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };
        return $http.put(notesExamenCtrlUrl, model, config);
    }
};

angular
    .module('isApi')
    .service('notesExamenService', notesExamenService);