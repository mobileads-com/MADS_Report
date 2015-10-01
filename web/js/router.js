define(function (require) {

	"use strict";

    var $                       = require('jquery'),
        CustomReportView        = require("view/CustomReportView"),
	
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