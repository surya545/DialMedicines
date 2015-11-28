/*! http://mths.be/customholder v2.0.7 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'customholder' in document.createElement('input'),
	    isTextareaSupported = 'customholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    customholder;

	if (isInputSupported && isTextareaSupported) {

		customholder = prototype.customholder = function() {
			return this;
		};

		customholder.input = customholder.textarea = true;

	} else {

		customholder = prototype.customholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[customholder]')
				.not('.customholder')
				.bind({
					'focus.customholder': clearcustomholder,
					'blur.customholder': setcustomholder
				})
				.data('customholder-enabled', true)
				.trigger('blur.customholder');
			return $this;
		};

		customholder.input = isInputSupported;
		customholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('customholder-enabled') && $element.hasClass('customholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('customholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the customholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setcustomholder.call(element);
					}
				} else if ($element.hasClass('customholder')) {
					clearcustomholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.customholder', function() {
				// Clear the customholder values so they don't get submitted
				var $inputs = $('.customholder', this).each(clearcustomholder);
				setTimeout(function() {
					$inputs.each(setcustomholder);
				}, 10);
			});
		});

		// Clear customholder values upon page reload
		$(window).bind('beforeunload.customholder', function() {
			$('.customholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearcustomholder(event, value) {
		var input = this,
		    $input = $(input);
		if (input.value == $input.attr('customholder') && $input.hasClass('customholder')) {
			if ($input.data('customholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('customholder-id'));
				// If `clearcustomholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('customholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setcustomholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('customholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'customholder-password': true,
							'customholder-id': id
						})
						.bind('focus.customholder', clearcustomholder);
					$input
						.data({
							'customholder-textinput': $replacement,
							'customholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('customholder');
			$input[0].value = $input.attr('customholder');
		} else {
			$input.removeClass('customholder');
		}
	}

}(this, document, jQuery));
