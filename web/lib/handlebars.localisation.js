// Handlebars Localisation Helper
// Source: https://gist.github.com/tracend/3261055
Handlebars.registerHelper('lang', function(keyword) {
	var lang = (navigator.userLanguage) ? navigator.userLanguage : navigator.language; 

	// pick the right dictionary (if only one available assume it's the right one...)
    console.log(window); console.log(window.locale);
	var locale = window.locale[lang] || window.locale['en-US'] || window.locale || false;

	// exit now if there's no data
	if( !locale ) return target;
	
	// loop through all the key hierarchy (if any)
	var target = locale;
	var key = keyword.split(".");
	for (i in key){
		target = target[key[i]];
	
	}
	// fallback to the original string if nothing found
	target = target || keyword;	
	//output
	return target;
});