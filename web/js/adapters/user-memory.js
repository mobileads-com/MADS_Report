app.userAdapter = (function () {

    'use strict';

    var getUserInfo = function (userId) { 
    	var deferred = $.Deferred();
    	    	
    	deferred.resolve(userInfo);
        return deferred.promise();
	},
	
	getUserList = function () { 
    	var deferred = $.Deferred();
    	    	
    	deferred.resolve(userList);
        return deferred.promise();
	},
	
	userInfo = {
		"result" : {
			"id":"116",
			"name":"Allen Tan",
			"email":"allen@xteam.com",
			"age":"24",
			"status":"complicated"
		},
		"message" : "",
		"status" : true
	},
	
	userList = {
		"result" : [
			{"id":"116","name":"Allen","email":"allen@xteam.com"},
			{"id":"118","name":"Bruce","email":"brucelee@heaven.com"}
		],
		"message" : "",
		"status" : true
	};

    // The public API
    return {
    	getUserInfo: getUserInfo,
		getUserList: getUserList
    };

}());