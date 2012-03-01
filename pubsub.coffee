###!
 * pubsub
 * Version:  1.3.0
 * Source:  https://github.com/CaryLandholt/pubsub
 *
 * Copyright (c) 2012 Cary Landholt
 * https://github.com/CaryLandholt
 * https://twitter.com/CaryLandholt
 *
 * Description
 * A simple pub/sub implementation
 *
 * Dependencies
 * https://github.com/CaryLandholt/doc
 * https://github.com/jquery/jquery
 * https://github.com/jrburke/requirejs
 * https://github.com/CaryLandholt/win
###

###global define###

define ['jquery', 'doc', 'win'], ($, $doc, $win) ->
	'use strict'

	$o = $ {}

	callback = ($el, params) ->
		$el.on params.topic, (e) ->
			$(params.selector).each () ->
				e.currentTarget = @

				params.handler.call @, e

	subscribe = (topic, selector, handler) ->
		if arguments.length is 3
			normalizedTopic = topic.toLowerCase()
			params = {topic, selector, handler}

			return callback $doc, params if normalizedTopic is 'ready'
			return callback $win, params if normalizedTopic is 'resize'
		
		$doc.on.apply $doc, arguments
		$o.on.apply $o, arguments
	
	unsubscribe = ->
		$doc.off.apply $doc, arguments
		$o.off.apply $o, arguments
	
	publish = ->
		$o.trigger.apply $o, arguments
	
	subscribe: subscribe
	unsubscribe: unsubscribe
	publish: publish