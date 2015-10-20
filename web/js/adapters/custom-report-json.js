define(function (require) {

	'use strict';

	var getCustomReport = function (options) { 
		return $.ajax({
			url: 'custom_report',
			type: 'POST',
			data: {
				'advertiser' : options.pubUserId,
				'campaign' : options.campaignId,
				'creative' : options.studioId,
				'start-date' : options.startDate,
				'end-date' : options.endDate
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