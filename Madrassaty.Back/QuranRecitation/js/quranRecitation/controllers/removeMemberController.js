function removeMemberCtrl($scope, $rootScope, $uibModalInstance, notify, memberService, members, index) {
    var id = $rootScope.memberId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        memberService.DeleteMember(id)
         .success(function (r) {
             members.splice(index, 1);

             notify({
                 message: 'Member deleted with success.',
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
};

angular
    .module('isApi')
    .controller('removeMemberCtrl', removeMemberCtrl);