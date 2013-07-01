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
		this.$el.find('li:has(.dropdown)').on('tap', function(e) {
			// prevent click from triggering here too
			e.stopImmediatePropagation();
			e.preventDefault();

			var $this = $(this);

			if($this.hasClass('active')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}

		// swiping right opens link
		}).on('swiperight', this.openLink)

		// append open link icon 
		.children('a').append('<i class="icon-export"></i>').children('i')

		// and bind to click event to open link
		.on('tap', this.openLink);
	}

	// handle opening list item link 
	Navbar.prototype.openLink = function(e) {
		e.stopImmediatePropagation();
		e.preventDefault();

		var $this = $(this),
			$el, href;

		// tapped icon
		if($this.is('i')) {
			$el = $this.parent('a');
		// swiped li
		} else if($this.is('li')) {
			$el = $this.children('a');
		}

		href = $el.attr('href');

		// open in new window
		if($el.attr('target') == 'blank') {
			window.open(href);
		// regular relocation
		} else {
			window.location = href;
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
			Gumby.initialize('navbars');
		}
	});
}();
