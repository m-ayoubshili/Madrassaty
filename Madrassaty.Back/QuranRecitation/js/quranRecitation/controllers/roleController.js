function roleCtrl($scope, $uibModal, $rootScope, notify, roleService) {

    $scope.roles = [];

    roleService.GetRoles()
        .success(function (r) {
            $scope.roles = r;
        })
        .error(function (r) {
            $scope.err = r;
        });
}

angular
    .module('isApi')
    .controller('roleCtrl', roleCtrl);