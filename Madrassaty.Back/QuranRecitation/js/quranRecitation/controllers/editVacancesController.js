function editVacanceCtrl($scope, $rootScope, $uibModalInstance, notify, VacanceService, vacances, index) {

    var id = $rootScope.vacanceId;
    var anneeScolaireStarDay = $rootScope.anneeScolaireStarDay; 
    var anneeScolaireEndDay = $rootScope.anneeScolaireEndDay; 


    $scope.vacance = {};
    $scope.modalTitle = "Ajout";
    if (id != 0 && id != null) {
        VacanceService.GetVacanceById(id)
            .success(function (r) { 
                $scope.vacance = r;
                $scope.vacance.StartDay = new Date($scope.vacance.StartDay);
                $scope.vacance.EndDay = new Date($scope.vacance.EndDay);
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

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(anneeScolaireEndDay),
        minDate: new Date(anneeScolaireStarDay),
        startingDay: 1
    };

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

    $scope.addEditVacance = function () {
        if (id != 0 && id != null) {
            // update vacance
            VacanceService.UpdateVacance(id, $scope.vacance)
                .success(function (r) {
                    $scope.vacance = r;
                    if (index !== -1) {
                        vacances.splice(index, 1, $scope.vacance);
                    }

                    notify({
                        message: 'Classroom is updated with success.',
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
            // create new Vacance
            VacanceService.CreateVacance($scope.vacance)
                .success(function (r) {
                    $scope.vacance = r;
                    vacances.push($scope.vacance);

                    notify({
                        message: 'Vacance is created with success.',
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
    .controller('editVacanceCtrl', editVacanceCtrl);