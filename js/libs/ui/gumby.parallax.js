/**
* Gumby Parallax
*/
!function() {

	'use strict';

	function Parallax($el) {

		this.$el = $el;

		var scope = this;

		// set starting position of background image
		this.$el.css('backgroundPosition', '50% '+(this.$el.offset().top * -1)+'px');
	}

	// add initialisation
	Gumby.addInitalisation('parallax', function() {
		// wait for window to load as this could effect position of element
		$(window).load(function() {
			setTimeout(function() {
				$('.parallax').each(function() {
					var $this = $(this);
					// this element has already been initialized
					if($this.data('isParallax')) {
						return true;
					}
					// mark element as initialized
					$this.data('isParallax', true);
					new Parallax($this);
				});
			}, 200);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'parallax',
		events: [],
		init: function() {
			Gumby.initialize('parallax');
		}
	});
}();
