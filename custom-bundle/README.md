# custom-bundle example

How to role a customized, pre-packaged version of [bpmn-js](https://github.com/bpmn-io/bpmn-js).

__Note:__ This is an __advanced__ topic.

## About

This example extends the [bpmn-js](https://github.com/bpmn-io/bpmn-js) viewer via custom modules and shows how [Rollup](https://rollupjs.org) can be used to generate a UMD bundle of that custom viewer.


## In a Nutshell

Create a sub-class of `Viewer` or `Modeler`, depending on which variant you
would like to extend:

```javascript
import inherits from 'inherits';

import Viewer from 'bpmn-js/lib/Viewer';

import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';

import CustomLoggingModule from './features/logging';


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
  ZoomScrollModule,
  MoveCanvasModule,
  CustomLoggingModule
];

CustomViewer.prototype._modules = [].concat(
  Viewer.prototype._modules,
  CustomViewer.prototype._customModules
);
```

Package the file as UMD for the browser, using a module bundler such as [Rollup](https://rollupjs.org/), [Browserify](https://browserify.org) or Webpack.

We're using rollup to bundle the files based on [this configuration](./rollup.config.js):

```
rollup -c
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
