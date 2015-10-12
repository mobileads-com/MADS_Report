require.config({

    baseUrl : 'lib',

    paths : {
        app     : '../js',
        view    : '../js/views',
        tpl     : '../tpl',
        handlerbars_localization : 'handlebars.localisation',
        jquery : 'jquery',
        locale : '../js/language/locale',
        bootstrap : '../js/plugins/bootstrap.min',
        raphael : 'gauge/raphael-min',
        kumagauge : 'gauge/kuma-gauge.jquery',
        flot : 'donut/jquery.flot',
        flotpie : 'donut/jquery.flot.pie',
        flotresize : 'donut/jquery.flot.resize',
        bootstraptable : 'bootstrap-table.min',
        tableexport : 'export/bootstrap-table-export.min',
        jqueryexport : 'export/jquery-table-export.min'
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
        raphael : {
            exports : 'raphael'
        },
        kumagauge : {
            deps : ['raphael'],
            exports : 'kumagauge'
        },
        flot : {
            deps : ['jquery'],
            exports : 'flot'
        },
        flotpie :{
            deps : ['jquery', 'flot'],
            exports : 'flotpie'
        },
        flotresize : {
            deps : ['jquery', 'flot', 'flotpie'],
            exports : 'flotresize'
        },
        bootstraptable : {
            deps : ['jquery'],
            exports : 'bootstraptable'
        },
        tableexport : {
            deps : ['jquery', 'bootstraptable'],
            exports : 'bootstraptableexport'
        },
        jqueryexport : {
            deps : ['jquery', 'bootstraptable'],
            exports : 'jqueryexport'
        }
    }
});

require(['app/router','handlerbars_localization', 'bootstrap'], function (router) {

    "use strict";

    router.start();

});


