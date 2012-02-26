/*global require*/

(function (require) {
	'use strict';

	require.config({
		paths: {
			doc: 'core/doc',
			document: 'core/document',
			jquery: 'libs/jquery',
			pubsub: '../../pubsub',
			qunit: 'patches/qunit-module-patch',
			'qunit-official': 'libs/qunit',
			win: 'core/win',
			window: 'core/window'
		}
	});

	require(['tests']);
}(require));