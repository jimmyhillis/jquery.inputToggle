/*
// jQuery plugin that remembers the initial state
// of the value (on page load) and reverts back to it when
// a user blurs and doesn't have any content within the form
*/

/* globals define */

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    }
    else {
        // Browser globals
        factory(window.jQuery);
    }

}(function ($) {
    'use strict';

    /**
     * Check for HTML5 form "placeholder" support, a better
     * solution for the whole problem.
     * @return {null}
     */
    var Placeholder = function (el) {
        var $el = $(el);
        var that = this;
        if (!this._support()) {
            if ($el.val() === '') {
                $el.val($el.attr('placeholder'));
            }
            $el.bind('focus', this.hideDefault);
            $el.bind('blur', this.showDefault);
            // If this el has a form which is clicked, remove
            // the default value before submitting
            $(el.form).on('submit', function () {
                that.hideDefault.call(el)
            });
        }
        return this;
    };

    Placeholder.prototype._support = function () {
        var input_element = document.createElement('input');
        return 'placeholder' in input_element;
    };

    /**
     * If the current value matches the default, remove it.
     * @return {null}
     */
    Placeholder.prototype.hideDefault = function () {
        window.console.log('yeah');
        if($(this).val() === $(this).attr('placeholder')) {
            $(this).val('');
        }
    };

    /**
     * If the current input value is empty (space)
     * then put the default back in
     * @return {null}
     */
    Placeholder.prototype.showDefault = function () {
        if(/^(\s)*$/i.test($(this).val())) {
            $(this).val($(this).attr('placeholder'));
        }
    };

    /**
     * Setup functionality on provided selectors.
     * @return {this}
     */
    $.fn.inputToggle = function () {
        return this.each(function () {
            var ph = new Placeholder(this);
            return ph;
        });
    };

    return $.fn.inputToggle;

}));
