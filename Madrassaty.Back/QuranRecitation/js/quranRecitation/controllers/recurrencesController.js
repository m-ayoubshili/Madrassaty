function recurrencesCtrl($scope, $uibModal, $rootScope, notify, recurrenceService) {

    $scope.recurrences = [];

    recurrenceService.GetRecurrences()
        .success(function (r) {
            $scope.recurrences = r;
        })
        .error(function (r) {
            $scope.err = r;
        });

    var $ctrl = this;
}

angular
    .module('isApi')
    .controller('recurrencesCtrl', recurrencesCtrl);