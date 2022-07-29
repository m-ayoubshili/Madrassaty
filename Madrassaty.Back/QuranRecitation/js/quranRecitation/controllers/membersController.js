function membersCtrl($scope, $uibModal, $rootScope, notify, memberService) {

    $scope.members = [];

    $scope.statusOptions = [];

    memberService.GetMemberStatus()
        .success(function (r) {
            $scope.statusOptions = r;
            $scope.selectedItem = $scope.statusOptions[0];
            $scope.statusItem = ($scope.statusOptions[0].Id).toString();
        })
        .error(function (r) {
            $scope.err = r;
        });

    memberService.GetMembers()
        .success(function (r) {
            $scope.members = r;
            console.log(r);
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.setUrlImage = function (photo) {
        return memberService.GetMemberPhoto(photo);
    }

    //Custom filter
    $scope.customFilter = function (data) {
        if (data.MemberStatusId === parseInt($scope.statusItem)) {
            return true;
        } else {
            return false;
        }
    };

    var $ctrl = this;

    $scope.setMemberId = function (memberId, size, index, parentSelector) {
        $rootScope.memberId = memberId;

        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editProfile.html',
            controller: 'editProfileCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                members: function () {
                    return $scope.members;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.deleteMember = function (memberId, size, index, parentSelector) {
        $rootScope.memberId = memberId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeMemberCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                members: function () {
                    return $scope.members;
                },
                index: function () {
                    return index;
                }
            }
        })
    }

    $scope.editMemberLogin = function (memberId, size, index, parentSelector) {
        $rootScope.memberId = memberId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editLogin.html',
            controller: 'loginMemberCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
            }
        })
    }
};

angular
    .module('isApi').controller('membersCtrl', membersCtrl);