function recitationSessionCtrl($scope, $uibModal, $rootScope, $log, notify, recitationSessionsService, recitationSessionLevelService, memberService, calendarservice) {
    $scope.recitationSessionsList = [];
    $scope.disciplineList = [];
    $scope.disciplineList.students = null;
    $scope.memberStuddents = [];
    var counter = 0;
    var students = [];


    recitationSessionsService.GetRecitationSession().success(function (r) {  
        $scope.recitationSessionsList = r;
    }).error(function(r) {
        $scope.err = r;
    });

    $scope.addEvent = function () {
        elementToEdit = false;
        initNewEvent();
        showPopUpAdd();
    };

    function initNewEvent() {
        var d = new Date();
        $scope.newEvent = { id: 0, Title: '', title: '', Description: '', EventDate: d, start: '', StartDate: null, StartTime: d, EndTime: d, DivisionParam: 10, Discipline: null, LevelIds: [], isSaved: false };
    }

    function showPopUpAdd() {
        $scope.disciplines = [];
        var promiseCalendar = calendarservice.getDisciplines();

        promiseCalendar.then(function (resp) {
            $log.log(resp);
            $scope.disciplines = resp;

            var modalInstance = $uibModal.open({
                templateUrl: 'views/event_modal.html',
                controller: ModalInstanceCtrl,
                size: 'lg',
                resolve: {
                    disciplines: function () {
                        return $scope.disciplines;
                    },
                    recurrences: function () {
                        calendarservice.getRecurrences().then(function (res) {
                            $scope.recurrences = res;

                        }, function (err) {
                        })
                        return $scope.recurrences;
                    },
                    newEvent: function () {
                        return $scope.newEvent;
                    },
                    events: function () {
                        return $scope.events;
                    },
                    eventSources: function () {
                        return $scope.eventSources;
                    },
                    savedEvents: function () {
                        return $scope.savedEvents;
                    },
                    elementToEdit: function () {
                        return elementToEdit;
                    },
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                            },
                            {
                                name: 'oitozero.ngSweetAlert',
                                files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                            }
                        ]);
                    }

                }
            });

        }, function (err) {
            $log.log(err);
        });
    }

    //$scope.getListOfStudentMember = function (idDiscipline, item) {
    //    debugger; 
    //    memberService.GetStudents(idDiscipline).then(
    //        function (memberStuddents) {               
    //            students = memberStuddents.data;               
    //            $scope.recitationSessionsList[item].Students.push(students);
    //            //counter++;
    //            //console.log('item :',item,'id:',$scope.recitationSessionsList[item].Id, $scope.recitationSessionsList[item]);
    //            return students;
    //        });
    //}
   
    //recitationSessionLevelService.GetRecitationSessionLevel().success(function (t) {
    //    debugger; 
    //    $scope.disciplineList = t;
    //    if ($scope.disciplineList.length != 0 && $scope.recitationSessionsList.length != 0) {
    //        for (var i = 0; i < $scope.recitationSessionsList.length; i++) {
    //            for (var j = 0; j < $scope.disciplineList.length; j++) {
    //                if ($scope.recitationSessionsList[i].Id === $scope.disciplineList[j].RecitationId) {
    //                    //console.log("$scope.disciplineList[",j,"].DisciplineLevelId", $scope.disciplineList[j].DisciplineLevelId  );
    //                    debugger; 
    //                    var x = $scope.getListOfStudentMember($scope.disciplineList[j].DisciplineLevelId, i);
    //                }                  
    //            }               
    //        }       
    //    }
    //});
   
    $scope.gotToRecitationSessionStudents = function(item) {
        sessionStorage.setItem("currentSession", JSON.stringify(item));
    };
    var $ctrl = this;
};

angular
    .module("isApi")
    .controller("recitationSessionCtrl", recitationSessionCtrl);