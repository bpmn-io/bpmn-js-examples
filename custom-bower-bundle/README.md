# custom bower bundles

This example shows how to role your own customized [Bower](http://bower.io) bundles of [bpmn-js](https://github.com/bpmn-io/bpmn-js).

__Note:__ This is an __advanced__ topic.


## In a nutshell

Use this project as a blue print. Set everything up via `npm install`.

Append your custom bundles (cf. [`index.js`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-bower-bundle/index.js#L5)):

```javascript
// load additional modules
var additionalModules = [
  require('bpmn-js/lib/features/movecanvas'),
  require('bpmn-js/lib/features/zoomscroll')
];

// add additional (default!) modules to viewer
BpmnViewer.prototype._modules = BpmnViewer.prototype._modules.concat(additionalModules);
```

Expose external dependencies as globals (cf. [`Gruntfile.js`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-bower-bundle/Gruntfile.js#L27)):

```javascript
...
transform: [
  // ensure you expose all your external libraries via their global prefix
  // (jQuery -> window.$, ...)
  [ 'exposify', {
    global: true,
    expose: {
      sax: 'sax',
      snapsvg: 'Snap',
      lodash: '_',
      jquery: '$',
      'jquery-mousewheel': '$'
    }
  } ]
]
...
```


## Build bundle

```
grunt browserify:bower
```


## License

MIT