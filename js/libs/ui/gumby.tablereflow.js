/**
* Gumby TableReflow
*/
!function($) {

	'use strict';

	function TableReflow($el) {

		Gumby.debug('Initializing TableReflow', $el);

		this.$el = $el;
		this.cellLabels = "ui-table-cell-label";


		var scope = this;

		scope.refresh();
		scope.updateReflow();
	}

	TableReflow.prototype.getAttribute = function( element, key ) {
		var data;

		element = element.jquery ? element[0] : element;

		if ( element && element.getAttribute ) {
			data = element.getAttribute( "gumby-" + key );
		}

		// Copied from core's src/data.js:dataAttr()
		// Convert from a string to a proper data type
		try {
			data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? JSON.parse( data ) :
				data;
		} catch( err ) {}

		return data;
	}

	TableReflow.prototype.setHeaders = function() {
		var trs = this.$el.find( "thead tr" );

		this.headers = this.$el.find( "tr:eq(0)" ).children();
		this.allHeaders = this.headers.add( trs.children() );
	}

	TableReflow.prototype.refresh = function( /* create */ ) {
		var table = this.$el,
			trs = table.find( "thead tr" );

		// updating headers on refresh (fixes #5880)
		this.setHeaders();

		// Iterate over the trs
		trs.each( function() {
			var columnCount = 0;

			// Iterate over the children of the tr
			$( this ).children().each( function() {
				var span = parseInt( this.getAttribute( "colspan" ), 10 ),
					selector = ":nth-child(" + ( columnCount + 1 ) + ")",
					j;

				this.setAttribute( "gumby-" + "colstart", columnCount + 1 );

				if ( span ) {
					for( j = 0; j < span - 1; j++ ) {
						columnCount++;
						selector += ", :nth-child(" + ( columnCount + 1 ) + ")";
					}
				}

				// Store "cells" data on header as a reference to all cells in the
				// same column as this TH
				$( this ).data( "cells", table.find( "tr" ).not( trs.eq( 0 ) ).not( this ).children( selector ) );

				columnCount++;
			});
		});
	}

	TableReflow.prototype.updateReflow = function() {
		var table = this;

		// get headers in reverse order so that top-level headers are appended last
		$( table.allHeaders.get().reverse() ).each( function() {
			var cells = $( this ).data( "cells" ),
				colstart = table.getAttribute( this, "colstart" ),
				hierarchyClass = cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
				text = $( this ).text(),
				iteration, filter;

				if ( text !== ""  ) {

					if ( hierarchyClass ) {
						iteration = parseInt( this.getAttribute( "colspan" ), 10 );
						filter = "";

						if ( iteration ) {
							filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
						}

						table.addLabels( cells.filter( filter ), table.cellLabels + hierarchyClass, text );
					} else {
						table.addLabels( cells, table.cellLabels, text );
					}

				}
		});
	}

	TableReflow.prototype.addLabels = function( cells, label, text ) {
        cells.not( ":has(b." + label + ")" ).prepend( "<b class='" + label + "'>" + text + "</b>"  );
    };

	Gumby.addInitalisation('tablereflow', function() {
		$('.reflow').each(function() {
			var $this = $(this);
			// this element has already been initialized
			if($this.data('isReflow')) {
				return true;
			}
			// mark element as initialized
			$this.data('isReflow', true);
			new TableReflow($this);
		});
	});

	// register UI module
	Gumby.UIModule({
		module: 'tablereflow',
		events: ['initialize'],
		init: function() {
			Gumby.initialize('tablereflow');
		}
	});



}(jQuery);