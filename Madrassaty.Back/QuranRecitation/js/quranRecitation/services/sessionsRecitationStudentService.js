function sessionsRecitationStudentService($http, CONSTANTS) {

    // Add Sessions Recitation Student 
    this.AddSessionsRecitationStudent = function (model) {
        // define url
        var AddUrl = CONSTANTS.BASE_URL + "StudentRecitation";

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(AddUrl, model, config);
    };

    // Add Sessions Recitation Student 
    this.GetSessionsRecitationStudent = function (RecitationId) {
        // define url
        var GetUrl = CONSTANTS.BASE_URL + "StudentRecitation?RecitationId=" + RecitationId;

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(GetUrl, config);
    };

}

angular
    .module('isApi')
    .service('sessionsRecitationStudentService', sessionsRecitationStudentService);