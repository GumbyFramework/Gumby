/**
* Gumby Navbar
*/
!function() {

	'use strict';

	function Navbar($el) {
		this.$el = $el;
		var scope = this;
	}

	// add initialisation
	Gumby.addInitalisation('navbars', function() {
		$('.navbar').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isNavbar')) {
				return true;
			}
			// mark element as initialized
			$this.data('isNavbar', true);
			new Navbar($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'navbar',
		events: [],
		init: function() {
			// initialize module only if we're on touch devices
			if(Modernizr.touch) {
				Gumby.initialize('navbars');
			}
		}
	});
}();
