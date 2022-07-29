app.service('calendarservice', function ($http, $q, $log, authDataFactory, authenticationService, CONSTANTS) {

    var accesstoken = sessionStorage.getItem('accessToken');

    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }

    this.getEvents = function () {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        deferred = $q.defer();
        var resp = $http({
            url: CONSTANTS.BASE_URL + CONSTANTS.RECITATION_SESSIONS_URL,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json;'
            }
        }).success(function (response) {
            $log.log("response");
            $log.log(response);
            deferred.resolve(response);
        })
        .error(function (err, status) {
            $log.log(err);
            $log.log(status);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.postEvent = function (event) {
        debugger; 
        var accesstoken = sessionStorage.getItem('accessToken');

        deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        var d = event.EventDate;
        var t = event.StartTime;
        var te = event.EndTime;

        var startDate = (d.toISOString().split('T')[0]) + ' ' + t.toLocaleTimeString();
        var endDate = (d.toISOString().split('T')[0]) + ' ' + te.toLocaleTimeString();

        $log.log(startDate);
        console.log(endDate);
        $log.log("en cours mise à jour :");
        $log.log("event.Recurrence.Id :");
        //$log.log(event.Recurrence.Id);
        var levelsTab = [];
        if (event.LevelIds != null) {
            for (var i = 0; i < event.LevelIds.length; i++) {
                levelsTab[i] = event.LevelIds[i].Id;
            }
        }
        
        var date = new Date();
        var data = ({
            TeacherId: sessionStorage.getItem('userId'),
            ClassroomId: 2,//event.ClassroomId,//Ajouter classroom popup
            DisciplineId: event.Discipline.Id,
            LevelIds: levelsTab,
            Title: event.Title,
            Description: event.Description,
            StartDate: startDate,
            EndTime: endDate,
            DivisionParam: event.DivisionParam,
            //RecurrenceId : event.Recurrence.Id,
            IsSaved: event.isSaved,
        });

        $log.log(data);
        return $http.post(CONSTANTS.BASE_URL + CONSTANTS.RECITATION_SESSIONS_URL, data, config);
    }

    this.updateEvent = function (event) {
        debugger; 
        var idEvent = event.$id;
        var accesstoken = sessionStorage.getItem('accessToken');

        deferred = $q.defer();
        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };

        var d = event.EventDate;
        var t = event.StartTime;
        var te = event.EndTime;

        var startDate = (d.toISOString().split('T')[0]) + ' ' + t.toLocaleTimeString();
        var endDate = (d.toISOString().split('T')[0]) + ' ' + te.toLocaleTimeString();

        $log.log(startDate);
        console.log(endDate);
        var levelsTab = [];
        if (event.LevelIds != null) {
            for (var i = 0; i < event.LevelIds.length; i++) {
                levelsTab[i] = event.LevelIds[i].Id;
            }
        }
        var date = new Date();
        var data = ({
            id:event.Id,
            TeacherId: sessionStorage.getItem('userId'),
            ClassroomId: 2,//event.ClassroomId,
            DisciplineId: 1,
            LevelIds: levelsTab,
            Title: event.Title,
            Description: event.Description,
            StartDate: startDate,
            EndTime: endDate,
            DivisionParam: event.DivisionParam,
            //RecurrenceId: event.Recurrence.Id,
            IsSaved: event.IsSaved,
        })
        $log.log(data);
        return $http.put(CONSTANTS.BASE_URL + CONSTANTS.RECITATION_SESSIONS_URL + event.Id, data, config);
    }

    this.getDisciplines = function () {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        deferred = $q.defer();
        
        var resp = $http({
            url: CONSTANTS.BASE_URL + CONSTANTS.DISCIPLINES_URL,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json;'
            }
        }).success(function (response) {
            $log.log("response");
            $log.log(response);
            deferred.resolve(response);
        })
        .error(function (err, status) {
            $log.log(err);
            $log.log(status);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getLevelsByDisciplineId = function (id) {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        var response = $http({
            url: CONSTANTS.BASE_URL + CONSTANTS.LEVELS_URL + '/' + id,
            method: "GET",
            headers: authHeaders
        });
        return response;
    };

    this.getRecurrences = function () {
        var accesstoken = sessionStorage.getItem('accessToken');

        var authHeaders = {};
        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        deferred = $q.defer();

        var resp = $http({
            url: CONSTANTS.BASE_URL + CONSTANTS.RECURRENCES_URL,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json;'
            }
        }).success(function (response) {
            $log.log("responseRecurrences");
            $log.log(response);
            deferred.resolve(response);
        })
        .error(function (err, status) {
            $log.log("recurrenceError");
            $log.log(err);
            $log.log(status);
            deferred.reject(err);
        });
        return deferred.promise;
    };
});