# PUBSUB

A simple pub/sub implementation for jQuery served as a module.


## Usage

There are two ways to subscribe to events.


### Subscribe


#### Events and Handlers

The following example shows taking a topic/event name and a handler function.
The handler can be either a delegate method or anonymous function.

``` javascript
require(['pubsub'], function (pubsub) {
	pubsub.subscribe('/my/custom/event', handler);

	// or

	pubsub.subscribe('jQueryEvent', handler);
});
```


#### Events, Selectors, and Handlers

The following example will handle the click event of the anchor tag.
The handler can be either a delegate method or anonymous function.

``` javascript
require(['pubsub'], function (pubsub) {
	pubsub.subscribe('click', 'a', handler);
});
```


### Publish

Extra arguments may be provided when publishing events:

``` javascript
require(['pubsub'], function (pubsub) {
	pubsub.publish('/my/custom/event');

	// or

	pubsub.publish('jQueryEvent');

	// or

	pubsub.publish('/my/custom/event', args);

	// or

	pubsub.publish('jQueryEvent', args);
});
```

Click events, for example, will be published automatically.


### Unsubscribe

Unsubscribing events can be accomplished in two ways, unsubscribe the topic completely, or unsubscribe a handler from the topic.

``` javascript
require(['pubsub'], function (pubsub) {
	pubsub.unsubscribe('/my/custom/event');

	// or

	pubsub.unsubscribe('jQueryEvent');

	// or to unsubscribe a single handler for the topic,
	// leaving others remaining, use:

	pubsub.unsubscribe('/my/custom/event', handler);

	// or

	pubsub.unsubscribe('jQueryEvent', handler);
});
```


## Versioning

For transparency and insight into our release cycle, and for striving to maintain backwards compatibility, this module will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the follow format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on SemVer, please visit http://semver.org/.


## Bug tracker

Have a bug?  Please create an issue here on GitHub!

https://github.com/CaryLandholt/pubsub/issues


## Author

**Cary Landholt**

+ http://twitter.com/CaryLandholt
+ http://github.com/CaryLandholt


## License

Copyright 2012 Cary Landholt

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.