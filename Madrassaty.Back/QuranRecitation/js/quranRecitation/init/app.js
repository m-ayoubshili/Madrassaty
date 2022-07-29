/**
 * IYA Soft WebApi mainApp
 *
 */
var app = angular.module('isApi', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',                   // ngSanitize    
        'chieffancypants.loadingBar',   // loading bar
        'ui.calendar',                  // calendar
        'cgNotify'                      // notify
]);
// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad