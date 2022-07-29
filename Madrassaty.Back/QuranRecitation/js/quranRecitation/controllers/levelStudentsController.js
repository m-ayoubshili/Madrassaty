function levelStudentsCtrl($scope, $rootScope, $uibModalInstance, notify, memberService, disciplineLevelService) {

    var levelId = $rootScope.levelId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.students = [];

    memberService.GetStudents(levelId)
        .success(function (r) {
            $scope.students = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.validate = function () {
        disciplineLevelService.AddLevelStudents(levelId, $scope.students)
        .success(function (r) {
            notify({
                message: 'Students assigned with success.',
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
    .controller('levelStudentsCtrl', levelStudentsCtrl)