function memberService($http, CONSTANTS) {

    // define member controller url
    var mbrCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.MEMBERS_URL;

    // add accesstoken in url headers
    var accesstoken = sessionStorage.getItem('accessToken');

    var config = {
        headers: {
            'Authorization': 'Bearer ' + accesstoken,
            'Content-Type': 'application/json'
        }
    };

    // get members
    this.GetMembers = function () {
        return $http.get(mbrCtrlUrl, config);
    };

    // get member by id
    this.GetMemberById = function (id) {
        return $http.get(mbrCtrlUrl + id, config);
    };

    // get members teachers
    this.GetTeachers = function () {
        return $http.get(mbrCtrlUrl + 'Teachers', config);
    };

    // get members students
    this.GetStudents = function (levelId) {
        return $http.get(mbrCtrlUrl + 'Students/' + levelId, config);
    };

    // get members students
    this.GetAllStudents = function () {
        return $http.get(mbrCtrlUrl + 'Students', config);
    };
    // put member
    this.UpdateMember = function (id, model) {
        return $http.put(mbrCtrlUrl + id, model, config);
    }

    // update member login & password
    this.UpdateMemberLogin = function (model) {
        return $http.put(mbrCtrlUrl, model, config);
    }

    // post member
    this.CreateMember = function (model) {
        return $http.post(mbrCtrlUrl, model, config);
    }

    // delete member
    this.DeleteMember = function (id) {
        return $http.delete(mbrCtrlUrl + id, config);
    }

    // get member status
    this.GetMemberStatus = function () {
        return $http.get(mbrCtrlUrl + 'MemberStatuses', config);
    }

    // get member photo path
    this.GetMemberPhoto = function (photo) {
        var path = CONSTANTS.MEMBER_PHOTO_PATH;
        if (photo != "" && photo != null) {
            path = path + photo + '?' + new Date().getTime();
        }
        else {
            path = path + "unknown.jpg";
        }

        return path;
    }
};

angular
    .module('isApi')
    .service('memberService', memberService);