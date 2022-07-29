function sessionsRecitationParticipantCtrl($scope, $uibModalInstance, $rootScope, notify, memberService, recitationSessionLevelService, sessionsRecitationStudentService) {
    $scope.modalTitle = "Ajout";
    $scope.currentSession = JSON.parse(sessionStorage.getItem('currentSession'));

     
    $scope.Students = [];
    memberService.GetStudents(1)
        .success(function(r) {
            $scope.Students = r;
        })
        .error(function(r) {
            $scope.err = r;
        });

    $scope.disciplineLevels = [];
    recitationSessionLevelService.GetSessionLevelsByRecitationId($scope.currentSession.Id)
        .success(function(r) {
            $scope.disciplineLevels = r;
        })
        .error(function(r) {
            $scope.err = r;
        });

    $scope.LevelSelect = "";
    $scope.StudentSelect = "";

    $scope.addSessionsRecitationParticipant = function() {
        $scope.newParticipant = {
            StudentId: $scope.StudentSelect,
            RecitationId: $scope.currentSession.Id,
        };

        sessionsRecitationStudentService.AddSessionsRecitationStudent($scope.newParticipant)
            .success(function(r) {               
                notify({
                    message: 'Student is added with success.',
                    templateUrl: 'views/angular-notify.html'
                });

                $uibModalInstance.close();
            })
            .error(function(r) {
                notify({
                    message: 'Failed operation!',
                    templateUrl: 'views/angular-notify.html'
                });
            });

        
    }

    $scope.cancelModal = function() {
        $uibModalInstance.dismiss('cancel');
    };

    

    var $ctrl = this;

};

angular
    .module('isApi')
    .controller('sessionsRecitationParticipantCtrl', sessionsRecitationParticipantCtrl);