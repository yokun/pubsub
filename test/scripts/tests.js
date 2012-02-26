/*global require, test, expect, strictEqual*/

require(['jquery', 'pubsub', 'qunit'], function ($, pubsub) {
	'use strict';

	var subscribe = pubsub.subscribe,
		publish = pubsub.publish,
		unsubscribe = pubsub.unsubscribe;

	test('test correct topic is triggered the correct number of times', 4, function () {
		var topic = 'test/topic',
			topicTriggeredCount = 0;

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

	test('test native jQuery event is triggered and handled', 4, function () {
		var topicTriggeredCount = 0,
			$fixture = $('#qunit-fixture'),
			$a = $('<a/>', {
				'class': 'test'
			}).appendTo($fixture);

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
		unsubscribe('click', 'a.test', handler1);

		$fixture.empty();
	});

	test('unsubscribe with only the topic should unsubscribe all handlers bound to that topic', 15, function () {
		var testTriggeredCount = 0,
			test1TriggeredCount = 0,
			test2TriggeredCount = 0;

		function handler1() {
			testTriggeredCount = testTriggeredCount + 1;
			test1TriggeredCount = test1TriggeredCount + 1;
		}

		function handler2() {
			testTriggeredCount = testTriggeredCount + 1;
			test2TriggeredCount = test2TriggeredCount + 1;
		}

		subscribe('/test', handler1);
		subscribe('/test', handler2);

		publish('/test');
		strictEqual(testTriggeredCount, 2, 'topic was handled by two different handlers');
		strictEqual(test1TriggeredCount, 1, 'topic was handled by handler1');
		strictEqual(test2TriggeredCount, 1, 'topic was handled by handler2');

		testTriggeredCount = 0;
		test1TriggeredCount = 0;
		test2TriggeredCount = 0;
		unsubscribe('/test', handler1);
		publish('/test');
		strictEqual(testTriggeredCount, 1, 'topic was handled by one handler');
		strictEqual(test1TriggeredCount, 0, 'topic should not be handled by handler1 after it was unsibscribed');
		strictEqual(test2TriggeredCount, 1, 'topic was handled by handler2');

		testTriggeredCount = 0;
		test1TriggeredCount = 0;
		test2TriggeredCount = 0;
		unsubscribe('/test', handler2);
		publish('/test');
		strictEqual(testTriggeredCount, 0, 'topic was handled by no handlers');
		strictEqual(test1TriggeredCount, 0, 'topic should not be handled by handler1 after it was unsibscribed');
		strictEqual(test2TriggeredCount, 0, 'topic should not be handled by handler2 after it was unsibscribed');

		subscribe('/test', handler1);
		subscribe('/test', handler2);

		testTriggeredCount = 0;
		test1TriggeredCount = 0;
		test2TriggeredCount = 0;
		publish('/test');
		strictEqual(testTriggeredCount, 2, 'topic was handled by two different handlers');
		strictEqual(test1TriggeredCount, 1, 'topic was handled by handler1');
		strictEqual(test2TriggeredCount, 1, 'topic was handled by handler2');

		testTriggeredCount = 0;
		test1TriggeredCount = 0;
		test2TriggeredCount = 0;
		unsubscribe('/test');
		publish('/test');
		strictEqual(testTriggeredCount, 0, 'topic was should not be handled by any handlers - the whole topic was unsubscribed');
		strictEqual(test1TriggeredCount, 0, 'topic should not be handled by handler1');
		strictEqual(test2TriggeredCount, 0, 'topic should not be handled by handler2');
	});
});