'use strict';
function authDataFactory() {
    var authDataFactory = {};

    var _authentication = {
        IsAuthenticated: false,
        userName: ""
    };
    authDataFactory.authenticationData = _authentication;

    return authDataFactory;
};

angular
    .module('isApi')
    .factory('authDataFactory', authDataFactory);