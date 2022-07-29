function editMoutounCtrl($scope, $rootScope, $uibModalInstance, notify, moutounService, moutouns, index) {

    var id = $rootScope.MoutounId;

    $scope.moutoun = {};
    $scope.modalTitle = "Ajout";
    if (id != 0 && id != null) {
        moutounService.GetMoutounById(id)
            .success(function (r) {
                $scope.moutoun = r;
            })
            .error(function (r) {
                $scope.err = r;
            });
        $scope.modalTitle = "Modification";
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addEditMoutoun = function () {
        if (id != 0 && id != null) {
            // update Moutoun
            moutounService.UpdateMoutoun(id, $scope.moutoun)
                .success(function (r) {
                    $scope.moutoun = r;
                    if (index !== -1) {
                        moutouns.splice(index, 1, $scope.moutoun);
                    }

                    notify({
                        message: 'Moutoun is updated with success.',
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
            // create new moutoun
            moutounService.CreateMoutoun($scope.moutoun)
                .success(function (r) {
                    $scope.moutoun = r;
                    moutouns.push($scope.moutoun);

                    notify({
                        message: 'Moutoun is created with success.',
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
    .controller('editMoutounCtrl', editMoutounCtrl);