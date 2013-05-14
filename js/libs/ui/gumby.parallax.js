/**
* Gumby Parallax
*/
!function() {

	'use strict';

	function Parallax($el) {

		this.$el = $el;
		this.$holder = $(window);
		this.ratio = Number(Gumby.selectAttr.apply(this.$el, ['parallax'])) || 1;
		this.offset = Number(Gumby.selectAttr.apply(this.$el, ['offset'])) || 0;

		// calculate starting bg position
		this.startPos = ((this.$el.offset().top - this.offset) * this.ratio) * -1;

		var scope = this;

		// set starting position of background image
		this.setPosition();

		this.$holder.scroll(function() {
			scope.scroll();
		});

		// this should update windows that load scrolled
		this.scroll();
	}

	// update bg position based on scroll and parallax ratio
	Parallax.prototype.scroll = function() {
		this.setPosition(this.startPos + (this.$holder.scrollTop() * this.ratio));
	};

	// set background y axis position with 50% x axis
	Parallax.prototype.setPosition = function(yPos) {
		this.$el.css('backgroundPosition', '50% '+yPos+'px');
	};

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
