/*!
 * pubsub
 * Version:  1.4.0
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
*/
/*global define
*/
define(['jquery', 'doc', 'win'], function($, $doc, $win) {
  'use strict';
  var $o, callback, publish, subscribe, unsubscribe;
  $o = $({});
  callback = function($el, params) {
    return $el.on(params.topic, function(e) {
      return $(params.selector).each(function() {
        e.currentTarget = this;
        return params.handler.call(this, e);
      });
    });
  };
  subscribe = function(topic, selector, handler) {
    var normalizedTopic, params;
    if (arguments.length === 3) {
      normalizedTopic = topic.toLowerCase();
      params = {
        topic: topic,
        selector: selector,
        handler: handler
      };
      if (normalizedTopic === 'ready') return callback($doc, params);
      if (normalizedTopic === 'resize') return callback($win, params);
    }
    $doc.on.apply($doc, arguments);
    return $o.on.apply($o, arguments);
  };
  unsubscribe = function() {
    $doc.off.apply($doc, arguments);
    return $o.off.apply($o, arguments);
  };
  publish = function() {
    return $o.trigger.apply($o, arguments);
  };
  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish
  };
});
