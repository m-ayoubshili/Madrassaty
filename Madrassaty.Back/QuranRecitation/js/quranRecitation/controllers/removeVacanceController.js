function removeVacanceCtrl($scope, $rootScope, $uibModalInstance, notify, VacanceService, vacances, index) {

    var id = $rootScope.vacanceId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        VacanceService.DeleteVacance(id)
            .success(function (r) {
                vacances.splice(index, 1);

                notify({
                    message: 'Vacance is deleted with success.',
                    templateUrl: 'views/angular-notify.html'
                });
            })
            .error(function (r) {
                notify({
                    message: 'Failed operation!',
                    templateUrl: 'views/angular-notify.html'
                });
            });

        $uibModalInstance.close();
    };
}

angular
    .module('isApi')
    .controller('removeVacanceCtrl', removeVacanceCtrl)