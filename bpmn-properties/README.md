# bpmn properties

This example shows how to use [bpmn-js](https://github.com/bpmn-io/bpmn-js) to access BPMN properties behind certain diagram elements.


## About

Each diagram element stores a reference to the underlying BPMN element via the `businessObject` property. The business object is the actual element that gets imported from BPMN 2.0 XML and serialized during export. Use the business object to read and write BPMN specific properties.


#### Reading BPMN Properties

To read BPMN properties, obtain a reference to a diagram elements business object.

```javascript
var elementRegistry = bpmnJS.get('elementRegistry');

var sequenceFlowElement = elementRegistry.get('SequenceFlow_1'),
    sequenceFlow = sequenceFlowElement.businessObject;

sequenceFlow.name; // 'YES'
sequenceFlow.conditionExpression; // ModdleElement { $type: 'bpmn:FormalExpression', ... }
```


#### Writing BPMN properties

To write a BPMN property, simply set it on the business object.

> Check out the [`bpmn.json` meta-model descriptor](https://github.com/bpmn-io/bpmn-moddle/blob/master/resources/bpmn/json/bpmn.json) to learn about BPMN types, their properties and relationships.

```javascript
var moddle = bpmnJS.get('moddle');

// create a BPMN element that can be serialized to XML during export
var newCondition = moddle.create('bpmn:FormalExpression', {
  body: '${ value > 100 }'
});

// write property, no undo support
sequenceFlow.conditionExpression = newCondition;
```

In order to get undo/redo support you need to dispatch the property update through our modeling stack:

```javascript
var modeling = bpmnJS.get('modeling');

modeling.updateProperties(sequenceFlowElement, {
  conditionExpression: newCondition
});
```

> Implement your own [`CommandHandler`](https://github.com/bpmn-io/diagram-js/blob/master/lib/command/CommandHandler.js) to perform more advanced atomic updates.

Both ways will eventually serialize the condition to XML.

To learn more, check out [an example diagram](https://github.com/bpmn-io/bpmn-js-examples/blob/master/bpmn-properties/test/spec/diagram.bpmn) and the accompanying [test cases](https://github.com/bpmn-io/bpmn-js-examples/blob/master/bpmn-properties/test/spec/BpmnPropertiesSpec.js).


## Building

One time installation of all dependencies via [npm](https://npmjs.org):

```
npm install
```


Execute the test suite to spin up the example in your browser:

```
grunt auto-test
```

Go to [localhost:9876/debug.html](http://localhost:9876/debug.html) to inspect the example in your Browser.


## License

MIT