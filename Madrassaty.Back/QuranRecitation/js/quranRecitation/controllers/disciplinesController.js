function disciplinesCtrl($scope, $uibModal, $rootScope, notify, disciplineService) {

    $scope.disciplines = [];

    disciplineService.GetDisciplines()
        .success(function (r) {
            $scope.disciplines = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    var $ctrl = this;

    $scope.setDisciplineId = function (disciplineId, size, index, parentSelector) {
        $rootScope.disciplineId = disciplineId;
        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/addEditDiscipline.html',
            controller: 'editDisciplineCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                disciplines: function () {
                    return $scope.disciplines;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.deleteDiscipline = function (disciplineId, size, index, parentSelector) {
        $rootScope.disciplineId = disciplineId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeDisciplineCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                disciplines: function () {
                    return $scope.disciplines;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.disciplineLevels = function (disciplineId, size, index, parentSelector) {
        $rootScope.disciplineId = disciplineId;

        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/diciplineLevels.html',
            controller: 'disciplineLevelCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                index: function () {
                    return index;
                }
            }
        })
    };
}

angular
    .module('isApi')
    .controller('disciplinesCtrl', disciplinesCtrl);