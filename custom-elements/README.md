# custom elements

> Advanced example. Works with [bpmn-js](https://github.com/bpmn-io/bpmn-js) version v0.12.

This example shows how custom element support can be added to [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## About

This example creates a custom BPMN modeler that can display and add custom shapes to BPMN 2.0 diagrams.

The renderer ships with custom rules that define which modeling operations are possible on the custom elements.
It can import custom shapes from a [JSON](http://json.org/) descriptor and updates their properties during modeling.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/custom-elements/docs/screenshot.png "bpmn-js custom elements example")


## Usage Summary

The example provides a [custom modeler](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-elements/app/custom-modeler/index.js). After instantiation, the modeler allows you to set and get custom shapes.

```javascript
// set custom elements
var customElements = [
  { type: 'custom:circle', x: 100, y: 300 }
];

customModeler.setCustomElements(customElements);


// get them after modeling
customModeler.getCustomElements(); // all currently existing custom elements
```

The modeler ships with a [module](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-elements/app/custom-modeler/custom/index.js) that provides the following [bpmn-js](https://github.com/bpmn-io/bpmn-js) extensions:

* [`CustomPalette`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-elements/app/custom-modeler/custom/CustomPalette.js): A custom palette that allows you to create custom elements
* [`CustomElementFactory`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-elements/app/custom-modeler/custom/CustomElementFactory.js): A factory that knows about how to create BPMN and custom shapes
* [`CustomRenderer`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-elements/app/custom-modeler/custom/CustomRenderer.js): A renderer that knows how to draw custom elements
* [`CustomRules`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-elements/app/custom-modeler/custom/CustomRules.js): A rule provider that defines the allowed interaction with custom elements
* [`CustomUpdater`](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-elements/app/custom-modeler/custom/CustomUpdater.js): An updater that updates business data while the user interacts with the diagram


## Run this Example

Fetch dependencies:

```
npm install

grunt auto-build
```

## License

MIT
