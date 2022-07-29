function vacancesCtrl($scope, $rootScope, $uibModal, notify,  VacanceService, anneeScolaireService) {
    $scope.vacances = [];

    VacanceService.GetVacances()
        .success(function (r) {
            $scope.vacances = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.anneeScolaire = ''; 
    anneeScolaireService.GetAnneeScolaireActif()
        .success(function (r) {
            $scope.anneeScolaire = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.setVacanceId = function (VacanceId, size, index, parentSelector) {
        $rootScope.vacanceId = VacanceId;
        $rootScope.anneeScolaireStarDay = $scope.anneeScolaire.StartDay; 
        $rootScope.anneeScolaireEndDay = $scope.anneeScolaire.EndDay; 

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editVacance.html',
            controller: 'editVacanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                vacances: function () {
                    return $scope.vacances;
                },
                index: function () {
                    return index;
                }, 

            }
        })
    };

    $scope.deleteVacance = function (VacanceId, size, index, parentSelector) {
        $rootScope.vacanceId = VacanceId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeVacanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                vacances: function () {
                    return $scope.vacances;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    var $ctrl = this;
}

angular
    .module('isApi')
    .controller('vacancesCtrl', vacancesCtrl);