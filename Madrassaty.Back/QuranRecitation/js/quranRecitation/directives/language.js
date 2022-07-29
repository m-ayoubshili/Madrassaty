app.factory('Language', function ($translate) {
    //add the languages you support here. ar stands for arabic
    var rtlLanguages = ['ar'];

    var isRtl = function() {
        var languageKey = $translate.proposedLanguage() || $translate.use();
        for (var i=0; i<rtlLanguages.length; i+=1) {
            if (languageKey.indexOf(rtlLanguages[i])>-1) 
                return true;
        }
        return false; 
    };

    //public api
    return {
        isRtl: isRtl
    };
});