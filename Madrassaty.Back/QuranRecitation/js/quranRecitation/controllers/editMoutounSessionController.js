function editMoutounSessionCtrl($scope, $rootScope, $uibModalInstance, notify, moutounSessionService, moutounService, memberService, MoutounSessions, index) {

    var id = $rootScope.MoutounSessionId;

    $scope.Moutouns = [];
    moutounService.GetMoutouns()
        .success(function (r) {
            $scope.Moutouns = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.moutounSession;
    $scope.modalTitle = "Ajout";
    if (id != 0 && id != null) {
        moutounSessionService.GetMoutounSessionById(id)
            .success(function (r) {
                $scope.moutounSession = r;
            })
            .error(function (r) {
                $scope.err = r;
            });
        $scope.modalTitle = "Modification";
    }

    // get All students
    $scope.Students = [];
    memberService.GetAllStudents()
        .success(function (r) {
            $scope.Students = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    // get teachers
    $scope.Teachers = [];
    memberService.GetTeachers()
        .success(function (r) {
            $scope.Teachers = r;
        })
        .error(function (r) {
            $scope.err = r;
        });


   

    

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addEditMoutounSession = function () {
        if (id != 0 && id != null) {
            // update MoutounSession
            moutounSessionService.UpdateMoutounSession(id, $scope.moutounSession)
                .success(function (r) {
                    $scope.moutounSession = r;
                    if (index !== -1) {
                        MoutounSessions.splice(index, 1, $scope.moutounSession);
                    }

                    notify({
                        message: 'MoutounSession is updated with success.',
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
            // create new moutounSession
            moutounSessionService.CreateMoutounSession($scope.moutounSession)
                .success(function (r) {
                    $scope.moutounSession = r;
                    MoutounSessions.push($scope.moutounSession);

                    notify({
                        message: 'MoutounSession is created with success.',
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
    .controller('editMoutounSessionCtrl', editMoutounSessionCtrl);