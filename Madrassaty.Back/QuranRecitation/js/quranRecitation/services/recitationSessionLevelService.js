function recitationSessionLevelService($http, CONSTANTS) {

    // define recurrence controller url
    var recitationSessionLevelCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.RECITATIONLVELs_URL;

    // get Recitation Session Level
    this.GetRecitationSessionLevel = function () {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };
        return $http.get(recitationSessionLevelCtrlUrl, config);
    }

    // get Recitation Session Level by RecitationId
    this.GetSessionLevelsByRecitationId = function(RecitationId) {
        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');
        // define url
        var Url = CONSTANTS.BASE_URL + "RecitationDisciplineLevels?RecitationId=" + RecitationId;

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };
        return $http.get(Url, config);
    }

};

angular
    .module('isApi')
    .service('recitationSessionLevelService', recitationSessionLevelService);