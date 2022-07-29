function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, IdleProvider, KeepaliveProvider, cfpLoadingBarProvider) {

    IdleProvider.idle(5);
    IdleProvider.timeout(120);
    $urlRouterProvider.otherwise("/login");

    cfpLoadingBarProvider.includeSpinner = false;

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            data: { pageTitle: 'Register', specialClass: 'gray-bg' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            name: 'ui.knob',
                            files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
                        },
                        {
                            files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'nouislider',
                            files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
                        },
                        {
                            name: 'colorpicker.module',
                            files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
                        },
                        {
                            name: 'ngImgCrop',
                            files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
                        },
                        {
                            name: 'ngTagsInput',
                            files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
                        },
                        {
                            files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
                        },
                        {
                            name: 'frapontillo.bootstrap-duallistbox',
                            files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        })
        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "views/forgot_password.html",
            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
        })
        .state('core', {
            abstract: true,
            url: "/core",
            templateUrl: "views/common/content.html"
        })
        .state('core.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: ['js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js' ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        }
                    ]);
                }
            }
        })
        .state('core.members', {
            url: "/members",
            templateUrl: "views/contacts.html",
            data: { pageTitle: 'Members' }
        })
        .state('core.memberssettings', {
            url: "/memberssettings",
            templateUrl: "views/contacts_settings.html",
            data: { pageTitle: 'Members Settings' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.profile', {
            url: "/profile",
            templateUrl: "views/profile.html",
            data: { pageTitle: 'Profile' }
        })
        .state('core.editProfile', {
            url: "/editprofile",
            templateUrl: "views/editProfile.html",
            data: { pageTitle: 'Edit Profile' }
        })
        .state('core.editLogin', {
            url: "/editlogin",
            templateUrl: "views/editLogin.html",
            data: { pageTitle: 'Edit Member Login' }
        })
        .state('core.deleteMember', {
            url: "/deletemember",
            templateUrl: "views/yesno.html",
            data: { pageTitle: 'Delete member' }
        })
        .state('core.school', {
            url: "/school",
            templateUrl: "views/school.html",
            data: { pageTitle: 'School' }
        })
        //session recitation 
         .state('core.recitationSession', {
             url: "/recitationSession",
             templateUrl: "views/recitationSession.html",
             data: { pageTitle: 'Recitation' }
         })
         .state('core.recitationSessionStudents', {
             url: "/recitationSessionStudents",
             templateUrl: "views/recitationSessionStudents.html",             
             data: { pageTitle: 'Recitation' }
         })
        .state('core.notify', {
            url: "/notify",
            templateUrl: "views/angular-notify.html",
            data: { pageTitle: 'Notify' }
        }).
        state('core.courses', {
            url: "/courses",
            templateUrl: "views/courses.html",
            data: { pageTitle: 'Courses' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.editCourse', {
            url: "/editcourse",
            templateUrl: "views/addEditCourse.html",
            data: { pageTitle: 'Edit Course' }
        })
        .state('core.disciplines', {
            url: "/disciplines",
            templateUrl: "views/disciplines.html",
            data: { pageTitle: 'Disciplines' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.editDiscipline', {
            url: "/editdiscipline",
            templateUrl: "views/addEditDiscipline.html",
            data: { pageTitle: 'Edit Discipline' }
        })
        .state('core.disciplineLevels', {
            url: "/disciplineLevels",
            templateUrl: "views/disciplineLevels.html",
            data: { pageTitle: 'Edit Discipline Level' }
        })
        .state('core.classrooms', {
            url: "/classrooms",
            templateUrl: "views/classrooms.html",
            data: { pageTitle: 'Classrooms' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.editClassroom', {
            url: "/editClassroom",
            templateUrl: "views/editClassroom.html",
            data: { pageTitle: 'Edit Classroom' }
        })
        .state('core.levels', {
            url: "/levels",
            templateUrl: "views/levels.html",
            data: { pageTitle: 'Levels' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.levelStudents', {
            url: "/levelStudents",
            templateUrl: "views/levelStudents.html",
            data: { pageTitle: 'Discipline Level Students' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.roles', {
            url: "/roles",
            templateUrl: "views/roles.html",
            data: { pageTitle: 'Roles' }
        })
        .state('core.vacances', {
            url: "/vacances",
            templateUrl: "views/vacances.html",
            data: { pageTitle: 'Vacances' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.anneeScolaire', {
            url: "/anneeScolaire",
            templateUrl: "views/AnneeScolaire.html",
            data: { pageTitle: 'AnneeScolaire' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.moutoun', {
            url: "/moutoun",
            templateUrl: "views/moutoun.html",
            data: { pageTitle: 'Moutoun' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.moutounSession', {
            url: "/moutounSession",
            templateUrl: "views/moutounSession.html",
            data: { pageTitle: 'Session Moutoun' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.presence', {
            url: "/presence",
            templateUrl: "views/presence.html",
            data: { pageTitle: 'presence' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.examens', {
            url: "/examens",
            templateUrl: "views/examens.html",
            data: { pageTitle: 'Examens' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        })
        .state('core.notesExamen', {
            url: "/notesExamen",
            templateUrl: "views/notesExamen.html",
            data: { pageTitle: 'notes Examen' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        }
                    ]);
                }
            }
        }).state('core.evaluation', {
            url: "/evaluation",
            templateUrl: "views/evaluation.html",
            data: { pageTitle: 'Evaluation' },
            //resolve: {
            //    loadPlugin: function ($ocLazyLoad) {
            //        return $ocLazyLoad.load([
            //            {
            //                serie: true,
            //                files: ['js/plugins/dataTables/datatables.min.js', 'css/plugins/dataTables/datatables.min.css']
            //            },
            //            {
            //                serie: true,
            //                name: 'datatables',
            //                files: ['js/plugins/dataTables/angular-datatables.min.js']
            //            },
            //            {
            //                serie: true,
            //                name: 'datatables.buttons',
            //                files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
            //            }
            //        ]);
            //    }
            //}
        })

        .state('core.calendar', {
            url: "/calendar",
            templateUrl: "views/calendar.html",
            data: { pageTitle: 'Calendar' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            files: ['css/plugins/fullcalendar/fullcalendar.css', 'js/plugins/fullcalendar/fullcalendar.min.js', 'js/plugins/fullcalendar/gcal.js']
                        },
                        {
                            name: 'ui.calendar',
                            files: ['js/plugins/fullcalendar/calendar.js']
                        },
                        {
                            name: 'ui.sortable',
                            files: ['js/plugins/ui-sortable/sortable.js']
                        },
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            name: 'ui.knob',
                            files: ['js/plugins/jsKnob/jquery.knob.js', 'js/plugins/jsKnob/angular-knob.js']
                        },
                        {
                            files: ['css/plugins/ionRangeSlider/ion.rangeSlider.css', 'css/plugins/ionRangeSlider/ion.rangeSlider.skinFlat.css', 'js/plugins/ionRangeSlider/ion.rangeSlider.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/bootstrap-chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'nouislider',
                            files: ['css/plugins/nouslider/jquery.nouislider.css', 'js/plugins/nouslider/jquery.nouislider.min.js', 'js/plugins/nouslider/angular-nouislider.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css', 'js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
                        },
                        {
                            name: 'colorpicker.module',
                            files: ['css/plugins/colorpicker/colorpicker.css', 'js/plugins/colorpicker/bootstrap-colorpicker-module.js']
                        },
                        {
                            name: 'ngImgCrop',
                            files: ['js/plugins/ngImgCrop/ng-img-crop.js', 'css/plugins/ngImgCrop/ng-img-crop.css']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            files: ['css/plugins/touchspin/jquery.bootstrap-touchspin.min.css', 'js/plugins/touchspin/jquery.bootstrap-touchspin.min.js']
                        },
                        {
                            name: 'ngTagsInput',
                            files: ['js/plugins/ngTags//ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
                        },
                        {
                            files: ['js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'css/plugins/dualListbox/bootstrap-duallistbox.min.css']
                        },
                        {
                            name: 'frapontillo.bootstrap-duallistbox',
                            files: ['js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        });
};

angular.module('isApi')
    .config(config)
    .run(function ($rootScope, $state, Language) {
        $rootScope.$state = $state;
        //make the service available     
        $rootScope.Language = Language;
});