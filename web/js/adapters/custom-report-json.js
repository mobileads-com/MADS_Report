define(function (require) {

	'use strict';

	var getCustomReport = function (options) { 
		return $.ajax({
			url: '/custom_ad_overview',
			type: 'POST',
			data: {
				'pubUserId' : options.pubUserId,
				'campaignId' : options.campaignId,
				'studioId' : options.studioId,
				'startDate' : options.startDate,
				'endDate' : options.endDate
			}
		});
	},
	
	getFilterOptions = function () {
		return $.ajax({
			url: '/get_filter_list',
			type: 'POST'
		});
	};

    // The public API
    return {
    	getCustomReport: getCustomReport,
    	getFilterOptions: getFilterOptions
    };

  });