function anneeScolaireCtrl($scope, $rootScope, $uibModal, notify, anneeScolaireService) {

    $scope.anneeScolaires = [];
    anneeScolaireService.GetAnneeScolaire()
        .success(function (r) {
            $scope.anneeScolaires = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.setAnneeScolaireId = function (AnneeScolaireId, size, index, parentSelector) {
        $rootScope.AnneeScolaireId = AnneeScolaireId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editAnneeScolaire.html',
            controller: 'editAnneeScolaireServiceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                anneeScolaires: function () {
                    return $scope.anneeScolaires;
                },
                index: function () {
                    return index;
                },
            }
        })
    };

    $scope.deleteAnneeScolaire = function (AnneeScolaireId, size, index, parentSelector) {
        debugger;
        $rootScope.AnneeScolaireId = AnneeScolaireId;
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeAnneeScolaireCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                anneeScolaires: function () {
                    return $scope.anneeScolaires;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.setActifAnneeScolaire = function (id) {
        anneeScolaireService.UpdateActifAnneeScolaire(id)
            .success(function (r) {
                $scope.anneeScolaires = r;
                notify({
                    message: 'AnneeScolaire is activated with success.',
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

    var $ctrl = this;
}

angular
    .module('isApi')
    .controller('anneeScolaireCtrl', anneeScolaireCtrl);