app.service('loginservice', function ($http, $q, authDataFactory, authenticationService, CONSTANTS) {
    var userInfo;
    var deviceInfo = [];
    var deferred;
    this.register = function (userInfo) {
        var resp = $http({
            url: CONSTANTS.BASE_URL + "Account/Register",  /*"http://localhost:58232/api/Account/Register",*/
            method: "POST",
            data: userInfo,
        });
        return resp;
    };

    this.login = function (loginData) {
        var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;
        deferred = $q.defer();
        var resp = $http({
            url: CONSTANTS.LOGIN_URL,   /*"http://localhost:58232/Token",*/
            method: "POST",
            data: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;' }
        }).success(function (response) {
            var o = angular.fromJson(response.user); //var o = response;
            userInfo = {
                accessToken: response.access_token,
                userName: o.UserName //response.userName
            };
            authenticationService.setTokenInfo(userInfo);
            authDataFactory.authenticationData.IsAuthenticated = true;
            authDataFactory.authenticationData.userName = o.UserName;  //response.userName;
            deferred.resolve(response);
        })
        .error(function (err, status) {
            console.log(err);
            authDataFactory.authenticationData.IsAuthenticated = false;
            authDataFactory.authenticationData.userName = "";
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.logOut = function () {
        authenticationService.removeToken();
        authDataFactory.authenticationData.IsAuthenticated = false;
        authDataFactory.authenticationData.userName = "";
    };
});