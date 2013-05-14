/**
* Gumby Parallax
*/
!function() {

	'use strict';

	function Parallax($el) {

		this.$el = $el;
		var scope = this;
	}

	// add initialisation
	Gumby.addInitalisation('parallax', function() {
		$('.parallax').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isParallax')) {
				return true;
			}
			// mark element as initialized
			$this.data('isParallax', true);
			new Checkbox($this);
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
