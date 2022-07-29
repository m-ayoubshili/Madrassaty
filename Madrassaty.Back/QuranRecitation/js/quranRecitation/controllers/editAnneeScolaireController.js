function editAnneeScolaireServiceCtrl($scope, $rootScope, $uibModalInstance, notify, anneeScolaireService, anneeScolaires, index) {

    var id = $rootScope.AnneeScolaireId;

    $scope.anneeScolaire = {};
    $scope.modalTitle = "Ajout";
    if (id != 0 && id != null) {
        anneeScolaireService.GetAnneeScolaireById(id)
            .success(function (r) {
                $scope.anneeScolaire = r;
                $scope.anneeScolaire.StartDay = new Date($scope.anneeScolaire.StartDay);
                $scope.anneeScolaire.EndDay = new Date($scope.anneeScolaire.EndDay);
            })
            .error(function (r) {
                $scope.err = r;
            });
        $scope.modalTitle = "Modification";
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];


    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.addEditAnneeScolaire = function () {
        if (id != 0 && id != null) {
            // update AnneeScolaire
            anneeScolaireService.UpdateAnneeScolaire(id, $scope.anneeScolaire)
                .success(function (r) {
                    $scope.anneeScolaire = r;
                    if (index !== -1) {
                        anneeScolaires.splice(index, 1, $scope.anneeScolaire);
                    }

                    notify({
                        message: 'AnneeScolaire is updated with success.',
                        templateUrl: 'views/angular-notify.html'
                    });
                })
                .error(function (r) {
                    notify({
                        message: 'Failed operation!',
                        templateUrl: 'views/angular-notify.html'
                    });
                });
        }
        else {
            // create new anneeScolaire
            anneeScolaireService.CreateAnneeScolaire($scope.anneeScolaire)
                .success(function (r) {
                    $scope.anneeScolaire = r;
                    anneeScolaires.push($scope.anneeScolaire);

                    notify({
                        message: 'AnneeScolaire is created with success.',
                        templateUrl: 'views/angular-notify.html'
                    });
                })
                .error(function (r) {
                    notify({
                        message: 'Failed operation!',
                        templateUrl: 'views/angular-notify.html'
                    });
                });
        }

        $uibModalInstance.close();
    }

}

angular
    .module('isApi')
    .controller('editAnneeScolaireServiceCtrl', editAnneeScolaireServiceCtrl);