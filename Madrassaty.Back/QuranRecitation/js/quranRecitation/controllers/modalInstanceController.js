function ModalInstanceCtrl(disciplines, recurrences, $scope, $uibModalInstance, $log, newEvent, events, eventSources, savedEvents, elementToEdit, calendarservice, SweetAlert) {
    $scope.events = events;
    $scope.newEvent = newEvent;
    $scope.disciplines = disciplines;
    $scope.recurrences = recurrences;
    var isToEdit = elementToEdit;
    $scope.newEvent.Discipline = $scope.disciplines[0];
    //$scope.$watch('recurrences', function () {
    //    debugger; 
    //    if (recurrences.length != 0) {
    //        for (var i = 0; i < recurrences.length; i++) {
    //            if (recurrences[i].Id == $scope.newEvent.RecurrenceId)
    //                $scope.newEvent.Recurrence = recurrences[i];
    //        }
    //    }
    //})

    $scope.$watch('recurrences', function () {
        if (disciplines.length != 0) {
            for (var i = 0; i < disciplines.length; i++) {
                if (disciplines[i].Id == $scope.newEvent.Discipline.Id)
                    $scope.newEvent.Discipline = disciplines[i];
            }
        }
    })

    $scope.levels = [];

    $scope.options = {
        slots: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    };

    $scope.changed = function () {
        $log.log($scope.newEvent);
        var d = $scope.newEvent.EventDate;
        var t = $scope.newEvent.StartTime;
        var te = $scope.newEvent.EndTime;

        var startDate = d.toLocaleDateString() + 'T' + t.toLocaleTimeString();
        var endDate = d.toLocaleDateString() + 'T' + te.toLocaleTimeString();

    };

    $scope.saveEvent = function () {
        if (elementToEdit) {
            elementToEdit = false;
            $log.log("Début mise à jour :");
            $log.log($scope.newEvent);
            calendarservice.updateEvent($scope.newEvent)
                .then(function (response) {
                    $log.log(response);
                    // ne pas effacer ce bloc 
                    //if ($scope.newEvent.isSaved) {
                    //    savedEvents.push($scope.newEvent);
                    //}
                    //events.push($scope.newEvent);
                    SweetAlert.swal({
                        title: "QuranRecitation",
                        text: "Votre session est bien ajoutée !",
                        type: "success"
                    });
                    $uibModalInstance.close();
                    $log.log("Fin mise à jour :");
                })
                .error = function (fn) {
                    $log.log(fn);
                    $uibModalInstance.close();
                };
        }
        else {
            elementToEdit = false;
                calendarservice.postEvent($scope.newEvent)
                .then(function (response) {
                    $log.log(response);
                    // ne pas effacer ce bloc 
                    //if ($scope.newEvent.isSaved) {
                    //    savedEvents.push($scope.newEvent);
                    //}
                    //events.push($scope.newEvent);
                    SweetAlert.swal({
                        title: "QuranRecitation",
                        text: "Votre session est bien ajoutée !",
                        type: "success"
                    });
                    $uibModalInstance.close();
                    $log.log("Fin mise à jour :");
                })
                .error = function (fn) {
                    $log.log(fn);
                    $uibModalInstance.close();
                };
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

};

app.controller('ModalInstanceCtrl', CalendarCtrl);
