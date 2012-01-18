/*global require*/

(function (require) {
	'use strict';

	require.config({
		paths: {
			doc: 'doc/doc',
			document: 'document/document',
			jquery: 'jquery-build/dist/jquery',
			pubsub: '../pubsub',
			'qunit-official': 'qunit/qunit/qunit',
			qunit: 'qunit-module-patch/qunit-module-patch',
			window: 'window/window'
		}
	});

	require(['tests']);
}(require));