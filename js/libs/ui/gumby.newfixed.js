/**
* Gumby Fixed
*/
!function() {

	'use strict';

	function Fixed($el) {
		this.$el = $el;
		this.fixedPoint = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ['fixed']));
		this.pinPoint = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ['pin']));
		this.state = false;

		var scope = this;
		$(window).scroll(function() {
			scope.monitorScroll();
		});
	}

	// monitor scroll and trigger changes based on position
	Fixed.prototype.monitorScroll = function() {
		var scrollAmount = $(window).scrollTop(),
			// recalculate selector attributes as position may have changed
			fixedPoint = this.fixedPoint instanceof jQuery ? this.fixedPoint.offset().top : this.fixedPoint;

		// fix it
		if((scrollAmount >= fixedPoint) && this.state !== 'fixed') {
			this.fix();

		// unfix it
		} else if(scrollAmount < fixedPoint && this.state === 'fixed') {
			this.unfix();
		}
	};

	// fix the element and update state
	Fixed.prototype.fix = function() {
		this.state = 'fixed';
		this.$el.css({
			'position' : 'fixed',
			'top' : 0
		}).addClass('fixed');
	};

	// unfix the element and update state
	Fixed.prototype.unfix = function() {
		this.state = 'unfixed';
		this.$el.css({
			'position' : 'inherit',
			'top' : 'auto'
		}).removeClass('fixed');
	};

	Fixed.prototype.pin = function() {
		
	};

	// parse attribute values, could be px, top, selector
	Fixed.prototype.parseAttrValue = function(attr) {
		// px value fixed point
		if($.isNumeric(attr)) {
			return Number(attr);
		// 'top' string fixed point
		} else if(attr === 'top') {
			return this.$el.offset().top;
		// selector specified
		} else {
			var $el = $(attr);
			return $el;
		}
	};

	// add initialisation
	Gumby.addInitalisation('fixed', function() {
		$('[data-fixed],[gumby-fixed],[fixed]').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isFixed')) {
				return true;
			}
			// mark element as initialized
			$this.data('isFixed', true);
			new Fixed($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'fixed',
		events: ['onFixed', 'onUnfixed'],
		init: function() {
			Gumby.initialize('fixed');
		}
	});
}();
