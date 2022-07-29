//<reference path="scripts/angular.min.js">
var app = angular.module("appCC", []); 

app.controller("memberCtrl", function ($window, $scope, $http, $state) {

    var mbrCtrlUrl = "http://localhost:58232/api/Members/";

    //Member Authentication
    $scope.MemberAuth = function (mbr) {
        $http.get(mbrCtrlUrl + "Auth",
            {
                headers: { "Authorization": "Basic " + mbr.Login + ":" + mbr.PasswordHash }
            }).success(function () {
                $scope.resa = "ok";
                $state.go("");
                $window.location.href = "index.html";
            }).error(function (r) {
                $scope.resa = r.toString();
            });
    };

    //Get all Members
    $http.get(mbrCtrlUrl).success(function (r) { $scope.res = r; }).error(function (r) { $scope.err = r; });

    //Get member by id
    $scope.GetObjById = function (objId) {
        $http.get(mbrCtrlUrl + objId).success(function (r) { $scope.objInput = r; }).error(function (r) { $scope.err = r; });
    }

    //Post
    $scope.PostObj = function () {

        $http.post(mbrCtrlUrl, $scope.objInput).success(function (r) {
            $scope.res = r;
            $scope.objInput = null;
        }).error(function (r) { $scope.err = r; });
    }

    //Put
    $scope.PutObj = function (objId, objToUpdt) {
        $http.put(mbrCtrlUrl + objId, objToUpdt).success().error(function (r) { alert(r); });
    }

    //Delete
    $scope.DeleteObj = function (objId) {
        $http.delete(mbrCtrlUrl + objId)
            .success(function (r) {
                $scope.res = r;
            })
            .error(function (r) { $scope.err = r; });
    }
});
