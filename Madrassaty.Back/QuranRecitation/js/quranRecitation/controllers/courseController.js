function courseCtrl($scope, $uibModal, $rootScope, $location, notify, courseService, memberService, disciplineService) {

    $scope.courses = [];
    $scope.teachers = [{
        Id: '0',
        FullName: ''
    }];

    $scope.disciplines = [{
        Id: 0,
        Wording: ''
    }];

    courseService.GetCourses()
        .success(function (r) {
            $scope.courses = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    memberService.GetTeachers()
        .success(function (r) {
            $scope.teachers = $scope.teachers.concat(r);
            $scope.teacherItem = $scope.teachers[0].Id;
        })
        .error(function (r) {
            $scope.err = r;
        });

    disciplineService.GetDisciplines()
        .success(function (r) {
            $scope.disciplines = $scope.disciplines.concat(r);
            $scope.disciplineItem = ($scope.disciplines[0].Id).toString();
        })
        .error(function (r) {
            $scope.err = r;
        });

    //Custom filter
    $scope.customFilter = function (data) {
        return ($scope.teacherItem === "0" || data.TeacherId === $scope.teacherItem) &&
            ($scope.disciplineItem === "0" || data.DisciplineId === parseInt($scope.disciplineItem));
    };

    var $ctrl = this;

    $scope.setCourseId = function (courseId, disciplineId, size, index, parentSelector) {
        $rootScope.courseId = courseId;
        $rootScope.disciplineId = disciplineId;

        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/addEditCourse.html',
            controller: 'editCourseCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                courses: function () {
                    return $scope.courses;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.deleteCourse = function (courseId, size, index, parentSelector) {
        $rootScope.courseId = courseId;

        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeCourseCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                courses: function () {
                    return $scope.courses;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.setPresence = function (course) {
        sessionStorage.setItem("currentCourse", JSON.stringify(course));
        $location.path("/core/presence");
    }; 

};

angular
    .module('isApi')
    .controller('courseCtrl', courseCtrl);