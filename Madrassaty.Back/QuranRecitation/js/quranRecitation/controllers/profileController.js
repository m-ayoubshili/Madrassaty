function profileCtrl($scope, memberService, countryService, notify) {

    var id = sessionStorage.getItem('userId');

    $scope.genderOptions = [{ id: 'M', name: 'Masculin' }, { id: 'F', name: 'Féminin' }]

    $scope.memberModel = {
        member: {
            PhotoPath: '',
            BeginningDate: new Date(),
            BirthDate: new Date(),
        },
        PhotoBytes: ''
    };

    memberService.GetMemberById(id)
        .success(function (r) {
            $scope.memberModel.member = r;
            $scope.memberModel.member.PhotoPath = memberService.GetMemberPhoto($scope.memberModel.member.PhotoPath);
            $scope.putDates();
        })
        .error(function (r) {
            $scope.err = r;
        });

    $scope.EditProfile = function () {
        memberService.UpdateMember(id, $scope.memberModel)
         .success(function (r) {
             $scope.memberModel.member = r;
             $scope.memberModel.member.PhotoPath = memberService.GetMemberPhoto($scope.memberModel.member.PhotoPath);
             $scope.putDates();

             notify({
                 message: 'Profile updated with success.',
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

    // get bootstrap ui date picker
    $scope.putDates = function () {
        $scope.memberModel.member.BeginningDate = new Date($scope.memberModel.member.BeginningDate);
        $scope.memberModel.member.BirthDate = new Date($scope.memberModel.member.BirthDate);
    };


    $scope.clear = function () {
        $scope.memberModel.member.BeginningDate = null;
        $scope.memberModel.member.BirthDate = null;
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
        $scope.memberModel.member.BeginningDate = new Date(year, month, day);
        $scope.memberModel.member.BirthDate = new Date(year, month, day);
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
    .controller('profileCtrl', profileCtrl);