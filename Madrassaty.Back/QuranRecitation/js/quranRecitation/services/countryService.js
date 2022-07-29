function countryService ($http) {

    // get list countries from local json file
    this.GetCountries = function () {
        return $http.get('json/countries.json');
    };
};

angular
    .module('isApi')
    .service('countryService', countryService);