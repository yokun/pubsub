/*global require*/

(function (require) {
	'use strict';

	require.config({
		paths: {
			pubsub: '../pubsub'
		}
	});

	require(['tests']);
}(require));