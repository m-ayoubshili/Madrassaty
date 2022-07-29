function anneeScolaireService($http, CONSTANTS) {

    // define AnneeScolaireCtrlUrl controller url
    var AnneeScolaireCtrlUrl = CONSTANTS.BASE_URL + "AnneeScolaires/";

    // add accesstoken in url headers
    var accesstoken = sessionStorage.getItem('accessToken');

    var config = {
        headers: {
            'Authorization': 'Bearer ' + accesstoken,
            'Content-Type': 'application/json'
        }
    };

    // get AnneeScolaire
    this.GetAnneeScolaire = function () {
        return $http.get(AnneeScolaireCtrlUrl, config);
    }

    // get AnneeScolaire
    this.GetAnneeScolaireActif = function () {
        return $http.get(AnneeScolaireCtrlUrl + "Actif", config);
    }

    // get AnneeScolaire
    this.GetAnneeScolaireById = function (Id) {
        return $http.get(AnneeScolaireCtrlUrl + Id, config);
    }

    // create AnneeScolaire
    this.CreateAnneeScolaire = function (model) {
        return $http.post(AnneeScolaireCtrlUrl, model, config);
    }

    // update AnneeScolaire
    this.UpdateAnneeScolaire = function (id, model) {
        return $http.put(AnneeScolaireCtrlUrl + id, model, config);
    }

    // update AnneeScolaire
    this.UpdateActifAnneeScolaire = function (id) { 
        return $http.put(AnneeScolaireCtrlUrl + "UpdateActif?id=" + id, config);
    }
    // delete AnneeScolaire
    this.DeleteAnneeScolaire = function (id) {
        return $http.delete(AnneeScolaireCtrlUrl + id, config);
    }

};

angular
    .module('isApi')
    .service('anneeScolaireService', anneeScolaireService);