/**
 * CalendarCtrl - Controller for Calendar
 * Store data events for calendar
 */

function CalendarCtrl($scope, $filter, $uibModal, calendarservice, $log, $timeout) {
    var elementToEdit=false
    $scope.user = angular.fromJson(sessionStorage.getItem('user'));

    $scope.events = [];
    $scope.savedEvents = [];
    $scope.changeTo = 'fr';

    switch($scope.user.MemberStatusId) {
        case 1:
            setUIConfigForAdmin();
            break;
        case 2:
            setUIConfigForAdmin();
            break;
        default:
            setUIConfigForStudent();
            break;
    }

    function setUIConfigForAdmin(){
        /* config object */
        $scope.uiConfig = {
            calendar: {
                lang: 'ar-ma',
                timeFormat: {
                    agenda: 'HH:mm',
                },
                axisFormat: 'HH:mm',
                droppable: true,
                drop: function (data) {
                    alert("I got droped!" + new Date(data));
                },
                height: 700,
                editable: true,
                selectable: true,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,list'
                },
                views: {
                    agendaFourDay: {
                        type: 'agenda',
                        duration: { days: 4 },
                        buttonText: '4 day'
                    }
                },
                eventClick: function (event, allDay, jsEvent, view) {
                    elementToEdit = true;
                    $scope.alertOnEventClick(event, allDay, jsEvent, view);
                },
                select: function (event, allDay, jsEvent, view) {
                    $scope.alertOnCellClick(event, allDay, jsEvent, view);
                },
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                defaultView: "month",
            }
        };
    }
    changeLang();
    //changeLang();
    function setUIConfigForStudent(){
        /* config object */
        $scope.uiConfig = {
            calendar: {
                isRTL : true,
                lang: 'fr',
                timeFormat: {
                    agenda: 'H(:mm)',
                },
                axisFormat: 'H(:mm)',
                editable: false,
                droppable: false,
                selectable: false,
                height: 700,
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventClick: function (event, allDay, jsEvent, view) {
                    $scope.alertOnStudentEventClick(event, allDay, jsEvent, view);
                },
                weekends: true,
                defaultView: 'agendaDay',
               
            }
        };
    } 

    calendarservice.getEvents().then(function (response) {

        console.log(response);

        angular.forEach(response, function (event) {
            event.start = new Date(event.StartDate);
            event.end = new Date(event.EndTime);
            event.allDay = false;
            event.title = " - " + event.Title;
            event.Title = " - " + event.Title;;
            $scope.events.push(event);
            $log.log($scope.event)
            if (event.IsSaved) {
                $scope.savedEvents.push(event);
            }
        });
    })
    .error = function (fn) {
        $log.log(fn);
    };

    function changeLang() {
        if ($scope.changeTo === 'fr') {
            $scope.uiConfig.calendar.dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
            $scope.uiConfig.calendar.dayNamesShort = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
            $scope.uiConfig.calendar.monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre ", "Décembre"];
            $scope.uiConfig.calendar.buttonText = { today: 'Aujourd\'hui', prev: 'Précédent', next: 'Suivant', month: 'Mois', week: 'Semaine', day: 'Jour', allDay: 'Toute la journée' },
            $scope.changeTo = 'ar';
        } else {
            $scope.uiConfig.calendar.dayNames = ['الأحد', 'الإثنين',	'الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
            $scope.uiConfig.calendar.dayNamesShort = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
            $scope.uiConfig.calendar.monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
            $scope.uiConfig.calendar.buttonText = { today: 'اليوم', prev: 'السابق', next: 'التالي', month: 'شهر', agendaWeek: 'أسبوع', agendaDay: 'يوم', allDay: 'اليوم كله' },
            $scope.uiConfig.calendar.isRTL = true;
            $scope.changeTo = 'fr';
        }
    };

    /* Change View */
    $scope.changeView = function (view, calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
    };

    /* Event sources array */
    $scope.eventSources = [$scope.events];

    initNewEvent();

    // Add to saved events
    $scope.addToSavedEvents = function () {
        $scope.savedEvents.push({ Id: 5, TeacherId: 1, ClassroomId: 2, Title: "Title", title: '', Description: "Description", EventDate: d, start: '', StartDate: "", EndTime: "", DivisionParam: "", CreatedOn: "", ModifiedOn: "" });
        $scope.newEvent = {};
    };

    // Delete from saved events
    $scope.deleteFromSavedEvents = function (evId) {
        var eventToDelete = $filter('filter')($scope.savedEvents, { id: evId });
        var index = $scope.savedEvents.indexOf(eventToDelete[0]);
        $scope.savedEvents.splice(index, 1);
    };

    /* message on Drop */
    $scope.alertOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
       
        $scope.alertMessage = (event.title + ': Droped to make dayDelta ' + dayDelta);
    };

    /* message on Resize */
    $scope.alertOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = (event.title + ': Resized to make dayDelta ' + minuteDelta);
    };

    /* message on Resize */
    $scope.alertOnCellClick = function (start, end, allDay, jsEvent) {
       
        initNewEvent();        
        $scope.newEvent.start = start;
        $scope.newEvent.EventDate = start;
        $scope.newEvent.StartTime = start;
        $scope.newEvent.EndTime = end;       
        showPopUpAdd();
    };

    /* message on eventClick */
    $scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
        initNewEvent();
        $scope.newEvent = event;
        $scope.newEvent.start = new Date(event.StartDate);
        $scope.newEvent.EventDate = new Date(event.StartDate);
        $scope.newEvent.StartTime = new Date(event.StartDate);
        $scope.newEvent.EndTime = new Date(event.EndTime);
        $scope.newEvent['Disciplines'] = null;
        $log.log($scope.newEvent);
        showPopUpAdd();
        

       
    };

    $scope.alertOnStudentEventClick = function (event, allDay, jsEvent, view) {
        console.log("StudentClick");
    }

    $scope.addEvent = function () {
        elementToEdit = false;
        initNewEvent();        
        showPopUpAdd();
    };

    $scope.showSavedEventDetails = function (evId) {
        console.log("****showSavedEventDetails*****");
        angular.forEach($scope.events, function (event) {
            if (event.Id === evId) {
                $scope.newEvent = event;
            }
        });

        showPopUpAdd();
    };

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

    function initNewEvent() {
        var d = new Date();
        $scope.newEvent = { id: 0, Title: '', title: '', Description: '', EventDate: d, start: '', StartDate: null, StartTime: d, EndTime: d, DivisionParam: 10, Discipline: null, LevelIds: [], isSaved: false };
    }

};



app.controller('CalendarCtrl', CalendarCtrl);