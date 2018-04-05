# Custom Modeling Rules

This example shows how to implement custom modeling rules in [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## About

This example extends the [bpmn-js](https://github.com/bpmn-io/bpmn-js) modeler with custom modeling rules.

The rules are added via a [custom rules provider](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-modeling-rules/lib/custom-rules/CustomRules.js). The provider hooks into the rule evaluation for `shape.create` and restricts it to elements annotated with a `vendor:allowDrop` extension attribute.

```javascript
this.addRule('shape.create', function(context) {

  var shape = context.shape,
      target = context.parent;

  var shapeBo = shape.businessObject,
      targetBo = target.businessObject;

  var allowDrop = targetBo.get('vendor:allowDrop');

  if (!allowDrop || !shapeBo.$instanceOf(allowDrop)) {
    return false;
  }
});
```

Using these custom rules users are able to insert tasks on the following sequence flow:

```xml
<bpmn:sequenceFlow id="SequenceFlow_1" vendor:allowDrop="bpmn:Task" />
```

They would not be able to insert anything if the `allowDrop` annotation is missing:

```xml
<bpmn:sequenceFlow id="SequenceFlow_1"/>
```

To learn more, check out [an example diagram](https://github.com/bpmn-io/bpmn-js-examples/blob/master/custom-modeling-rules/test/spec/diagram.bpmn) and the accompanying [test cases](https://github.com/bpmn-io/bpmn-js-examples/blob/custom-rules/custom-modeling-rules/test/spec/CustomRulesSpec.js).


## Building

One time installation of all dependencies via [npm](https://npmjs.org):

```
npm install
```


Execute the test suite to spin up the example in your browser:

```
npm run dev
```

Go to [localhost:9876/debug.html](http://localhost:9876/debug.html) to inspect the example in your Browser.


## License

MIT