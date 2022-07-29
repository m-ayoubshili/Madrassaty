function notesExamenCtrl($scope, $rootScope, $uibModal, notify, notesExamenService) {

    $scope.currentExamen = JSON.parse(sessionStorage.getItem('currentExamen'));

    $scope.notesExamen = [];
    notesExamenService.GetNotesExamen($scope.currentExamen.Id, $scope.currentExamen.DisciplineId, $scope.currentExamen.DisciplineLevelId)
        .success(function (r) {

            $scope.notesExamen = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.setNote = function (note) {
        var model = {
            ExamenId: note.ExamenId,
            StudentId: note.StudentId.toString(),
            Note: note.Note,
            Observation: note.Observation
        }
        notesExamenService.UpdateNoteExamen(model)
            .success(function (r) {
                notify({
                    message: 'Note is updated with success.',
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

    var $ctrl = this;
}

angular
    .module('isApi')
    .controller('notesExamenCtrl', notesExamenCtrl);