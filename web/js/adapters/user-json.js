app.userAdapter = (function () {

    'use strict';

    var getUserInfo = function (userId) { 
    	return $.ajax({
    		url: 'user_info',
    		type: 'POST',
    		data: {'userId':userId}
		});
	},
	
	getUserList = function () { 
    	return $.ajax({
    		url: 'user_list',
    		type: 'POST'
		});
	};

    // The public API
    return {
    	getUserInfo: getUserInfo,
    	getUserList: getUserList
    };

}());