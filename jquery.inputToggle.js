/*
// Simple jQuery plugin that remembers the initial state
// of the value (on page load) and reverts back to it when
// a user blurs and doesn't have any content within the form
*/

(function( $ ) {
  $.fn.inputToggle = function() {
		return this.each(function() {
			// Set the initial value to be stored in the elements data-
			$(this).attr('data-initialvalue', $(this).val());
			// On focus if the default is set remove it
			$(this).bind('focus', function() {
				if($(this).val() === $(this).attr('data-initialvalue'))
					$(this).val('');
			});
			// On focus if there is no value provided, set it as default
			$(this).bind('blur', function() {
				if($(this).val() === '')
					$(this).val($(this).attr('data-initialvalue'));
			});
		});
	};
})( jQuery );