define(function (require) {

    'use strict';

    var getCustomReport = function (options) { 
    	return $.ajax({
    		url: 'custom_report',
    		type: 'POST',
    		data: {
                'advertiser' : 'value',
                'campaign' : 'value',
                'creative' : 'value',
                'start-date' : '4/22/2015',
                'end-date' : '4/22/2015'
            }

		});
	},
	
	getFilterOptions = function () { 
    	return $.ajax({
    		url: 'custom_report_filter',
    		type: 'POST'
		});
	};

    // The public API
    return {
    	getCustomReport: getCustomReport,
    	getFilterOptions: getFilterOptions
    };

});