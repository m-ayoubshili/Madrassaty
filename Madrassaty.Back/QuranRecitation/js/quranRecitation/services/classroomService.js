function classroomService ($http, CONSTANTS) {

    // define classrooms controller url
    var classroomCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.CLASSROOM_URL;

    // get classrooms
    this.GetClassrooms = function () {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(classroomCtrlUrl, config);
    }

    // get classroom by id
    this.GetClassroomById = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(classroomCtrlUrl + id, config);
    }

    // create classroom
    this.CreateClassroom = function (model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(classroomCtrlUrl, model, config);
    }

    // update classroom
    this.UpdateClassroom = function (id, model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(classroomCtrlUrl + id, model, config);
    }

    // delete classroom
    this.DeleteClassroom = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(classroomCtrlUrl + id, config);
    }
};

angular
    .module('isApi')
    .service('classroomService', classroomService);