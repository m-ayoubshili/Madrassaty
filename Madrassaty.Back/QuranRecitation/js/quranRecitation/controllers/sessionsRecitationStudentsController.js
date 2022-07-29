function recitationSessionStudentsCtrl($scope, $uibModal, $rootScope, $state, notify, sessionsRecitationStudentService) {
    //$scope.recitationSessionsList = [];
    $scope.currentSession = JSON.parse(sessionStorage.getItem('currentSession'));
    
    //var starttime = new Date($scope.currentSession.StartDate);
    //var starttimeSecond = new Date($scope.currentSession.StartDate).getTime()/1000;
    //var endTime = new Date($scope.currentSession.EndTime);
    //var endTimeSecond = new Date($scope.currentSession.EndTime).getTime()/1000;
    //var timeSlotInSeconds = $scope.currentSession.DivisionParam * 60;
    //var sumOfslots= (endTime.getTime() - starttime.getTime()) / 1000;
    //var timeEndAndStartInSeconds = sumOfslots/timeSlotInSeconds;
    //$scope.slotsTab = [];
    //var slotsTabLenght=Math.trunc(timeEndAndStartInSeconds);
    //for (var i = 0; i <= slotsTabLenght ; i++) {    
    //    $scope.slotsTab[i] = starttime.toString();
    //   var  nextSlot=starttime.setSeconds(starttime.getSeconds() + timeSlotInSeconds);
    //   starttime = new Date(nextSlot);
    //}
    //if (Number(timeEndAndStartInSeconds) === timeEndAndStartInSeconds && timeEndAndStartInSeconds % 1 !== 0) {
    //    //isDouble        
    //    $scope.slotsTab[timeEndAndStartInSeconds + 1] = endTime
    //}  

    sessionsRecitationStudentService.GetSessionsRecitationStudent($scope.currentSession.Id)
        .success(function (r) {
            $scope.Students = r;
        })
        .error(function (r) {
            $scope.err = r;
        });


    $scope.disciplines = [];
    $scope.setParticipant = function () {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/addParticipant.html',
            controller: 'sessionsRecitationParticipantCtrl',
            controllerAs: '$ctrl',
            size: 'md',
            resolve: {
                disciplines: function () {
                    return $scope.disciplines;
                },
                index: function () {
                    return -1;
                }
            }
        })
    };

    $scope.goEvaluation = function (StudentId) {

       // $state.go("core.evaluation");
        var config = {
            headers: {
                'Authorization': 'Bearer ' + accesstoken,
                'Content-Type': 'application/json'
            }
        };
    }
    var $ctrl = this;  

    
};

angular
    .module('isApi')
    .controller('recitationSessionStudentsCtrl', recitationSessionStudentsCtrl);