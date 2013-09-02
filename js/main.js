// Gumby is ready to go
Gumby.ready(function() {
	console.log('Gumby is ready to go...', Gumby.debug());

	// placeholder polyfil
	if(Gumby.isOldie || Gumby.$dom.find('html').hasClass('ie9')) {
		$('input, textarea').placeholder();
	}

// Oldie document loaded
}).oldie(function() {
	console.log("This is an oldie browser...");

// Touch devices loaded
}).touch(function() {
	console.log("This is a touch enabled device...");
});

// Document ready
$(function() {
	$('#skip-switch').on('gumby.onComplete', function() {
		$(this).trigger('gumby.trigger');
	});
});

