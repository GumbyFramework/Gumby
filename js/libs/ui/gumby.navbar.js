/**
* Gumby Navbar
*/
!function() {

	'use strict';

	// define and init module on touch enabled devices only
	if(!Modernizr.touch) {
		return;
	}

	function Navbar($el) {
		this.$el = $el;
		var scope = this;

		// when navbar items are tapped hide/show dropdowns
		this.$el.find('li').on('tap', function(e) {
			// prevent click from triggering here too
			e.stopImmediatePropagation();
			e.preventDefault();

			var $this = $(this);

			// we have dropdowns so open/cose
			if($this.children('.dropdown').length) {
				if($this.hasClass('active')) {
					$this.removeClass('active');
				} else {
					$this.addClass('active');
				}
			}
		});
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
			Gumby.initialize('navbars');
		}
	});
}();
