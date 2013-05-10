/**
* Gumby Navbar
*/
!function() {

	'use strict';

	function Navbar($el) {
		this.$el = $el;
		this.$items = this.$el.find('li');

		var scope = this;

		// need to find a way to calculate dropdown height here
		this.$items.filter(':has(.dropdown)').each(function() {

		});

		this.$items.on(Gumby.click, function(e) {
			var $this = $(this);

			// prevent jump to top of page
			if(this.href === '#') {
				e.preventDefault();
			}

			scope.dropdown($this.index());
		});
	}

	// hide/show dropdowns
	Navbar.prototype.dropdown = function(index) {
		var $this = this.$items.eq(index);

		// we have dropdowns so open/cose
		if($this.find('.dropdown').length) {
			if($this.hasClass('active')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
		// no dropdown so close others
		} else {
			this.$items.removeClass('active');
		}
	};

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
