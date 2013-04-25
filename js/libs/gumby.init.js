Modernizr.load({
	test: Modernizr.touch,
	nope: 'js/libs/jquery.mobile.custom.min.js',
	callback: function(url, result, key) {
		if(result) {
			window.Gumby.click = 'tap';
		}
	},
	complete: function() {
		// initialize Gumby
		window.Gumby.init();

		// if AMD return Gumby object to define
		if(typeof define == "function" && define.amd) {
			define(window.Gumby);
		}
	}
});
