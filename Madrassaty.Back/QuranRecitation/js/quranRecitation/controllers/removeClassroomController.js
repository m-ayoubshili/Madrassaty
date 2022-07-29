function removeClassroomCtrl($scope, $rootScope, $uibModalInstance, notify, classroomService, classrooms, index) {

    var id = $rootScope.classroomId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        classroomService.DeleteClassroom(id)
         .success(function (r) {
             classrooms.splice(index, 1);

             notify({
                 message: 'Classrooms is deleted with success.',
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
    .controller('removeClassroomCtrl', removeClassroomCtrl)