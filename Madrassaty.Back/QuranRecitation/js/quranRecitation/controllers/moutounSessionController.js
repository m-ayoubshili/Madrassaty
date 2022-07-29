function moutounSessionCtrl($scope, $rootScope, $uibModal, notify, moutounSessionService, moutounService, memberService) {
    $scope.MoutounSessions = [];
    moutounSessionService.GetMoutounSessions()
        .success(function (r) {
            $scope.MoutounSessions = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    // get All students
    $scope.Students = [{
        Id: '0',
        FullName: ''
    }];
    memberService.GetAllStudents()
        .success(function (r) {
            $.each(r, function (index, value) {
                $scope.Students.push({
                    Id: value.Id,
                    FullName: value.FullName
                });
            });
            $scope.studentItem = $scope.Students[0].Id;
        })
        .error(function (r) {
            $scope.err = r;
        });

    // get teachers
    $scope.Teachers = [{
        Id: '0',
        FullName: ''
    }];
    memberService.GetTeachers()
        .success(function (r) {
            $.each(r, function (index, value) {
                $scope.Teachers.push({
                    Id: value.Id,
                    FullName: value.FullName
                });
            });
            $scope.teacherItem = $scope.Teachers[0].Id;
        })
        .error(function (r) {
            $scope.err = r;
        });


    $scope.Moutouns = [{
        Id: '0',
        Wording: ''
    }];
    moutounService.GetMoutouns()
        .success(function (r) {
            $.each(r, function (index, value) {
                $scope.Moutouns.push({
                    Id: value.Id,
                    Wording: value.Wording
                });
            });
            $scope.moutounItem = $scope.Moutouns[0].Id;
        })
        .error(function (r) {
            $scope.err = r;
        });


    $scope.setMoutounSessionId = function (MoutounSessionId, size, index, parentSelector) {
        $rootScope.MoutounSessionId = MoutounSessionId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editMoutounSession.html',
            controller: 'editMoutounSessionCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                MoutounSessions: function () {
                    return $scope.MoutounSessions;
                },
                index: function () {
                    return index;
                },
            }
        })
    };

    $scope.deleteMoutounSession = function (MoutounSessionId, size, index, parentSelector) {
        $rootScope.MoutounSessionId = MoutounSessionId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeMoutounSessionCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                MoutounSessions: function () {
                    return $scope.MoutounSessions;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.customFilter = function (data) {
        return ($scope.teacherItem === "0" || data.TeacherId == $scope.teacherItem) &&
            ($scope.studentItem === "0" || data.StudentId == $scope.studentItem) &&
                ($scope.moutounItem === "0" || data.MoutounId == parseInt($scope.moutounItem));
                       
    };

    var $ctrl = this;
}

angular
    .module('isApi')
    .controller('moutounSessionCtrl', moutounSessionCtrl);