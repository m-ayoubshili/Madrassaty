function moutounCtrl($scope, $rootScope, $uibModal, notify, moutounService) {
    $scope.moutouns = [];
    moutounService.GetMoutouns()
        .success(function (r) {
            $scope.moutouns = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.setMoutounId = function (MoutounId, size, index, parentSelector) {
        $rootScope.MoutounId = MoutounId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editMoutoun.html',
            controller: 'editMoutounCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                moutouns: function () {
                    return $scope.moutouns;
                },
                index: function () {
                    return index;
                },
            }
        })
    };

    $scope.deleteMoutoun = function (MoutounId, size, index, parentSelector) {
        $rootScope.MoutounId = MoutounId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeMoutounCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                moutouns: function () {
                    return $scope.moutouns;
                },
                index: function () {
                    return index;
                }
            }
        })
    };
    var $ctrl = this;
}

angular
    .module('isApi')
    .controller('moutounCtrl', moutounCtrl);