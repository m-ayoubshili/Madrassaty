function removeDisciplineCtrl($scope, $rootScope, $uibModalInstance, notify, disciplineService, disciplines, index) {

    var id = $rootScope.disciplineId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        disciplineService.DeleteDiscipline(id)
         .success(function (r) {
             disciplines.splice(index, 1);

             notify({
                 message: 'Discipline is deleted with success.',
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
    }
}

angular
    .module('isApi')
    .controller('removeDisciplineCtrl', removeDisciplineCtrl);