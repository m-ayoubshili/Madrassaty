function ExamensCtrl($scope, $rootScope, $uibModal, $location,  examenService, memberService, disciplineService, anneeScolaireService) {

    $scope.examens = [];
    $scope.teachers = [{
        Id: '0',
        FullName: ''
    }];

    $scope.disciplines = [{
        Id: 0,
        Wording: ''
    }];

    $scope.noteExmen = 0; 


    $scope.user = angular.fromJson(sessionStorage.getItem('user'));


    examenService.GetExamens()
        .success(function (r) {
            $scope.examens = r;
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

    $scope.anneeScolaire = '';
    anneeScolaireService.GetAnneeScolaireActif()
        .success(function (r) {
            $scope.anneeScolaire = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    //Custom filter
    $scope.customFilter = function (data) {
        if (($scope.teacherItem === "0") && ($scope.disciplineItem === "0")) {
            return true;
        }
        if (data.TeacherId === $scope.teacherItem) {
            return true;
        }
        if (data.DisciplineId === parseInt($scope.disciplineItem)) {
            return true;
        }
        else {
            return false;
        }
    };


    $scope.setExamenId = function (ExamenId, disciplineId, size, index, parentSelector) {
        $rootScope.ExamenId = ExamenId;
        $rootScope.disciplineId = disciplineId;
        $rootScope.anneeScolaireStartDay = $scope.anneeScolaire.StartDay;
        $rootScope.anneeScolaireEndDay = $scope.anneeScolaire.EndDay; 

        var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/editExamen.html',
            controller: 'editExamenCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                examens: function () {
                    return $scope.examens;
                },
                index: function () {
                    return index;
                },
            }
        })
    };

    $scope.deleteExamen = function (ExamenId, size, index, parentSelector) {
        $rootScope.ExamenId = ExamenId;
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/yesno.html',
            controller: 'removeExamenCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                examens: function () {
                    return $scope.examens;
                },
                index: function () {
                    return index;
                }
            }
        })
    };

    $scope.setNotesExamen = function (examen) {
        sessionStorage.setItem("currentExamen", JSON.stringify(examen));
        $location.path("/core/notesExamen");
    }; 

    $scope.showNote = function (note) {
        $scope.noteExmen = note; 
        $('#modal_NoteExamen').modal('show');
    }; 

    var $ctrl = this;
}

angular
    .module('isApi')
    .controller('ExamensCtrl', ExamensCtrl);