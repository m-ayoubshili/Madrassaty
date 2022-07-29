function editDisciplineCtrl($scope, $rootScope, $uibModalInstance, notify, disciplineService, disciplines, index) {

    var id = $rootScope.disciplineId;

    $scope.discipline = {};
    $scope.modalTitle = "Ajout";

    if (id != 0 && id != null) {
        disciplineService.GetDisciplineById(id)
        .success(function (r) {
            $scope.discipline = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

        $scope.modalTitle = "Modification";
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addEditDiscipline = function () {
        if (id != 0 && id != null) {
            // update discipline
            disciplineService.UpdateDiscipline(id, $scope.discipline)
             .success(function (r) {
                 $scope.discipline = r;
                 if (index !== -1) {
                     disciplines.splice(index, 1, $scope.discipline);
                 }

                 notify({
                     message: 'Discipline is updated with success.',
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
            // create new discipline
            disciplineService.CreateDiscipline($scope.discipline)
             .success(function (r) {
                 $scope.discipline = r;
                 disciplines.push($scope.discipline);

                 notify({
                     message: 'Discipline is created with success.',
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
    .controller('editDisciplineCtrl', editDisciplineCtrl);