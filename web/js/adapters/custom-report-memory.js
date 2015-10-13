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
		/* Benchmarking */
		'impressions' : '5000',
		'expansion' : {
			'rate' : '8.3',
			'value' : '31, 232',
			'benchmark' : '8'
		},
		'engagement' : {
			'rate' : '4.2',
			'value' : '12, 232',
			'benchmark' : '4'
		},
		'clickthrough' : {
			'rate' : '5.3',
			'value' : '43, 533',
			'benchmark' : '5'
		},
		/* Engagement Type */
		'engagementType' : [
		{
			'name' : 'Type 1',
			'value' : '20'
		},
		{
			'name' : 'Type 2',
			'value' : '30'
		},
		{
			'name' : 'Type 3',
			'value' : '25'
		},
		{
			'name' : 'Type 4',
			'value' : '25'
		}
		],
		/* Table */
		data : [
		{
			'date' : '10/09/2015',
			'impressions' : '5000',
			'expansion' : '200',
			'engagement' : '300',
			'clickthrough' : '400',
			'type1' : '500',
			'type2' : '600',
			'type3' : '700',
			'type4' : '100'
		},
		{
			'date' : '10/10/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		},
			{
			'date' : '10/11/2015',
			'impressions' : '5000',
			'expansion' : '800',
			'engagement' : '400',
			'clickthrough' : '600',
			'type1' : '400',
			'type2' : '300',
			'type3' : '200',
			'type4' : '100'
		},
		{
			'date' : '10/12/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		},
		{
			'date' : '10/13/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		},
		{
			'date' : '10/14/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		},
		{
			'date' : '10/15/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		},
		{
			'date' : '10/16/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		},
		{
			'date' : '10/17/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		},
		{
			'date' : '10/18/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		}
		,
		{
			'date' : '10/19/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		}
		,
		{
			'date' : '10/20/2015',
			'impressions' : '5000',
			'expansion' : '100',
			'engagement' : '200',
			'clickthrough' : '300',
			'type1' : '100',
			'type2' : '200',
			'type3' : '300',
			'type4' : '400'
		}
		]
	},
	
	filterOptions = {
		'advertiser' : [{title:'Advertiser 1',value:'1'}, {title:'Advertise 2',value:'2'} ],
		'campaign'   : [{title:'Campaign 1',value:'1'}, {title:'Campaign 2',value:'2'} ],
		'creative'   : [{title:'Creative 1',value:'1'}, {title:'Creative 2',value:'2'} ]
	};

	/*
	* The public API
	*/
    	return {
    		getCustomReport: getCustomReport,
    		getFilterOptions: getFilterOptions
    	};
});