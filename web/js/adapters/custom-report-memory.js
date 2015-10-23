define(function (require) {

	'use strict';

	var getCustomReport = function (opts) { 
		var deferred = $.Deferred();

		deferred.resolve(customReport);
		return deferred.promise();
	},

	getCustomReport2 = function (opts) { 
		var deferred = $.Deferred();

		deferred.resolve(customReport2);
		return deferred.promise();
	},
	
	getFilterOptions = function () { 
		var deferred = $.Deferred();

		deferred.resolve(filterOptions);
		return deferred.promise();
	},

	customReport = {
		'impressions' : 0,
		'expansion' : 0,
		'engagement' : 0,
		'clickthrough' : 0,
		'engagementType' : [{
			'type1' : 100
		},
		{
			'type2' : 100
		},
		{
			'type3' : 100
		},
		{
			'type4' : 100
		}
		],
		'data': []
	},

	customReport2 = {
		'impressions' : 50000,
		'expansion' : 4000,
		'engagement' : 3000,
		'clickthrough' : 2000,
		'engagementType' : [{
			'type1' : 10
		},
		{
			'type2' : 40
		},
		{
			'type3' : 21
		},
		{
			'type4' : 29
		}
		],
		'data': [
		{
		'date' : '07/10/2015',
		'impressions' : 18000,
		'expansion' : 2500,
		'engagement' : 1100,
		'clickthrough' : 400,
		'type1' : 120,
		'type2' : 180,
		'type3' : 87,
		'type4' : 61,		
	},{
		'date' : '08/10/2015',
		'impressions' : 16000,
		'expansion' : 3500,
		'engagement' : 2000,
		'clickthrough' : 400,
		'type1' : 110,
		'type2' : 50,
		'type3' : 110,
		'type4' : 50,		
	},
	{
		'date' : '09/10/2015',
		'impressions' : 16000,
		'expansion' : 1100,
		'engagement' : 2100,
		'clickthrough' : 400,
		'type1' : 90,
		'type1' : 50,
		'type1' : 100,
		'type1' : 0,		
	},
	{
		'date' : '07/10/2015',
		'impressions' : 18000,
		'expansion' : 2500,
		'engagement' : 1100,
		'clickthrough' : 400,
		'type1' : 120,
		'type2' : 180,
		'type3' : 87,
		'type4' : 61,		
	},{
		'date' : '08/10/2015',
		'impressions' : 16000,
		'expansion' : 3500,
		'engagement' : 2000,
		'clickthrough' : 400,
		'type1' : 110,
		'type2' : 50,
		'type3' : 110,
		'type4' : 50,		
	},
	{
		'date' : '09/10/2015',
		'impressions' : 16000,
		'expansion' : 1100,
		'engagement' : 2100,
		'clickthrough' : 400,
		'type1' : 90,
		'type1' : 50,
		'type1' : 100,
		'type1' : 0,		
	},
	{
		'date' : '07/10/2015',
		'impressions' : 18000,
		'expansion' : 2500,
		'engagement' : 1100,
		'clickthrough' : 400,
		'type1' : 120,
		'type2' : 180,
		'type3' : 87,
		'type4' : 61,		
	},{
		'date' : '08/10/2015',
		'impressions' : 16000,
		'expansion' : 3500,
		'engagement' : 2000,
		'clickthrough' : 400,
		'type1' : 110,
		'type2' : 50,
		'type3' : 110,
		'type4' : 50,		
	},
	{
		'date' : '09/10/2015',
		'impressions' : 16000,
		'expansion' : 1100,
		'engagement' : 2100,
		'clickthrough' : 400,
		'type1' : 90,
		'type1' : 50,
		'type1' : 100,
		'type1' : 0,		
	},
	{
		'date' : '07/10/2015',
		'impressions' : 18000,
		'expansion' : 2500,
		'engagement' : 1100,
		'clickthrough' : 400,
		'type1' : 120,
		'type2' : 180,
		'type3' : 87,
		'type4' : 61,		
	},{
		'date' : '08/10/2015',
		'impressions' : 16000,
		'expansion' : 3500,
		'engagement' : 2000,
		'clickthrough' : 400,
		'type1' : 110,
		'type2' : 50,
		'type3' : 110,
		'type4' : 50,		
	},
	{
		'date' : '09/10/2015',
		'impressions' : 16000,
		'expansion' : 1100,
		'engagement' : 2100,
		'clickthrough' : 400,
		'type1' : 90,
		'type1' : 50,
		'type1' : 100,
		'type1' : 0,		
	},
	{
		'date' : '07/10/2015',
		'impressions' : 18000,
		'expansion' : 2500,
		'engagement' : 1100,
		'clickthrough' : 400,
		'type1' : 120,
		'type2' : 180,
		'type3' : 87,
		'type4' : 61,		
	},{
		'date' : '08/10/2015',
		'impressions' : 16000,
		'expansion' : 3500,
		'engagement' : 2000,
		'clickthrough' : 400,
		'type1' : 110,
		'type2' : 50,
		'type3' : 110,
		'type4' : 50,		
	},
	{
		'date' : '09/10/2015',
		'impressions' : 16000,
		'expansion' : 1100,
		'engagement' : 2100,
		'clickthrough' : 400,
		'type1' : 90,
		'type1' : 50,
		'type1' : 100,
		'type1' : 0,		
	}
	]
	},
	
	filterOptions = {
		"advertiser" : [{
			"title" : "Varun",
			"value" : 1
		}, {
			"title" : "Mervin",
			"value" : 2
		}, {
			"title" : "Mindshare",
			"value" : 3
		}
		],
		"campaign" : [{
			"title" : "Varun 1",
			"value" : 1,
			"advertiser_id"	: 1
		}, {
			"title" : "Mindshare 1",
			"value" : 2,
			"advertiser_id"	: 3
		}, {
			"title" : "Varun 2",
			"value" : 3,
			"advertiser_id"	: 1
		}, {
			"title" : "Mervin 1",
			"value" : 4,
			"advertiser_id"	: 2
		}
		],
		"creative" : [{
			"title" : "Mindshare C1",
			"value" : 17,
			"campaign_id"	: 2
		}, {
			"title" : "Mindshare C2",
			"value" : 18,
			"campaign_id"	: 2
		}, {
			"title" : "Varun C1",
			"value" : 20,
			"campaign_id"	: 1
		}, {
			"title" : "Varun C2",
			"value" : 24,
			"campaign_id"	: 1
		}, {
			"title" : "Mervin C1",
			"value" : 25,
			"campaign_id"	: 4
		}, {
			"title" : "Mervin C2",
			"value" : 27,
			"campaign_id"	: 4
		}, {
			"title" : "Mindshare C3",
			"value" : 36,
			"campaign_id"	: 2
		}, {
			"title" : "Varun C3",
			"value" : 37,
			"campaign_id"	: 3
		}, {
			"title" : "Walls - IA | IST",
			"value" : 39,
			"campaign_id"	: 4
		}
		]
	};

	/*
	* The public API
	*/
	return {
		getCustomReport: getCustomReport,
		getCustomReport2: getCustomReport2,
		getFilterOptions: getFilterOptions
	};
});