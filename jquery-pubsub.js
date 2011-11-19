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
 * $.subscribe('eventName', handler);
 * $.publish('eventName', handlerArgs);
 * $.unsubscribe('eventName');
 */

/*global define*/

define('pubsub', ['jquery', '$document', 'proxied-events'], function ($, $document, proxiedEvents) {
	'use strict';

	var $o = $({});

	function isProxiedEvent(item) {
		return $.inArray(item, proxiedEvents) !== -1;
	}

	$.subscribe = function (topic) {
		$o.on.apply($o, arguments);

		if (isProxiedEvent(topic)) {
			$document.on(topic, function () {
				$.publish.apply(this, [topic, Array.prototype.slice.call(arguments, 1)]);
			});
		}
	};

	$.unsubscribe = function (topic) {
		$o.off.apply($o, arguments);

		if (isProxiedEvent(topic)) {
			$document.off(topic);
		}
	};

	$.publish = function () {
		$o.trigger.apply($o, arguments);
	};
});