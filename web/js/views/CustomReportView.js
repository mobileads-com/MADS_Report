define(function (require) {

    "use strict";

	var $                       = require('jquery'),
        Handlebars              = require('handlebars'),
        customReportAdapter     = require('adapters/custom-report'),
        uHtml                   = require('text!tpl/CustomReport.html'),
	
	uTpl= Handlebars.compile(uHtml);
	
    return function (data) {

        this.initialize = function () {
            this.$el = $('<div/>');
        };

        this.render = function () {
            //navigator.userLanguage = 'zh-CN';
            
            this.$el.html(uTpl(data));
            return this;
        };

        this.initialize();

    };
});