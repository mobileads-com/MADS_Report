define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Handlebars = require('handlebars'),
	// customReportAdapter = require('adapters/custom-report'),
	uHtml = require('text!tpl/CustomReport.html'),

	// bootstraptable = require('bootstraptable'),
	// tableexport = require('tableexport'),
	jqueryexport = require('jqueryexport'),
	jquerysort = require('jquerysort'),

	tablesaw = require('tablesaw'),
	tablepager = require('table_pager'),

	bootstrapselect = require('bootstrap_select'),
	moment = require('moment'),
	bootstrapdatepicker = require('bootstrap_datepicker'),

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


			//used for modifying total data on the table headers
			$('#table-data > thead > tr > th:nth-child(2)').empty().append('Impressions <p>'+ report.impressions +'</p>');
			$('#table-data > thead > tr > th:nth-child(3)').empty().append('Expansions <p>'+ report.expansion + ' ('+ getRate(report.expansion) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(4)').empty().append('Engagement <p>'+ report.engagement + ' ('+ getRate(report.engagement) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(5)').empty().append('Clickthrough <p>'+ report.clickthrough + ' ('+ getRate(report.clickthrough) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(6)').empty().append('Type 1 <p>'+ report.engagementType[0].type1 + ' ('+ getRate(report.engagementType[0].type1) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(7)').empty().append('Type 2 <p>'+ report.engagementType[1].type2 + ' ('+ getRate(report.engagementType[1].type2) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(8)').empty().append('Type 3 <p>'+ report.engagementType[2].type3 + ' ('+ getRate(report.engagementType[2].type3) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(9)').empty().append('Type 4 <p>'+ report.engagementType[3].type4 + ' ('+ getRate(report.engagementType[3].type4) + '%) </p>');
			$('#table-data > tbody').empty();
			$.each(report.data, function(index, val) {
				$('#table-data > tbody').append('<tr>\
						<td class="text-center">'+ val.date +' </td>\
						<td class="text-right">'+ val.impressions +'</td>\
						<td class="text-right">'+ val.expansion +' ('+ getRate(val.expansion) + '%)</td>\
						<td class="text-right">'+ val.engagement +' ('+ getRate(val.engagement) + '%)</td>\
						<td class="text-right">'+ val.clickthrough +' ('+ getRate(val.clickthrough) + '%)</td>\
						<td class="text-right">'+ val.type1 + ' ('+ getRate(val.type1) + '%)</td>\
						<td class="text-right">'+ val.type2 + ' ('+ getRate(val.type2) + '%)</td>\
						<td class="text-right">'+ val.type3 + ' ('+ getRate(val.type3) + '%)</td>\
						<td class="text-right">'+ val.type4 + ' ('+ getRate(val.type4) + '%)</td>\
					</tr>'
				);
			});
			
			/**
			* IMPLEMENT CUSTOM TABLE PAGINATION
			* PARAMS : pagerSelector - element, perPage - records count to display
			*/
			$('#table-data > tbody').pageMe({ pagerSelector:'#table-pager', showPrevNext:true,hidePageNumbers:false, perPage:5 });
			//refresh the table to implement tablesaw responsive
			$('#table-data').table().data( "table" ).refresh();

			//table sorter initialization
			$('#table-data').tablesorter();
			// $('#table-data').trigger('refreshWidgets', [false, false]);
			//
			$('#btnExcel').on('click', function(){
				$('#table-data').tableExport({type:'excel',escape:'false'})
			});

			function getRate(value){
				var rate = value / report.impressions * 100;
				return rate.toFixed(2);
			}
		}

		this.initdonut = function(report){
			var data = [];
			//Loop through the data and push to the new array to suit names and labels
			$.each(report, function(index, val) {
				var a = {};
				var i = index + 1;
				a.label = 'Type '+ i;
				a.data = val['type'+ i];
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

		this.initgauge = function(report){
			$('.impressions-total').text(report.impressions);

			//the gauge object
			var gauge = function(){}

			//used for gauge initialization
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
						display : false,
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

			//used to get max value of a given two value or number
			gauge.prototype.getMax = function(r, b){
				r = parseFloat(r);
				b = parseFloat(b);
				if(r == b){
					return r + 1;
				}else{
					return Math.ceil(Math.max(r, b));
				}
			}

			gauge.prototype.getRate = function(value){
				var rate = value / report.impressions * 100;
				return rate;
			}

			gauge.prototype.getBenchmark = function(value){
				var benchmark = value / report.impressions * 100;
				return benchmark;
			}

			
			
			var g = new gauge();

			//Initialization of gauge for expansion data
			var a = {};
			a.title = 'Expansion';
			a.value = report.expansion;
			a.benchmark = g.getBenchmark(report.expansion); 
			a.rate = g.getRate(report.expansion); 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-expansion', a);

			//Initialization of gauge for engagement data
			var a = {};
			a.title = 'Engagement';
			a.value = report.engagement;
			a.benchmark = g.getBenchmark(report.engagement);
			a.rate = g.getRate(report.engagement); 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-engagement', a);

			//Initialization of gauge for clickthrough data
			a = {}
			a.title = 'Clickthrough';
			a.value = report.clickthrough;
			a.benchmark = g.getBenchmark(report.clickthrough); 
			a.rate = g.getRate(report.clickthrough); 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-clickthrough', a);
		}

		this.initselect = function(options){
			//selectpicker object
			var select = function (){
				$('.selectpicker').selectpicker();
			}

			//used to loop through array of data and populate selectpicker
			select.prototype.populate = function(obj, selection){
				$(obj).empty();
				$.each(selection, function(index, val) {
					$(obj).append('<option value="'+ val.value +'">'+ val.title +'</option>');
				});
				$(obj).selectpicker('refresh');
			}

			
			var s = new select();
			//feed the data to the selectpickers.
			s.populate('#cboAdvertiser', options.advertiser);
			s.populate('#cboCampaign', options.campaign);
			s.populate('#cboCreatives', options.creative);
		}

		//Initialization of the datepicker
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