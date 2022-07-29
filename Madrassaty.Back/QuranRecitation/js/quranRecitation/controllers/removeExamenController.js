function removeExamenCtrl($scope, $rootScope, $uibModalInstance, notify, examenService, examens, index) {

    var id = $rootScope.ExamenId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        examenService.DeleteExamen(id)
            .success(function (r) {
                examens.splice(index, 1);

                notify({
                    message: 'Examen is deleted with success.',
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
    .controller('removeExamenCtrl', removeExamenCtrl)