function PresencesCtrl($scope, $rootScope, $uibModal, notify,  presencesService) {

    $scope.currentCourse = JSON.parse(sessionStorage.getItem('currentCourse'));

    $scope.Presences = [];
    presencesService.GetPresences($scope.currentCourse.Id, $scope.currentCourse.DisciplineLevelId, $scope.currentCourse.DisciplineId)
        .success(function (r) {
            $scope.Presences = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.setPresence = function (presence) {
        var model = {
            CourseId: $scope.currentCourse.Id, 
            StudentId : presence.MemberId, 
            Present: presence.Present, 
        }
        presencesService.UpdatePresence(model)
            .success(function (r) {
                notify({
                    message: 'Presence is updated with success.',
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

    $scope.setAllPresence = function (status) {
        var model = {
            CourseId: $scope.currentCourse.Id,
            DisciplineId : $scope.currentCourse.DisciplineId, 
            LevelId: $scope.currentCourse.DisciplineLevelId, 
            Present: status,
        }


        presencesService.UpdateAllPresence(model)
            .success(function (r) {
                $scope.Presences = r;
                notify({
                    message: 'Presence is updated with success.',
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
    .controller('PresencesCtrl', PresencesCtrl);