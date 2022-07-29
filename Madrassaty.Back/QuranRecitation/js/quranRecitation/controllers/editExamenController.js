function editExamenCtrl($scope, $stateParams, $rootScope, $uibModalInstance, $filter, notify, examenService, memberService, disciplineService, disciplineLevelService, examens, index) {
    $scope.examen = {};
    $scope.divisionParam = 5;
    var id = $rootScope.ExamenId;
    var disciplineId = $rootScope.disciplineId;
    var anneeScolaireStartDay = $rootScope.anneeScolaireStartDay; 
    var anneeScolaireEndDay = $rootScope.anneeScolaireEndDay; 

    // get disciplines
    $scope.disciplines = [];
    disciplineService.GetDisciplines()
        .success(function (r) {
            $scope.disciplines = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    // get teachers
    $scope.teachers = [];
    memberService.GetTeachers()
        .success(function (r) {
            $scope.teachers = r;
        })
        .error(function (r) {
            $scope.err = r;
        });



    // get discipline levels
    $scope.levels = [];
    if (disciplineId != 0 && disciplineId != null && disciplineId != "undefined") {
        disciplineLevelService.GetLevelsByDiscipline(disciplineId)
            .success(function (r) {
                $scope.levels = r;
                if (r.length > 0)
                    $scope.examen.DisciplineLevelId = $scope.levels[0].Id;
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
                $scope.examen.DisciplineLevelId = $scope.levels[0].Id;
            })
            .error(function (r) {
                $scope.err = r;
            });
    }

    if (id == 0) {
        $scope.modalTitle = "Ajout";
    }
    else if (id != 0 && id != null) {
        examenService.GetExamenById(id)
            .success(function (r) {
                $scope.examen = r;
                $scope.examen.TeacherId = r.TeacherId.toString();
                $scope.examen.DisciplineId = r.DisciplineId.toString();
                $scope.examen.DisciplineLevelId = r.DisciplineLevelId.toString();
                $scope.examen.StartDate = new Date($scope.examen.StartDate);
            })
            .error(function (r) {
                $scope.err = r;
            });
        $scope.modalTitle = "Modification";
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addEditExamen = function () {
        var d = $filter('date')($scope.examen.StartDate, "yyyy-MM-dd");
        var t = new Date ($scope.examen.BeginTime);
        var te = new Date($scope.examen.EndTime);
        $scope.examen.StartDate = d + 'T' + t.toLocaleTimeString(); 
        $scope.examen.EndDate = d + 'T' + te.toLocaleTimeString(); 
        $scope.examen.BeginTime = d + 'T' + t.toLocaleTimeString();
        $scope.examen.EndTime = d + 'T' + te.toLocaleTimeString(); 
        var isDeleted= false;



        if (id != 0 && id != null) {
            // update examen
            examenService.UpdateExamen(id, $scope.examen)
                .success(function (r) {
                    $scope.examen = r;
                    if (index !== -1) {
                        examens.splice(index, 1, $scope.examen);
                    }

                    notify({
                        message: 'Examen is updated with success.',
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
            // create new examen
            examenService.CreateExamen($scope.examen)
                .success(function (r) {
                    $scope.examen = r;
                    examens.push($scope.examen);

                    notify({
                        message: 'Examen is created with success.',
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
        $scope.examen.StartDate = new Date($scope.examen.StartDate);
        $scope.examen.EndTime = new Date($scope.examen.EndTime);
    };


    $scope.clear = function () {
        $scope.examen.StartDate = null;
        $scope.examen.EndTime = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: anneeScolaireEndDay,
        minDate: anneeScolaireStartDay,
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

    $scope.setDate = function (year, month, day) {
        $scope.examen.StartDate = new Date(year, month, day);
        $scope.examen.EndTime = new Date(year, month, day);
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

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);

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
    .controller('editExamenCtrl', editExamenCtrl);