define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Handlebars = require('handlebars'),
	// customReportAdapter = require('adapters/custom-report'),
	uHtml = require('text!tpl/CustomReport.html'),

	bootstraptable = require('bootstraptable'),
	tableexport = require('tableexport'),
	jqueryexport = require('jqueryexport'),

	tablesaw = require('tablesaw'),
	tablepager = require('table-pager'),

	bootstrapselect = require('select/bootstrap-select.min'),
	moment = require('moment'),
	bootstrapdatepicker = require('datepicker/bootstrap-datetimepicker.min'),

	jqueryflot = require('flot'),
	jqueryflotpie = require('flotpie'),
	jqueryflotresize = require('flotresize'),

	raphael = require('raphael'),
	gauge = require('kumagauge'),

	

	uTpl= Handlebars.compile(uHtml);

	return function (data) {
		this.initialize = function () {
			this.$el = $('<div/>');
		};
		
		this.inittable = function(report) {
			$('#table-data > thead > tr > th:nth-child(2)').empty().append('Impressions <p>'+ report.impressions +'</p>');
			$('#table-data > thead > tr > th:nth-child(3)').empty().append('Expansions <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(4)').empty().append('Engagement <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(5)').empty().append('Clickthrough <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(6)').empty().append('Type 1 <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(7)').empty().append('Type 2 <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(8)').empty().append('Type 3 <p>123, 246 (2.4%)</p>');
			$('#table-data > thead > tr > th:nth-child(9)').empty().append('Type 4 <p>123, 246 (2.4%)</p>');
			$('#table-data > tbody').empty();
			$.each(report.data, function(index, val) {
				$('#table-data > tbody').append('<tr>\
						<td>'+ val.date +'</td>\
						<td>'+ val.impressions +'</td>\
						<td>'+ val.expansion +'</td>\
						<td>'+ val.engagement +'</td>\
						<td>'+ val.clickthrough +'</td>\
						<td>'+ val.type1 +'</td>\
						<td>'+ val.type2 +'</td>\
						<td>'+ val.type3 +'</td>\
						<td>'+ val.type4 +'</td>\
					</tr>'
				);
			});

			// $('#table-data').bootstrapTable({
			// 	data: report.data,
			// 	pagination: true,
			// 	showExport: true,
			// 	exportDataType: 'basic',
			// 	exportTypes: ['excel'],
			// 	buttonsAlign: 'left'
			// });

			// $('.bootstrap-table').find('.pagination-detail').addClass('hidden');
			
			$('#table-data > tbody').pageMe({pagerSelector:'#table-pager',showPrevNext:true,hidePageNumbers:false,perPage:4});
			$('#btnExcel').on('click', function(){
				$('#table-data').tableExport({type:'excel',escape:'false'})
			});
			// Tablesaw.config = {
			// 	swipe: {
			// 		horizontalThreshold: 20, // default is 15
			// 		verticalThreshold: 40 // default is 30
			// 	}
			// };
		}

		this.initdonut = function(report){

			var data = []
			$.each(report, function(index, val) {
				var a = {};
				a.label = val.name;
				a.data = val.value;
				data.push(a);
			});

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

		this.initgauge = function(report, imp){
			var gauge = function(){

			}

			gauge.prototype.initialize = function(ele, data){
				$(ele).kumaGauge({
					min: 0,
					max: data.max,
					value : data.rate,
					fill : '#F34A53',
					gaugeBackground : '#1E4147',
					gaugeWidth : 30,
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
				
				$('.gauge').find('svg').attr('class', 'center-block');
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

			$('.impressions-total').text(imp);
			
			var g = new gauge();

			var a = {};
			a.title = 'Expansion';
			a.value = report.expansion.value;
			a.benchmark = report.expansion.benchmark;
			a.rate = report.expansion.rate; 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-expansion', a);

			var a = {};
			a.title = 'Engagement';
			a.value = report.engagement.value;
			a.benchmark = report.engagement.benchmark;
			a.rate =  report.engagement.rate;
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-engagement', a);

			a = {}
			a.title = 'Clickthrough';
			a.value = report.clickthrough.value;
			a.benchmark = report.clickthrough.benchmark;
			a.rate = report.clickthrough.rate; 
			a.max = g.getMax(a.rate, a.benchmark);

			g.initialize('.gauge-clickthrough', a);
		}

		this.initselect = function(options){
			var select = function (){
				$('.selectpicker').selectpicker();
			}

			select.prototype.populate = function(obj, selection){
				$(obj).empty();
				$.each(selection, function(index, val) {
					$(obj).append('<option value="'+ val.value +'">'+ val.title +'</option>');
				});
				$(obj).selectpicker('refresh');
			}

			
			var s = new select();

			s.populate('#cboAdvertiser', options.advertiser);
			s.populate('#cboCampaign', options.campaign);
			s.populate('#cboCreatives', options.creative);
		}

		this.initdatepicker = function(){
			$('#txtDate').datetimepicker({
				format : 'MM/DD/YYYY',
				useCurrent : true,
				defaultDate : moment()
			});
		}

		this.render = function () {
           		this.$el.html(uTpl(data));
            	return this;
          	};

          this.initialize();
      };
});