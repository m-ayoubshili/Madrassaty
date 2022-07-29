function navigationController($scope, authenticationService) {
    $scope.user = angular.fromJson(sessionStorage.getItem('user'));
};

app.controller('navigationController', navigationController);

