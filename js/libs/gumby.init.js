/**
* Gumby Init
*/

// test for Windows Phone
Modernizr.addTest('windowsphone', function() {
	return window.navigator.userAgent.indexOf("Windows Phone") > 0; 
});

// test for touch event support
Modernizr.load({
	test: Modernizr.touch || Modernizr.windowsphone,

	// if present load custom jQuery mobile build and update Gumby.click
	yep: Gumby.path+'/jquery.mobile.custom.min.js',
	callback: function(url, result, key) {
		// check jQuery mobile has successfully loaded before using tap events
		if($.mobile) {
			window.Gumby.click += ' tap';
		}
	},

	// either way initialize Gumby
	complete: function() {
		window.Gumby.init();

		// if AMD return Gumby object to define
		if(typeof define == "function" && define.amd) {
			define(window.Gumby);
		}
	}
});
