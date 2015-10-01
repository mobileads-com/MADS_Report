require.config({

    baseUrl : 'lib',

    paths : {
        app     : '../js',
        view    : '../js/views',
        tpl     : '../tpl',
        handlerbars_localization : 'handlebars.localisation',
        locale : '../js/language/locale',
    },

    map: {
        '*' : {
            'adapters/custom-report' : 'app/adapters/custom-report-json'
        }
    },
    
    shim: {
        handlebars : {
            exports : 'Handlebars'
        },
        handlerbars_localization : {
            deps : ['handlebars','locale'],
            exports : 'language'
        }
    }
});

require(['app/router','handlerbars_localization'], function (router) {

    "use strict";

    router.start();

});


