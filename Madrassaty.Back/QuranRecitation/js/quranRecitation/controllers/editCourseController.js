function editCourseCtrl($scope, $stateParams, $rootScope, $uibModalInstance, $filter,  notify, courseService, memberService, disciplineService, disciplineLevelService, classroomService, courses, index) {

    $scope.divisionParam = 5;
    var id = $rootScope.courseId;
    var disciplineId = $rootScope.disciplineId;

    $scope.course = {};
    $scope.modalTitle = "Ajout";

    // get teachers
    $scope.teachers = [];
    memberService.GetTeachers()
    .success(function (r) {
        $scope.teachers = r;
        //$scope.course.TeacherId = ($scope.teachers[0].Id).toString();
    })
    .error(function (r) {
        $scope.err = r;
    });

    // get disciplines
    $scope.disciplines = [];
    disciplineService.GetDisciplines()
    .success(function (r) {
        $scope.disciplines = r;
        //$scope.course.DisciplineId = $scope.disciplines[0].Id;
    })
    .error(function (r) {
        $scope.err = r;
    });

    // get discipline levels
    $scope.levels = [];
    if (disciplineId != 0)
    {
        disciplineLevelService.GetLevelsByDiscipline(disciplineId)
        .success(function (r) {
            $scope.levels = r;
            $scope.course.DisciplineLevelId = $scope.levels[0].Id;
        })
        .error(function (r) {
            $scope.err = r;
        });
    }

    $scope.updateLevels = function (disciplineId) {
        disciplineLevelService.GetLevelsByDiscipline(disciplineId)
            .success(function (r) {
                $scope.levels = [];
                $scope.levels = r;
                $scope.course.DisciplineLevelId = $scope.levels[0].Id;
            })
            .error(function (r) {
                $scope.err = r;
            });
    }

    // get classrooms
    $scope.classrooms = [];
    classroomService.GetClassrooms()
    .success(function (r) {
        $scope.classrooms = r;
        $scope.course.ClassroomId = $scope.classrooms[0].Id;
    })
    .error(function (r) {
        $scope.err = r;
    });

    if (id != 0 && id != null) {
        courseService.GetCourseById(id)
            .success(function (r) {
            $scope.course = r;
            $scope.course.TeacherId = r.TeacherId.toString();
            $scope.course.DisciplineId = r.DisciplineId.toString();
            $scope.course.DisciplineLevelId = r.DisciplineLevelId.toString();
            $scope.course.ClassroomId = r.ClassroomId.toString();
            $scope.putDates();
        })
        .error(function (r) {
            $scope.err = r;
        });

        $scope.modalTitle = "Modification";
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addEditCourse = function () {
        var d = $filter('date')($scope.course.StartDate, "yyyy-MM-dd");
        var t = new Date($scope.course.Begin);
        var te = new Date($scope.course.End);
        $scope.course.StartDate = d + 'T' + t.toLocaleTimeString();
        $scope.course.EndDate = d + 'T' + te.toLocaleTimeString();
        $scope.course.Begin = d + 'T' + t.toLocaleTimeString();
        $scope.course.End = d + 'T' + te.toLocaleTimeString(); 

        if (id != 0 && id != null) {
            // update course
            courseService.UpdateCourse(id, $scope.course)
             .success(function (r) {
                 $scope.course = r;
                 if (index !== -1) {
                     courses.splice(index, 1, $scope.course);
                 }

                 notify({
                     message: 'Course is updated with success.',
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
            // create new course
            courseService.CreateCourse($scope.course)
             .success(function (r) {
                 $scope.course = r;
                 courses.push($scope.course);

                 notify({
                     message: 'Course is created with success.',
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

    // get bootstrap ui date picker
    $scope.putDates = function () {
        $scope.course.StartDate = new Date($scope.course.StartDate);
        $scope.course.EndTime = new Date($scope.course.EndTime);
    };


    $scope.clear = function () {
        $scope.course.StartDate = null;
        $scope.course.EndTime = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.open3 = function () {
        $scope.popup3.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.course.StartDate = new Date(year, month, day);
        $scope.course.EndTime = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.popup3 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
          date: tomorrow,
          status: 'full'
      },
      {
          date: afterTomorrow,
          status: 'partially'
      }
    ];

    function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

};

angular
    .module('isApi')
    .controller('editCourseCtrl', editCourseCtrl);