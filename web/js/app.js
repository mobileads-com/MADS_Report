require.config({

    baseUrl : 'lib',

    paths : {
        app     : '../js',
        view    : '../js/views',
        tpl     : '../tpl',
        handlerbars_localization : 'handlebars.localisation',
        locale : '../js/language/locale',
        bootstrap : '../js/plugins/bootstrap.min',
        // adapters : '../js/adapters'
    },

    map: {
        '*' : {
            'adapters/custom-report' : 'app/adapters/custom-report-json',
            'adapters/custom-report-memory' : 'app/adapters/custom-report-memory'
        }
    },
    
    shim: {
        handlebars : {
            exports : 'Handlebars'
        },
        handlerbars_localization : {
            deps : ['handlebars','locale'],
            exports : 'language'
        },
        bootstrap :{
            deps : ['jquery']
        }
    }
});

require(['app/router','handlerbars_localization', 'bootstrap'], function (router) {

    "use strict";

    router.start();

});


