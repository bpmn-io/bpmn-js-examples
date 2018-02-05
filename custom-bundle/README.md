# custom-bundle example

How to role a customized, pre-packaged version of [bpmn-js](https://github.com/bpmn-io/bpmn-js).

__Note:__ This is an __advanced__ topic.

## About

This example extends the [bpmn-js](https://github.com/bpmn-io/bpmn-js) viewer via custom modules and shows how [browserify](https://browserify.org) can be used to generate a UMD bundle of that custom viewer.


## In a Nutshell

Create a sub-class of `Viewer` or `Modeler`, depending on which variant you
would like to extend:

```javascript
var inherits = require('inherits');

var Viewer = require('bpmn-js/lib/Viewer');


/**
 * A viewer that includes mouse navigation and other goodies.
 *
 * @param {Object} options
 */
function CustomViewer(options) {
  Viewer.call(this, options);
}

inherits(CustomViewer, Viewer);

module.exports = CustomViewer;
```

Add additional modules to your custom bpmn-js prototype:

```javascript

CustomViewer.prototype._customModules = [
  require('diagram-js/lib/navigation/zoomscroll'),
  require('diagram-js/lib/navigation/movecanvas'),
  require('./features/logging')
];

CustomViewer.prototype._modules = [].concat(
  Viewer.prototype._modules,
  CustomViewer.prototype._customModules
);
```

Package the file as UMD for the browser, using you favourite module bundled
(e.g. [browserify](https://browserify.org) or Webpack).

```
browserify src/custom-viewer.js -o dist/custom-viewer.bundled.js --standalone=CustomBpmnJS
```

Include the bundle in your webpage, as you would include our [pre-package distributions](../pre-packaged):

```html
<script src="dist/custom-viewer.bundled.js"></script>
<script>
  var viewer = new CustomBpmnJS({
    container: '#canvas'
  });

  // ...
</script>
```


## Build this Example

```
npm install
npm run all
```


## License

MIT
