function loginCtrl($scope, $state, loginservice, statusService, schoolService, $log, SweetAlert) {

    $scope.responseData = "";
    $scope.userName = "";
    $scope.userLoginEmail = "";
    $scope.userLoginPassword = "";
    $scope.accessToken = "";
    $scope.refreshToken = "";

    $scope.login = function () {
        var userLogin = {
            grant_type: 'password',
            username: $scope.userLoginEmail,
            password: $scope.userLoginPassword
        };

        var promiselogin = loginservice.login(userLogin);

        promiselogin.then(function (resp) {
            //$scope.userName = resp.userName;
            setUserParams(resp);
            redirectToDashboard();
        }, function (err) {
            showAlert(err.error_description);
            $scope.responseData = "Error " + err.status;
        });
    };

    function redirectToDashboard() {
        $state.go("core.dashboard");
    };

    function redirectToLogin() {
        $state.go("login");
    };

    function setUserParams(resp) {
        var user = angular.fromJson(resp.user);
        sessionStorage.setItem('userId', user.Id);
        sessionStorage.setItem('userName', user.UserName);
        $scope.userName = user.UserName;
        sessionStorage.setItem('accessToken', resp.access_token);
        sessionStorage.setItem('refreshToken', resp.refresh_token);// à comprendre 
        sessionStorage.setItem('user', resp.user);
    };

    function showAlert(title) {
        SweetAlert.swal({
            title: "QuranRecitation",
            text: title
        });

    };
};

app.controller('loginCtrl', loginCtrl);