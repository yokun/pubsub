/*!
 * jquery-pubsub
 * Version:  1.0.0
 * Source:  https://github.com/CaryLandholt/jquery-pubsub
 *
 * Respectfully taken from Ben Alman's Gist https://gist.github.com/661855
 * Added variable naming convention and JSLint options
 * jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL
 *
 * https://github.com/CaryLandholt
 * https://twitter.com/CaryLandholt
 *
 * Description
 * A simple pub/sub implementation
 *
 * Usage
 * http://jsfiddle.net/carylandholt/ke79e/
 */

/*global jQuery*/

(function ($) {
	'use strict';

	var $o = $({});

	$.subscribe = function () {
		$o.on.apply($o, arguments);
	};

	$.unsubscribe = function () {
		$o.off.apply($o, arguments);
	};

	$.publish = function () {
		$o.trigger.apply($o, arguments);
	};
}(jQuery));