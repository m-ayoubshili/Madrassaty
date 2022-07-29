function editClassroomCtrl($scope, $rootScope, $uibModalInstance, notify, classroomService, classrooms, index) {

    var id = $rootScope.classroomId;

    $scope.classroom = {
        Wording: '',
    };

    $scope.modalTitle = "Ajout";

    if (id != 0 && id != null) {
        classroomService.GetClassroomById(id)
        .success(function (r) {
            $scope.classroom = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

        $scope.modalTitle = "Modification";
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addEditClassroom = function () {
        if (id != 0 && id != null) {
            // update classroom
            classroomService.UpdateClassroom(id, $scope.classroom)
             .success(function (r) {
                 $scope.classroom = r;
                 if (index !== -1) {
                     classrooms.splice(index, 1, $scope.classroom);
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
            // create new classroom
            classroomService.CreateClassroom($scope.classroom)
             .success(function (r) {
                 $scope.classroom = r;
                 classrooms.push($scope.classroom);

                 notify({
                     message: 'Classroom is created with success.',
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
    .controller('editClassroomCtrl', editClassroomCtrl);