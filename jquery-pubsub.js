/*!
 * jquery-pubsub
 * Version:  1.1.0
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
 *
 * Dependencies
 * jQuery
 * https://github.com/CaryLandholt/doc
 * https://github.com/CaryLandholt/proxied-events
 */

/*global define*/

define(['jquery', 'doc', 'proxied-events'], function ($, $doc, proxiedEvents) {
	'use strict';

	proxiedEvents = proxiedEvents || [];

	function isProxiedEvent(item) {
		return $.inArray(item, proxiedEvents) !== -1;
	}

	var $o = $({}),
		pubsub = {
			subscribe: function (topic) {
				$o.on.apply($o, arguments);

				if (isProxiedEvent(topic)) {
					$doc.on(topic, function () {
						pubsub.publish.apply(this, [topic, Array.prototype.slice.call(arguments, 1)]);
					});
				}
			},

			unsubscribe: function (topic) {
				$o.off.apply($o, arguments);

				if (isProxiedEvent(topic)) {
					$doc.off(topic);
				}
			},

			publish: function () {
				$o.trigger.apply($o, arguments);
			}
		};

	return pubsub;
});