app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider
        .translations('ar', {
            //Login
            WELCOME: 'مرحبا بكم في مدرسة ابن الجزري',
            LOGIN_TITLE: 'تسجيل الدخول',
            USERNAME: 'اسم المستخدم',
            PASSWORD: 'كلمه السر',
            FORGOT_PASSWORD: 'هل نسيت كلمة المرور ؟',
            DO_NOT_HAVE_AN_ACCOUNT: 'ليس لديك حساب ؟',
            CREATE_AN_ACCOUNT: 'انشئ حساب',
            COPYRIGHT: 'حق النشر',
            LOGIN: 'تسجيل الدخول',

            //Forget password
            EMAIL: 'البريد الإلكتروني',
            FORGOT_PASSWORD_TITLE: 'أدخل عنوان البريد الإلكتروني الخاص بك وسوف يتم إعادة تعيين كلمة المرور الخاصة بك وإرسالها عن طريق البريد الإلكتروني.',
            FORGOT_PASSWORD: 'نسيت كلمة المرور',
            SEND_NEW_PASSWORD: 'أرسل كلمة مرور جديدة',
            CREATE_ACCOUNT: 'إصنع حساب',
            REGISTER_TO_QURAN_RECITATION: 'سجل لتلاوة القرآن الكريم',

            //Register
            REGISTER_TO_QURANRECITATION: 'سجل لتلاوة القرآن الكريم',
            ALREADY_HAVE_AN_ACCOUNT: 'هل لديك حساب؟',
            CREATE_ACCOUNT: 'إفتح حساب',
            CONFIRM_PASSWORD: 'تأكيد كلمة السر',
            PRÉNOM: 'الاسم',
            NOM: 'اللقب',
            SKYPE: 'سكايب',
            PROFESSION: 'مهنة',
            BIRTHDATE: 'تاريخ الميلاد',
            STREET: 'شارع',
            ZIPCODE: 'الرمز البريدي',
            CITY: 'مدينة',
            COUNTRY: 'بلد',
            REGISTER: 'تسجيل',
            SCHOOL: 'مدرسة',
            MASCULIN: 'ذكر',
            FEMENIN: 'أنثى',

            // Define all menu elements
            DASHBOARD: 'لوحة القيادة',
            PROFILE: 'الملف الشخصي',
            GENERAL_PARAMS: 'الإعدادات العامة',
            SCHOOL: 'مدرسة',
            CLASSROOMS: 'الأقسام',
            LESSONS: 'الدروس',
            LEVELS: 'المستويات',
            MEMBERS: 'أعضاء',
            CALENDAR: 'رزنامة',
            EVENTS: 'الأحداث',
            ROLES: 'الأدوار',
            DISCIPLINE: 'التخصصات',
            RECURRENCE: 'تكرار',
            COURSE: 'الدرس',
            SESSION: "الدورة",
            ARABE: 'العربية',
            FRANCAIS: 'الفرنسية',


        })
        .translations('fr', {
            //Login
            WELCOME: 'Bienvenue à l\'école Ibn Jazari',
            LOGIN_TITLE: 'Se connecter',
            USERNAME: 'Nom d\'utilisateur',
            PASSWORD: 'Mot de passe',
            FORGOT_PASSWORD:'Mot de passe oublié ?',
            DO_NOT_HAVE_AN_ACCOUNT: 'Vous n\'avez pas de compte ?',
            CREATE_AN_ACCOUNT: 'Créer un compte',
            COPYRIGHT: 'Droits d\'auteur',
            LOGIN: 'Se connecter',

            //Forget password
            EMAIL: 'Email',
            FORGOT_PASSWORD_TITLE: 'Entrez votre adresse e-mail et votre mot de passe sera réinitialisé et envoyé par e-mail.',
            FORGOT_PASSWORD: 'Mot de passe oublié',
            SEND_NEW_PASSWORD: 'Envoyer nouveau mot de passe',
            REGISTER_TO_QURAN_RECITATION: 'Inscrivez-vous pour Coran Récitation',

            //Register
            REGISTER_TO_QURANRECITATION: 'Enregistrez-vous à la récitation du coran',
            ALREADY_HAVE_AN_ACCOUNT: 'Vous avez déjà un compte ?',
            CREATE_ACCOUNT: 'Créer un compte',
            CONFIRM_PASSWORD: 'Confirmez le mot de passe',
            PRÉNOM: 'Prénom',
            NOM: 'Nom',
            SKYPE: 'Skype',
            PROFESSION: 'Métier',
            BIRTHDATE: 'Date de naissance',
            STREET: 'Rue',
            ZIPCODE: 'Code postal',
            CITY: 'Ville',
            COUNTRY: 'Pays',
            REGISTER: 'Registre',
            SCHOOL: 'École',
            MASCULIN: 'Masculin',
            FEMENIN: 'Feminin',

            // Define all menu elements
            DASHBOARD: 'Tableau de bord',
            PROFILE: 'Profil',
            GENERAL_PARAMS: 'Paramètres généraux',
            SCHOOL: 'Ecole',
            CLASSROOMS: 'Salles',
            LESSONS: 'Leçons',
            LEVELS: 'Niveaux',
            MEMBERS: 'Membres',
            CALENDAR: 'Calendrier',
            EVENTS: 'Les Evénements',
            ROLES: 'Droits',
            DISCIPLINE: 'Disciplines',
            RECURRENCE: 'Recurrences',
            COURSE: 'Cours',
            SESSION:"Sessions",

            ARABE: 'Arabe',
            FRANCAIS: 'Français',
        });

    //default language
    $translateProvider.preferredLanguage('fr');
    //fallback language if entry is not found in current language
    $translateProvider.fallbackLanguage('ar');

}]);