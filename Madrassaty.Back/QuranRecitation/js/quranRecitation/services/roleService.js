function roleService($http, CONSTANTS) {

    // define role controller url
    var roleCtrlUrl = CONSTANTS.BASE_URL + CONSTANTS.ROLES_URL;

    // get roles
    this.GetRoles = function () {

        // add accesstoken in url headers
        var accesstoken = sessionStorage.getItem('accessToken');

        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        return $http.get(roleCtrlUrl, config);
    };
}

angular
    .module('isApi')
    .service('roleService', roleService);