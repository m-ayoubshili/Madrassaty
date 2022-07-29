function removeCourseCtrl($scope, $rootScope, $uibModalInstance, notify, courseService, courses, index) {

    var id = $rootScope.courseId;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.delete = function () {
        courseService.DeleteCourse(id)
         .success(function (r) {
             courses.splice(index, 1);

             notify({
                 message: 'Course is deleted with success.',
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
    .controller('removeCourseCtrl', removeCourseCtrl);