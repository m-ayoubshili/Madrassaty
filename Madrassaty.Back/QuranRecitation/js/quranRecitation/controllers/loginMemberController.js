function loginMemberCtrl($scope, $rootScope, $uibModalInstance, notify, memberService)
{
    var id = $rootScope.memberId;
    $scope.passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[-#?!@$_%]){6,}");

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.loginModel = {
        Id: id,
        UserName: '',
        Password: '',
        ConfirmPassword: ''
    };

    memberService.GetMemberById(id)
    .success(function (r) {
        $scope.loginModel.UserName = r.UserName;

    })
    .error(function (r) {
        $scope.err = r;
    });

    $scope.EditLogin = function () {
        // update member login & password
        memberService.UpdateMemberLogin($scope.loginModel)
         .success(function (r) {

             notify({
                 message: 'Member login updated with success.',
                 templateUrl: 'views/angular-notify.html'
             });

             $uibModalInstance.dismiss('cancel');
         })
       .error(function (r) {
           notify({
               message: 'Failed operation!',
               templateUrl: 'views/angular-notify.html'
           });
       });
    }
}

angular
    .module('isApi')
    .controller('loginMemberCtrl', loginMemberCtrl);