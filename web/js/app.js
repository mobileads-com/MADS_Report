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
		jqueryexport : 'export/jquery-table-export.min',
		jquerysort : 'sort/jquery-table-sorter.min',
		tablesaw : 'tablesaw',

		moment : 'moment',
		bootstrap_datepicker : 'datepicker/daterangepicker',
		bootstrap_select : 'select/bootstrap-select.min',
		table_pager : 'table-pager'
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
		jqueryexport : {
			deps : ['jquery'],
			exports : 'jqueryexport'
		},
		jquerysort : {
			deps : ['jquery'],
			exports : 'jquerysort'
		},
		tablesaw : {
			deps : ['jquery'],
			exports : 'tablesaw'
		},
		bootstrap_datepicker : {
			deps : ['jquery', 'moment'],
			exports : 'bootstrap_datepicker'
		},
		bootstrap_select : {
			deps : ['jquery'],
			exports : 'bootstrap_select'
		},
		table_pager : {
			deps : ['jquery'],
			exports : 'table_pager'
		}
	}
});

require(['app/router','handlerbars_localization', 'bootstrap'], function (router) {

	"use strict";

	router.start();

});


