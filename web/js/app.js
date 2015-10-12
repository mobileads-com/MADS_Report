require.config({

    baseUrl : 'lib',

    paths : {
        app     : '../js',
        view    : '../js/views',
        tpl     : '../tpl',
        handlerbars_localization : 'handlebars.localisation',
        locale : '../js/language/locale',
        bootstrap : '../js/plugins/bootstrap.min',
        raphael : 'gauge/raphael-min',
        kumagauge : 'gauge/kuma-gauge.jquery',
        flot : 'donut/jquery.flot',
        flotpie : 'donut/jquery.flot.pie',
        flotresize : 'donut/jquery.flot.resize'
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
        },
        kumagauge : {
            deps : ['raphael-min']
        },
        flotpie :{
            deps : ['donut/jquery.flot']
        },
        flotresize : {
            deps : ['donut/jquery.flot', 'donut/jquery.flot.pie']
        }
    }
});

require(['app/router','handlerbars_localization', 'bootstrap'], function (router) {

    "use strict";

    router.start();

});


