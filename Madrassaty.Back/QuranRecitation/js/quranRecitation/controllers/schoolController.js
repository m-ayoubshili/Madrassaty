function schoolCtrl($scope, $uibModal, schoolService, countryService, notify) {
    $scope.schoolModel = {
        School: {
            Photo: '',
        },
        PhotoBytes: ''
    };

    schoolService.GetDefaultSchool()
        .success(function (r) {
            $scope.schoolModel.School = r;
            $scope.schoolModel.School.Photo = schoolService.GetSchoolPhoto($scope.schoolModel.School.Photo);
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.EditSchool = function () {
        schoolService.UpdateSchool($scope.schoolModel.School.Id, $scope.schoolModel)
        .success(function (r) {
            $scope.schoolModel.School = r;
            $scope.schoolModel.School.Photo = schoolService.GetSchoolPhoto($scope.schoolModel.School.Photo);

            notify({
                message: 'School updated with success.',
                templateUrl: 'views/angular-notify.html'
            });
        })
        .error(function (r) {
            $scope.err = r;

            notify({
                message: 'Failed operation!',
                templateUrl: 'views/angular-notify.html'
            });
        });
    }

    // get list countries from json file
    $scope.countries = [];
    countryService.GetCountries()
        .success(function (data) {
            $scope.countries = data;
        });

    var $ctrl = this;

    $scope.classrooms = function (size, parentSelector) {

        var parentElem = parentSelector ?
          angular.element($document[0].querySelector('.modal-demo' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/classrooms.html',
            controller: 'classroomsCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
            }
        })
    };
}

angular
    .module('isApi')
    .controller('schoolCtrl', schoolCtrl);