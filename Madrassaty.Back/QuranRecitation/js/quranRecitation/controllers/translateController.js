/**
 * translateCtrl - Controller for translate
 */
function translateCtrl($translate, $scope) {
    
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $scope.language = langKey;
    };
}


app.controller('translateCtrl', translateCtrl);