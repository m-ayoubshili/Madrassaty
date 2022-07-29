function nextController($scope, authenticationService) {
    authenticationService.validateRequest();
};

app.controller('nextController', nextController);