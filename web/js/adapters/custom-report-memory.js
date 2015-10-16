define(function (require) {

	'use strict';

	var getCustomReport = function () { 
		var deferred = $.Deferred();

		deferred.resolve(customReport);
		return deferred.promise();
	},
	
	getFilterOptions = function () { 
		var deferred = $.Deferred();

		deferred.resolve(filterOptions);
		return deferred.promise();
	},

	customReport = {
		'impressions' : 50000,
		'expansion' : 7100,
		'engagement' : 5200,
		'clickthrough' : 1200,
		'engagementType' : [{
			'type1' : 320
		},
		{
			'type2' : 280
		},
		{
			'type3' : 297
		},
		{
			'type4' : 111
		}
		],
		'data': [{
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
			'type2' : 50,
			'type3' : 100,
			'type4' : 0,		
		}]
	},
	
	// customReport = {
	// 	/* Benchmarking */
	// 	'impressions' : '5000',
	// 	'expansion' : {
	// 		'rate' : '8.3',
	// 		'value' : '31, 232',
	// 		'benchmark' : '8'
	// 	},
	// 	'engagement' : {
	// 		'rate' : '4.2',
	// 		'value' : '12, 232',
	// 		'benchmark' : '4'
	// 	},
	// 	'clickthrough' : {
	// 		'rate' : '5.3',
	// 		'value' : '43, 533',
	// 		'benchmark' : '5'
	// 	},
	// 	/* Engagement Type */
	// 	'engagementType' : [
	// 	{
	// 		'name' : 'Type 1',
	// 		'value' : '20'
	// 	},
	// 	{
	// 		'name' : 'Type 2',
	// 		'value' : '30'
	// 	},
	// 	{
	// 		'name' : 'Type 3',
	// 		'value' : '25'
	// 	},
	// 	{
	// 		'name' : 'Type 4',
	// 		'value' : '25'
	// 	}
	// 	],
	// 	/* Table */
	// 	data : [
	// 	{
	// 		'date' : '10/09/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '200',
	// 		'engagement' : '300',
	// 		'clickthrough' : '400',
	// 		'type1' : '500',
	// 		'type2' : '600',
	// 		'type3' : '700',
	// 		'type4' : '100'
	// 	},{
	// 		'date' : '10/10/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/11/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '800',
	// 		'engagement' : '400',
	// 		'clickthrough' : '600',
	// 		'type1' : '400',
	// 		'type2' : '300',
	// 		'type3' : '200',
	// 		'type4' : '100'
	// 	},{
	// 		'date' : '10/12/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/13/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/14/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/15/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/16/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/17/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/18/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/19/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	},{
	// 		'date' : '10/20/2015',
	// 		'impressions' : '5000',
	// 		'expansion' : '100',
	// 		'engagement' : '200',
	// 		'clickthrough' : '300',
	// 		'type1' : '100',
	// 		'type2' : '200',
	// 		'type3' : '300',
	// 		'type4' : '400'
	// 	}
	// 	]
	// },
	
	filterOptions = {
		"advertiser" : [{
			"title" : "Test Advertiser",
			"value" : 302
		}, {
			"title" : "Mervin",
			"value" : 734
		}, {
			"title" : "Mindshare-Pizza",
			"value" : 787
		}
		],
		"campaign" : [{
			"title" : "Dove  - App | IST",
			"value" : 12
		}, {
			"title" : "PizzaHut 2 - App | EXP",
			"value" : 13
		}, {
			"title" : "Vaseline - MA | EXP",
			"value" : 15
		}, {
			"title" : "KFC SIN 1 - MA | EXP",
			"value" : 19
		}, {
			"title" : "KFC SIN 2 - MA | EXP",
			"value" : 20
		}, {
			"title" : "Axe - MA | EXP",
			"value" : 22
		}, {
			"title" : "Lipton - MA | EXP",
			"value" : 31
		}, {
			"title" : "Cornetto - MA | EXP",
			"value" : 32
		}, {
			"title" : "Walls - IA | IST",
			"value" : 34
		}
		],
		"creative" : [{
			"title" : "Dove v1",
			"value" : 17
		}, {
			"title" : "PizzaHut v1",
			"value" : 18
		}, {
			"title" : "Vaseline v1",
			"value" : 20
		}, {
			"title" : "KFC SIN 1 - v1",
			"value" : 24
		}, {
			"title" : "KFC SIN 2 - v1",
			"value" : 25
		}, {
			"title" : "Axe v1",
			"value" : 27
		}, {
			"title" : "lipton v1",
			"value" : 36
		}, {
			"title" : "Cornetto - IA | EXP",
			"value" : 37
		}, {
			"title" : "Walls - IA | IST",
			"value" : 39
		}
		]
	};


	// {
	// 	'advertiser' : [{title:'Advertiser 1',value:'1'}, {title:'Advertise 2',value:'2'} ],
	// 	'campaign'   : [{title:'Campaign 1',value:'1'}, {title:'Campaign 2',value:'2'} ],
	// 	'creative'   : [{title:'Creative 1',value:'1'}, {title:'Creative 2',value:'2'} ]
	// };

	/*
	* The public API
	*/
	return {
		getCustomReport: getCustomReport,
		getFilterOptions: getFilterOptions
	};
});