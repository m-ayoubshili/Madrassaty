function removeMoutounSessionCtrl($scope, $rootScope, $uibModalInstance, notify, moutounSessionService, MoutounSessions, index) {
    var id = $rootScope.MoutounSessionId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        moutounSessionService.DeleteMoutounSession(id)
            .success(function (r) {
                MoutounSessions.splice(index, 1);

                notify({
                    message: 'MoutounSessions is deleted with success.',
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
    .controller('removeMoutounSessionCtrl', removeMoutounSessionCtrl)