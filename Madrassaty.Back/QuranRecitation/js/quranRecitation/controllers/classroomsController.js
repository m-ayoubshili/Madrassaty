function classroomsCtrl($scope, $uibModal, $rootScope, notify, classroomService) {

    $scope.classrooms = [];

    classroomService.GetClassrooms()
        .success(function (r) {
            $scope.classrooms = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    var $ctrl = this;

    $scope.setClassroomId = function (classroomId, size, index, parentSelector) {
        $rootScope.classroomId = classroomId;

        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editClassroom.html',
            controller: 'editClassroomCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                classrooms: function () {
                    return $scope.classrooms;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.deleteClassroom = function (classroomId, size, index, parentSelector) {
        $rootScope.classroomId = classroomId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeClassroomCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                classrooms: function () {
                    return $scope.classrooms;
                },
                index: function () {
                    return index;
                }
            }
        })
    };
}

angular
    .module('isApi')
    .controller('classroomsCtrl', classroomsCtrl);