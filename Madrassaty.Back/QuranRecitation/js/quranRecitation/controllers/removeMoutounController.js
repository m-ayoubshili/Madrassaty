function removeMoutounCtrl($scope, $rootScope, $uibModalInstance, notify, moutounService, moutouns, index) {

    var id = $rootScope.MoutounId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        moutounService.DeleteMoutoun(id)
            .success(function (r) {
                moutouns.splice(index, 1);

                notify({
                    message: 'Moutouns is deleted with success.',
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
    .controller('removeMoutounCtrl', removeMoutounCtrl)