function levelsCtrl($scope, $uibModal, $rootScope, notify, disciplineService, disciplineLevelService) {

    $scope.disciplines = [];

    disciplineService.GetDisciplines()
        .success(function (r) {
            $scope.disciplines = r;
            $scope.disciplineItem = ($scope.disciplines[0].Id).toString();
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.levels = [];

    disciplineLevelService.GetDisciplineLevels()
        .success(function (r) {
            $scope.levels = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    //Custom filter
    $scope.customFilter = function (data) {
        if (data.DisciplineId === parseInt($scope.disciplineItem)) {
            return true;
        } else {
            return false;
        }
    };

    var $ctrl = this;

    $scope.setDisciplineLevelStudents = function (disciplineLevelId, size, index, parentSelector) {
        $rootScope.levelId = disciplineLevelId;

        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/levelStudents.html',
            controller: 'levelStudentsCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem
        })
    };
}

angular
    .module('isApi')
    .controller('levelsCtrl', levelsCtrl)