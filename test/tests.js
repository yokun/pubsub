/*global require, test, expect, strictEqual*/

require(['jquery', 'pubsub', 'qunit'], function ($, pubsub) {
	'use strict';

	var subscribe = pubsub.subscribe,
		publish = pubsub.publish,
		unsubscribe = pubsub.unsubscribe;

	test('test correct topic is triggered the correct number of times', function () {
		var topic = 'test/topic',
			topicTriggeredCount = 0;

		expect(4);

		subscribe(topic, function (e) {
			topicTriggeredCount = topicTriggeredCount + 1;
			strictEqual(e.type, topic, 'correct topic was published');
		});

		publish(topic);
		publish(topic);
		strictEqual(topicTriggeredCount, 2, 'topic successfully triggered and handled twice');
		unsubscribe(topic);
		publish(topic);
		strictEqual(topicTriggeredCount, 2, 'topic was triggered three times but handled only twice');
	});

	test('test native jQuery event is triggered and handled', function () {
		var topicTriggeredCount = 0,
			$fixture = $('#qunit-fixture'),
			$a = $('<a/>', {
				'class': 'test'
			}).appendTo($fixture);

		expect(4);

		subscribe('click', 'a.test', function (e) {
			topicTriggeredCount = topicTriggeredCount + 1;
			strictEqual(e.type, 'click', 'correct topic was triggered');
		});

		$a.click();
		$a.click();
		strictEqual(topicTriggeredCount, 2, 'topic successfully triggered and handled twice');
		unsubscribe('click', 'a.test');
		$a.click();
		strictEqual(topicTriggeredCount, 2, 'topic was triggered three times but handled only twice');

		$fixture.empty();
	});

	test('test ability to unsubscribe only one of two handlers', function () {
		var topicTriggeredCount = 0,
			handler1TriggeredCount = 0,
			handler2TriggeredCount = 0,
			$fixture = $('#qunit-fixture'),
			$a = $('<a/>', {
				'class': 'test'
			}).appendTo($fixture);

		function handler1() {
			topicTriggeredCount = topicTriggeredCount + 1;
			handler1TriggeredCount = handler1TriggeredCount + 1;
		}

		function handler2() {
			topicTriggeredCount = topicTriggeredCount + 1;
			handler2TriggeredCount = handler2TriggeredCount + 1;
		}

		subscribe('click', 'a.test', handler1);
		subscribe('click', 'a.test', handler2);

		$a.click();
		$a.click();
		strictEqual(topicTriggeredCount, 4, 'topic successfully triggered and handled four times by two different handlers');
		strictEqual(handler1TriggeredCount, 2, 'handler1 fired two times');
		strictEqual(handler2TriggeredCount, 2, 'handler2 fired two times');
		unsubscribe('click', 'a.test', handler2);
		$a.click();
		strictEqual(topicTriggeredCount, 5, 'topic was handled five times');
		strictEqual(handler1TriggeredCount, 3, 'handler1 was triggered three times');
		strictEqual(handler2TriggeredCount, 2, 'handler2 was triggered twice');

		$fixture.empty();
	});
});