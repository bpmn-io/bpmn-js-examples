# NOT FINISHED

# bpmn-js custom element

This example shows how to add custom elements to BPMN diagrams rendered with [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## About

This example shows how to add custom elements to your BPMN diagram, while also providing rules and custom *business* data updating.

![demo application screenshot](https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/colors/screenshot.png "Screenshot of the example application")


## Usage Summary

Include [bpmn-js](https://github.com/bpmn-io/bpmn-js) via [Bower](https://github.com/bpmn-io/bpmn-js-examples/tree/master/simple-bower) or [CommonJS](https://github.com/bpmn-io/bpmn-js-examples/tree/master/simple-commonjs) and set it up:


```javascript
var diagramXML = 'put your BPMN 2.0 process XML here';

var viewer = new BpmnJS({ container: '#diagram' });
```

## Run this Example

Fetch dependencies:

```
npm install

grunt auto-build
```

## License

MIT
