function disciplineLevelCtrl($scope, $rootScope, $uibModalInstance, notify, disciplineLevelService, index) {

    var id = $rootScope.disciplineId;

    $scope.modalTitle = "Niveaux";

    $scope.newLevel = {
        DisciplineId: id,
        Wording: '',
        Description: ''
    };

    $scope.disciplineLevels = [];

    disciplineLevelService.GetLevelsByDiscipline(id)
        .success(function (r) {
            $scope.disciplineLevels = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.addDisciplineLevel = function () {
        disciplineLevelService.CreateDisciplineLevel($scope.newLevel)
         .success(function (r) {
             $scope.newLevel = r;
             $scope.disciplineLevels.push($scope.newLevel);
             $scope.newLevel = {
                 DisciplineId: id,
                 Wording: '',
                 Description: ''
             };

             notify({
                 message: 'Discipline level is created with success.',
                 templateUrl: 'views/angular-notify.html'
             });
         })
         .error(function (r) {
             notify({
                 message: 'Failed operation!',
                 templateUrl: 'views/angular-notify.html'
             });
         });
    };

    $scope.deleteLevel = function (id, index) {
        disciplineLevelService.DeleteDisciplineLevel(id)
         .success(function (r) {
             $scope.disciplineLevels.splice(index, 1);

             notify({
                 message: 'Discipline level is deleted with success.',
                 templateUrl: 'views/angular-notify.html'
             });
         })
         .error(function (r) {
             notify({
                 message: 'Failed operation!',
                 templateUrl: 'views/angular-notify.html'
             });
         });
    };

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };
}

angular
    .module('isApi')
    .controller('disciplineLevelCtrl', disciplineLevelCtrl);