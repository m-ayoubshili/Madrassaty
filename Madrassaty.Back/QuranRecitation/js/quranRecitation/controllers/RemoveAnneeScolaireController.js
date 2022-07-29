function removeAnneeScolaireCtrl($scope, $rootScope, $uibModalInstance, notify, anneeScolaireService, anneeScolaires, index) {
    var id = $rootScope.AnneeScolaireId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        anneeScolaireService.DeleteAnneeScolaire(id)
            .success(function (r) {
                anneeScolaires.splice(index, 1);

                notify({
                    message: 'AnneeScolaire is deleted with success.',
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
    .controller('removeAnneeScolaireCtrl', removeAnneeScolaireCtrl)