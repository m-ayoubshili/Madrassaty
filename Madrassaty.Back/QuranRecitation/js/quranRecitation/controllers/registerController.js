function registerCtrl($scope, $state, loginservice, statusService, schoolService, countryService, $log, SweetAlert) {

    $scope.userRegistrationFirstName = "";
    $scope.userRegistrationLastName = "";
    $scope.userRegistrationEmail = "";
    $scope.userRegistrationPassword = "";
    $scope.userRegistrationConfirmPassword = "";
    $scope.userRegistrationGender = "";
    $scope.userRegistrationMemberStatus = "";
    $scope.userRegistrationSkypeId = "";
    $scope.userRegistrationProfession = "";
    $scope.userRegistrationBirthDate = "";
    $scope.userRegistrationStreet = "";
    $scope.userRegistrationZipCode = "";
    $scope.userRegistrationCity = "";
    $scope.userRegistrationCountry = "";
    $scope.userRegistrationSchool = "";

    $scope.genders = [{ Id: 'M', title: 'MASCULIN' }, { Id: 'F', title: 'FEMENIN' }];
    $scope.schools = [{ Id: 0, Name: '' }];
    $scope.status = [{ Id: 0, Wording: '' }];
    getStatus();

    function getStatus() {

        var promiseStatus = statusService.getStatus();
        promiseStatus.then(function (response) {
            console.log('promiseStatus');
            console.log(response);
            $scope.status = response;
            getSchools();
        })
        .error = function (fn) {
            $log.log(fn);
        };

        
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    // get list countries from json file
    $scope.countries = [];
    countryService.GetCountries()
        .success(function (data) {
            $scope.countries = data;
        });


    function getSchools() {
        var promiseSchool = schoolService.getSchools();
        promiseSchool.then(function (resp) {
            console.log('promiseSchool');
            console.log(resp);
            $scope.schools = resp;

        })
        .error = function (fn) {
            $log.log(fn);
        };
    }

    $scope.registerUser = function () {

        $scope.responseData = "";

        //The User Registration Information
        var userRegistrationInfo = {
            FirstName: $scope.userRegistrationFirstName,
            LastName: $scope.userRegistrationLastName,
            Email: $scope.userRegistrationEmail,
            Password: $scope.userRegistrationPassword,
            ConfirmPassword: $scope.userRegistrationConfirmPassword,
            Gender: $scope.userRegistrationGender.Id,
            MemberStatusId: $scope.userRegistrationMemberStatus.Id,
            SkypeId: $scope.userRegistrationSkypeId,
            Profession: $scope.userRegistrationProfession,
            BirthDate: $scope.userRegistrationBirthDate,
            Street: $scope.userRegistrationStreet,
            ZipCode: $scope.userRegistrationZipCode,
            City: $scope.userRegistrationCity,
            Country: $scope.userRegistrationCountry,
            SchoolId: $scope.userRegistrationSchool.Id
        };

        var promiseregister = loginservice.register(userRegistrationInfo);

        promiseregister.then(function (resp) {
            $scope.responseData = "User is Successfully";
            $scope.userRegistrationEmail = "";
            $scope.userRegistrationPassword = "";
            $scope.userRegistrationConfirmPassword = "";
            showAlert("Vous êtes bien enregistré à QuranRecitation");
            redirectToLogin();
        }, function (err) {
            showAlert(err.error_description);
            $scope.responseData = "Error " + err.status;
        });
    };

    function redirectToLogin() {
        $state.go("login");
    };

    function showAlert(title) {
        SweetAlert.swal({
            title: "QuranRecitation",
            text: title
        });

    };
};

app.controller('registerCtrl', registerCtrl);