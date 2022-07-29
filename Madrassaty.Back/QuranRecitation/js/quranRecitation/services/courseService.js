function courseService ($http, CONSTANTS) {

    // define course controller url
    var courseCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.COURSES_URL;

    // get courses
    this.GetCourses = function () {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(courseCtrlUrl, config);
    }

    // get course by id
    this.GetCourseById = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(courseCtrlUrl + id, config);
    }

    // put course
    this.UpdateCourse = function (id, model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.put(courseCtrlUrl + id, model, config);
    }

    // post course
    this.CreateCourse = function (model) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.post(courseCtrlUrl, model, config);
    }

    // delete course
    this.DeleteCourse = function (id) {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.delete(courseCtrlUrl + id, config);
    }
};

angular
    .module('isApi')
    .service('courseService', courseService);