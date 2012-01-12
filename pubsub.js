/*!
 * pubsub
 * Version:  1.2.0
 * Source:  https://github.com/CaryLandholt/pubsub
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
 * Dependencies
 * https://github.com/jrburke/requirejs
 * https://github.com/jquery/jquery
 * https://github.com/CaryLandholt/doc
 *
 * Usage
 * http://jsfiddle.net/carylandholt/ke79e/
 * subscribe('topic', handler);
 * publish('topic', handlerArgs);
 * unsubscribe('topic');
 */

/*global define*/

define(['jquery', 'doc'], function ($, $doc) {
	'use strict';

	// treat topics with a preceeding slash as a custom event
	function isCustomEvent(topic) {
		return topic.charAt(0) === '/';
	}

	var $o = $({}),
		pubsub = {
			subscribe: function (topic) {
				if (!isCustomEvent(topic)) {
					if (arguments.length >= 3) {
						$doc.on.apply($doc, arguments);
					} else {
						$doc.on(topic, function () {
							pubsub.publish.apply(this, [topic, Array.prototype.slice.call(arguments, 1)]);
						});
					}
				}

				$o.on.apply($o, arguments);
			},

			unsubscribe: function (topic) {
				if (!isCustomEvent(topic)) {
					$doc.off.apply($doc, arguments);
				}

				$o.off.apply($o, arguments);
			},

			publish: function () {
				$o.trigger.apply($o, arguments);
			}
		};

	return pubsub;
});