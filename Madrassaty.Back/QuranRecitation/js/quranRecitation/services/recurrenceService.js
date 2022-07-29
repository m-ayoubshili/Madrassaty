function recurrenceService($http, CONSTANTS) {

    // define recurrence controller url
    var recurrenceCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.RECURRENCES_URL;

    // get recurrences
    this.GetRecurrences = function () {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(recurrenceCtrlUrl, config);
    }

};

angular
    .module('isApi')
    .service('recurrenceService', recurrenceService);