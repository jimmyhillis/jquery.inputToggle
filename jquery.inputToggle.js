/*
// Simple jQuery plugin that remembers the initial state
// of the value (on page load) and reverts back to it when
// a user blurs and doesn't have any content within the form
*/
(function( $ ) {

	// Private methods
	var placeholderSupport
		, hideDefault
		, showDefault;

	// Check for HTML5 form "placeholder" support, a better
	// solution for the whole problem
	placeholderSupport = function() {
		var input_element = document.createElement('input');
		return ('placeholder' in input_element);
	}

	// If the current value matches the default, remove it.
	hideDefault = function() { 
		if($(this).val() === $(this).attr('data-initialvalue')) {
			$(this).val('');
		}
	}
	// If the current input value is empty (space)
	// then put the default back in
	showDefault = function() {
		if(/^(\s)*$/i.test($(this).val())) {
			$(this).val($(this).attr('data-initialvalue'));
		}
	}

	// Create inputToggle public space and allow for
	// options. Run initial functionality to set the 
	// default values and bind listeners to events.
  $.fn.inputToggle = function(options) {
  	options = options || {};
		return this.each(function() {
			if (placeholderSupport()) {
				$(this).attr('placeholder', $(this).val());
				$(this).val('');
			} 
			else {
				// Set the initial value to be stored in the elements data-
				$(this).attr('data-initialvalue', $(this).val());
				// On focus if the default is set remove it
				$(this).bind('focus', hideDefault);
				// On focus if there is no value provided, set it as default
				$(this).bind('blur', showDefault);
			}
		});
	};
})( jQuery );