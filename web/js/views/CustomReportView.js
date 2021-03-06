define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Handlebars = require('handlebars'),
	reportdataadapter = require('adapters/custom-report'),
	memorydataadapter = require('adapters/custom-report-memory'),
	uHtml = require('text!tpl/CustomReport.html'),

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
		//the gauge object
		var gauge = function(){}

		//used for gauge initialization
		gauge.prototype.initialize = function(ele, data){
			$(ele).kumaGauge({
				min: 0,
				max: data.max,
				value : data.rate, //located on the middle of the gauge
				fill : '#F34A53',
				gaugeBackground : '#1E4147',
				gaugeWidth : 30,
				showNeedle : true,
				needleHeight : 85,
				actualValue : { // the value, located at the bottom of the gauge, just below the title
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
					value : data.benchmark, // located on top of the gauge
					fontFamily : 'Arial',
					fontColor : '#000',
					fontSize : 20, 
					fontWeight : 'normal',
				},
				title : { // to indicate if gauge is for eng, exp and ct
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

		//function to get rate
		gauge.prototype.getRate = function(value, impressions){

			if(value < 1){ return 0; }
			var rate = value / impressions * 100;
			if(!isFinite(rate)){ return 0; }
			return rate.toFixed(2);
		}

		//function to get benchmark value
		gauge.prototype.getBenchmark = function(value, impressions){
			if(value < 1){ return 0; }
			var benchmark = value / impressions * 100;
			return benchmark.toFixed(2);
		}

		//used to update gauge data
		gauge.prototype.update = function(ele, type, impressions){ //type = exp, eng or ct
			var _this = this;
			var benchmark = _this.getBenchmark(type, impressions);
			var rate = _this.getRate(type, impressions);
			$(ele).kumaGauge('update', {
				min : 0,
				max : _this.getMax( rate,  benchmark),
				value : rate,
				actualValue : { value : type, display : true },
				benchmark : { value : benchmark, display : true }
			});
		}

		//donut object
		var donut = function(data, obj){
			var placeholder = $(obj);
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

		this.initialize = function () { this.$el = $('<div/>'); };
		
		this.inittable = function(report) {
			// report.data = [];
			var g = new gauge();
			//used for modifying total data on the table headers
			$('#table-data > thead > tr > th:nth-child(2)').empty().append('<p class="head-label">Impressions</p> <p class="head-value">'+ report.impressions +'</p>');
			$('#table-data > thead > tr > th:nth-child(3)').empty().append('<p class="head-label">Expansions</p> <p class="head-value">'+ report.expansion + ' ('+ g.getRate(report.expansion, report.impressions) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(4)').empty().append('<p class="head-label">Engagement</p> <p class="head-value">'+ report.engagement + ' ('+ g.getRate(report.engagement, report.impressions) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(5)').empty().append('<p class="head-label">Clickthrough</p> <p class="head-value">'+ report.clickthrough + ' ('+ g.getRate(report.clickthrough, report.impressions) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(6)').empty().append('<p class="head-label">Type 1</p> <p class="head-value">'+ report.engagementType[0].type1 + ' ('+ g.getRate(report.engagementType[0].type1, report.impressions) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(7)').empty().append('<p class="head-label">Type 2</p> <p class="head-value">'+ report.engagementType[1].type2 + ' ('+ g.getRate(report.engagementType[1].type2, report.impressions) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(8)').empty().append('<p class="head-label">Type 3</p> <p class="head-value">'+ report.engagementType[2].type3 + ' ('+ g.getRate(report.engagementType[2].type3, report.impressions) + '%) </p>');
			$('#table-data > thead > tr > th:nth-child(9)').empty().append('<p class="head-label">Type 4</p> <p class="head-value">'+ report.engagementType[3].type4 + ' ('+ g.getRate(report.engagementType[3].type4, report.impressions) + '%) </p>');
			$('#table-data > tbody').empty();

			if(report.data.length > 0){
				$.each(report.data, function(index, val) {
					$('#table-data > tbody').append('<tr>\
						<td class="text-center">'+ val.date +' </td>\
						<td class="text-right">'+ val.impressions +'</td>\
						<td class="text-right">'+ val.expansion +' ('+ g.getRate(val.expansion, report.impressions) + '%)</td>\
						<td class="text-right">'+ val.engagement +' ('+ g.getRate(val.engagement, report.impressions) + '%)</td>\
						<td class="text-right">'+ val.clickthrough +' ('+ g.getRate(val.clickthrough, report.impressions) + '%)</td>\
						<td class="text-right">'+ val.type1 + ' ('+ g.getRate(val.type1, report.impressions) + '%)</td>\
						<td class="text-right">'+ val.type2 + ' ('+ g.getRate(val.type2, report.impressions) + '%)</td>\
						<td class="text-right">'+ val.type3 + ' ('+ g.getRate(val.type3, report.impressions) + '%)</td>\
						<td class="text-right">'+ val.type4 + ' ('+ g.getRate(val.type4, report.impressions) + '%)</td>\
						</tr>'
					);
				});

				$('.data-export a').on('click', function(){
					var type = $(this).closest('li').attr('data-type');
					$('#table-data').tableExport({type: type ,escape:'false', fileName : 'table-report'});
				});
				$('.data-export').removeClass('hidden');
				$('#table-data').table().data( "table" ).refresh();
				$('.tablesaw-bar').removeClass('hidden');
			}else{
				$('#table-data > tbody').append('<tr>\
					<td class="text-center" colspan="10">No data to display</td>\
					</tr>'
				);
				$('.data-export').addClass('hidden');
				$('#table-data').table().data( "table" ).refresh();
				$('.tablesaw-bar').addClass('hidden');
			}

			/**
			* IMPLEMENT CUSTOM TABLE PAGINATION
			* PARAMS : pagerSelector - element, perPage - records count to display
			*/
			$('#table-pager').empty();
			$('#table-data > tbody').pageMe({ pagerSelector:'#table-pager', showPrevNext:true,hidePageNumbers:false, perPage:5 });

			//refresh the table to implement tablesaw responsive
			// $('#table-data').table().data( "table" ).refresh();

			//table sorter initialization
			$('#table-data').tablesorter();
		}

		this.initdonut = function(report, obj){
			var data = [];
			//Loop through the data and push to the new array to suit names and labels
			$.each(report, function(index, val) {
				var a = {};
				var i = index + 1;
				a.label = 'Type '+ i;
				a.data = val['type'+ i];
				data.push(a);
			});
			var d = new donut(data, obj);
		}	

		this.initgauge = function(report){
			$('.impressions-total').text(report.impressions);

			var g = new gauge();

			//Initialization of gauge for expansion data
			var a = {};
			a.title = 'Expansion';
			a.value = report.expansion;
			a.benchmark = g.getBenchmark(report.expansion, report.impressions); 
			a.rate = g.getRate(report.expansion, report.impressions); 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-expansion', a);

			//Initialization of gauge for engagement data
			var a = {};
			a.title = 'Engagement';
			a.value = report.engagement;
			a.benchmark = g.getBenchmark(report.engagement, report.impressions);
			a.rate = g.getRate(report.engagement, report.impressions); 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-engagement', a);

			//Initialization of gauge for clickthrough data
			a = {};
			a.title = 'Clickthrough';
			a.value = report.clickthrough;
			a.benchmark = g.getBenchmark(report.clickthrough, report.impressions); 
			a.rate = g.getRate(report.clickthrough, report.impressions); 
			a.max = g.getMax(a.rate, a.benchmark);
			g.initialize('.gauge-clickthrough', a);
		}

		this.initselect = function(){
			var filters;
			//selectpicker object
			var select = function (){
				$('.selectpicker').selectpicker();
			}

			//used to loop through array of data and populate selectpicker
			select.prototype.populate = function(obj, selection){
				$(obj).empty().append('<option value="0"> Select '+ $(obj).attr('data-type') +'</option>');
				$.each(selection, function(index, val) {
					$(obj).append('<option value="'+ val.value +'">'+ val.title +'</option>');
				});
				$(obj).selectpicker('refresh');
			}

			//apply filter to bootstrap select
			select.prototype.filter = function(obj, selection, filter_object, id){
				var o = $(obj).val();
				$(filter_object).empty().append('<option value="0"> Select '+ $(filter_object).attr('data-type') +'</option>');
				$.each(selection, function(index, val) {
					if(o != 0){
						if(val[id] == o){
							$(filter_object).append('<option value="'+ val.value +'">'+ val.title +'</option>');
						}
					}else{
						$(filter_object).append('<option value="'+ val.value +'">'+ val.title +'</option>');
					}
				});
				$(filter_object).selectpicker('refresh');
			}

			reportdataadapter.getFilterOptions().done(function(res){
				filters = res;
				var s = new select();
				//feed the data to the selectpickers.
				s.populate('#cboAdvertiser', res.advertiser);
				s.populate('#cboCampaign', res.campaign);
				s.populate('#cboCreatives', res.creative);
			}).fail(function(){
				$('#cboAdvertiser, #cboCampaign, #cboCreatives').empty().append('<option value="0"> No data found</option>');
				$('.selectpicker').selectpicker('refresh');
				$('.button-submit').prop('disabled', true);
				alert('Error in connecting with the server.');
			});

			$('#cboAdvertiser').on('change', function(){
				select.prototype.filter('#cboAdvertiser', filters.campaign, '#cboCampaign', 'advertiser_id');
			});

			$('#cboCampaign').on('change', function(){
				select.prototype.filter('#cboCampaign', filters.creative, '#cboCreatives', 'campaign_id');
			});
		}

		//Initialization of the datepicker
		this.initdatepicker = function(){
			$('#txtDateFrom').daterangepicker({
				autoApply: false,
				locale: {
					format: 'MMMM DD, YYYY'
				},
				startDate: moment().subtract(1, 'days'),
				endDate: moment(),
				opens : 'left',
				ranges: {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				}
			});
		}

		this.events = function(){
			var _this = this;
			$('.rangepicker i').click(function() {
				$(this).parent().find('input').click();
			});

			//form submit to fetch data to be feed to the elements/components and update
			$('#form-data').on('submit', function(){
				var options = {
					'pubUserId' : $('#cboAdvertiser').val(),
					'campaignId' : $('#cboCampaign').val(),
					'studioId' : $('#cboCreatives').val(),
					'startDate' : $('#txtDateFrom').data('daterangepicker').startDate.format('YYYY-MM-DD'),
					'endDate' : $('#txtDateFrom').data('daterangepicker').endDate.format('YYYY-MM-DD')
				}
				reportdataadapter.getCustomReport(options).done(function(data){
					_this.initdonut(data.engagementType, '#donut');
					_this.inittable(data);
				  	gauge.prototype.update('.gauge-expansion', data.expansion, data.impressions);
					gauge.prototype.update('.gauge-engagement', data.engagement, data.impressions);
					gauge.prototype.update('.gauge-clickthrough', data.clickthrough, data.impressions);
					$('.impressions-total').text(data.impressions);
				}).fail(function(){
					alert('An exception was encountered while fetching data.');
				});
				return false;
			});
		}

		this.render = function () {
			this.$el.html(uTpl(data));
			return this;
		};

		this.chart = function(){
			var _this = this;
			var options = {
				'pubUserId' : $('#cboAdvertiser').val(),
				'campaignId' : $('#cboCampaign').val(),
				'studioId' : $('#cboCreatives').val(),
				'startDate' : $('#txtDateFrom').data('daterangepicker').startDate.format('YYYY-MM-DD'),
				'endDate' : $('#txtDateFrom').data('daterangepicker').endDate.format('YYYY-MM-DD')
			}
			memorydataadapter.getCustomReport(options).done(function(data){
				_this.inittable(data);
				_this.initdonut(data.engagementType, '#donut');
				_this.initgauge(data);
			});
		}

		this.initialize();
	}; 
});