function topNavigationCtrl($scope, $location, authDataFactory, authenticationService, loginservice, $state) {

    $scope.authentication = authDataFactory.authenticationData;

    $scope.logOut = function () {
        loginservice.logOut();
        $state.go('login');
    }

};

app.controller('topNavigationCtrl', topNavigationCtrl);