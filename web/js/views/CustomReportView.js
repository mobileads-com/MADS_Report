define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Handlebars = require('handlebars'),
	// customReportAdapter = require('adapters/custom-report'),
	uHtml = require('text!tpl/CustomReport.html'),

	bootstraptable = require('bootstrap-table.min'),
	tableexport = require('export/bootstrap-table-export.min'),
	jqueryexport = require('export/jquery-table-export.min'),

	tablesaw = require('tablesaw'),

	jqueryexport = require('select/bootstrap-select.min'),

	jqueryflot = require('donut/jquery.flot'),
	jqueryflotpie = require('donut/jquery.flot.pie'),
	jqueryflotresize = require('donut/jquery.flot.resize'),

	raphael = require('gauge/raphael-min'),
	gauge = require('gauge/kuma-gauge.jquery'),

	reportdataadapter = require('adapters/custom-report-memory'),

	uTpl= Handlebars.compile(uHtml);
	
	return function (data) {
		this.initialize = function () {
			this.$el = $('<div/>');
			$('#btnsample').on('click', function(){
				alert('hello');
			})
		};

		this.inittable = function() {
			$('#table-data > thead > tr > th:nth-child(2)').empty().append('Impressions <p>5000</p>');
			$('#table-data > thead > tr > th:nth-child(3)').empty().append('Expansions <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(4)').empty().append('Engagement <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(5)').empty().append('Clickthrough <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(6)').empty().append('Typen 1 <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(7)').empty().append('Typen 2 <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(8)').empty().append('Typen 3 <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(9)').empty().append('Typen 4 <p>123, 246 (2.4%)</p>');

			$('#table-data').bootstrapTable({
				pagination: true,
				showExport: true,
				exportDataType: 'basic',
				exportTypes: ['excel'],
				buttonsAlign: 'left'
			});
		}

		this.initdonut = function(){
			var data = [{ label:"Firefox", data : 40 }, { label:"Google Chrome", data : 30 }, { label:"Opera", data : 10 },  { label:"Safari", data : 20 }],
			series = Math.floor(Math.random() * 6) + 3;

			var placeholder = $("#donut");
			$.plot(placeholder, data, {
				series: {
					pie: { 
						innerRadius: 0.4,
						show: true,
					}
				},
				legend: {
					show: false
				}
			});
		}

		this.initgauge = function(){
			var gauge = function(){

			}

			gauge.prototype.initialize = function(ele, data){
				$(ele).kumaGauge({
					min: 0,
					max: data.max,
					value : data.rate,
					fill : '#F34A53',
					gaugeBackground : '#1E4147',
					gaugeWidth : 20,
					showNeedle : true,
					needleHeight : 85,
					actualValue : { // the value
						display : true,
						value: data.value,
						fontFamily : 'Arial', 
						fontColor : '#000',
						fontSize : 20, 
						fontWeight : 'normal'
					},
					valueLabel : { //rate
						display : true,
						fontFamily : 'Arial', 
						fontColor : '#000',
						fontSize : 20, 
						fontWeight : 'normal'
					},
					benchmark : {
						display : true,
						value : data.benchmark,
						fontFamily : 'Arial',
						fontColor : '#000',
						fontSize : 20, 
						fontWeight : 'normal',
					},
					title : {
						display : true,
						value : data.title,
						fontFamily : 'Arial',
						fontColor : '#000',
						fontSize : 20, 
						fontWeight : 'normal',
					},
					label : {
						display : true,
						left : 0,
						right : data.max,
						fontFamily : 'Helvetica',
						fontColor : '#1E4147',
						fontSize : '11',
						fontWeight : 'bold'
					}
				});
			}

			gauge.prototype.getMax = function(r, b){
				r = parseFloat(r);
				b = parseFloat(b);
				if(r == b){
					return r + 1;
				}else{
					return Math.ceil(Math.max(r, b));
				}
			}
			
			var g = new gauge();

			var a = {};
			a.title = 'Expansion';
			a.value = '123,456';
			a.benchmark = 2;
			a.rate = 2; 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-expansion', a);

			var a = {};
			a.title = 'Engagement';
			a.value = '456,789';
			a.benchmark = 3.6;
			a.rate = 3.4; 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-engagement', a);

			a = {}
			a.title = 'Clickthrough';
			a.value = '321,465';
			a.benchmark = 8;
			a.rate = 8.3; 
			a.max = g.getMax(a.rate, a.benchmark);

			g.initialize('.gauge-clickthrough', a);
		}

		this.initselect = function(){
			$('.selectpicker').selectpicker();
		}

		this.render = function () {
           		this.$el.html(uTpl(data));
            	return this;
          	};

          this.initialize();
      };
});