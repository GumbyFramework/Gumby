/**
* Gumby FitText
*
* Adapted from the awesome FitText jQuery plugin
* brought to you by Paravel - http://paravelinc.com/
*/
!function() {

	'use strict';

	function FitText($el) {
		this.$el = $el;
		// compressor rate
		this.rate = Gumby.selectAttr.apply(this.$el, ['rate']) || 1;
		// parse font sizes (min|max)
		this.fontSizes = this.parseSizes(Gumby.selectAttr.apply(this.$el, ['sizes']));
	}

	FitText.prototype.resize = function() {
		this.$el.css('font-size', this.calculateSize());
	};

	FitText.prototype.calculateSize = function() {
		return Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize));
	};

	FitText.prototype.parseSizes = function(attrStr) {
		console.log(attrStr);
	};

	// add initialisation
	Gumby.addInitalisation('checkboxes', function() {
		$('.checkbox').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isCheckbox')) {
				return true;
			}
			// mark element as initialized
			$this.data('isCheckbox', true);
			new Checkbox($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'checkbox',
		events: ['onCheck', 'onUncheck', 'onChange', 'check', 'uncheck'],
		init: function() {
			Gumby.initialize('checkboxes');
		}
	});
}();
