define(function (require) {

	"use strict";

	var $                       = require('jquery'),
	CustomReportView        = require("view/CustomReportView"),
	reportdataadapter = require('adapters/custom-report-memory'),
	customReportUrl         = /^#customReport/;



	var route = function() {
		var hash = window.location.hash, match, view;

		if (!hash) {

			$('.main-content').html();
		}

		match = hash.match(customReportUrl);
		if (match) {
			view = new CustomReportView();
			$('.main-content').html(view.render().$el);

			reportdataadapter.getFilterOptions().done(function(data){
				view.initselect(data);
			});	
			reportdataadapter.getCustomReport().done(function(data){
				// setTimeout(function(){
					view.initgauge(data, data.impressions);
					view.initdonut(data.engagementType);
					view.inittable(data);
				// }, 2000);
			});
			view.initdatepicker();
		}
		
	},

	start = function () {
		route();
		$(window).on('hashchange', route);		
	};

    // The public API
    return {
    	start: start
    };

  });