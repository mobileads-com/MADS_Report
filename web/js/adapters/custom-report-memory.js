app.customReportAdapter = (function () {

    'use strict';

    var getCustomReport = function (userId) { 
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
        'impressions' : '',
        'expansion' : {
            'rate' : '',
            'value' : '',
            'benchmark' : ''
        },
        'engagement' : {
            'rate' : '',
            'value' : '',
            'benchmark' : ''
        },
        'clickthrough' : {
            'rate' : '',
            'value' : '',
            'benchmark' : ''
        },
        /* Engagement Type */
        'engagementType' : [
            {
                'name' : '',
                'value' : ''
            },
            {
                'name' : '',
                'value' : ''
            }
        ],
        /* Table */
        data : [
            {
                'date' : '',
                'impressions' : '',
                'expansion' : '',
                'engagement' : '',
                'clickthrough' : '',
                'type' : ''
            }
        ]
    },
	
	filterOptions = {
        'advertiser' : [{title:'',value:''}, {title:'',value:''} ],
        'campaign'   : [{title:'',value:''}, {title:'',value:''} ],
        'creative'   : [{title:'',value:''}, {title:'',value:''} ]
    };

    // The public API
    return {
    	getCustomReport: getCustomReport,
		getFilterOptions: getFilterOptions
    };

}());