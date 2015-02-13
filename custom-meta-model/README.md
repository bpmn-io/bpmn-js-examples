# custom-meta-model example

This example showcases how to provide a meta model extensions for BPMN 2.0 to [bpmn-js](https://github.com/bpmn-io/bpmn-js).

This allows a BPMN viewer / modeler instance to read, create and write domain specific data from and to BPMN 2.0 files.


## About

This example allows bpmn-js to attach review data in form of `<qa:analysis />` tags to BPMN 2.0 diagrams.
It captures the suitability of process elements according to current requirements and can be edited through a BPMN 2.0 viewer.

![edit suitability score](https://github.com/bpmn-io/bpmn-js-examples/raw/master/custom-meta-model/resources/screenshot.png)

An example diagram containing the custom data is shown below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
                   xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                   xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                   xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                   xmlns:qa="http://some-company/schema/bpmn/qa"
                   targetNamespace="http://activiti.org/bpmn"
                   id="ErrorHandling">
  <bpmn2:process id="Process_1">
    <bpmn2:task id="Task_1" name="Examine Situation" qa:suitable="0.7">
      <bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
      <bpmn2:extensionElements>
        <qa:analysisDetails lastChecked="2015-01-20" nextCheck="2015-07-15">
          <qa:comment author="Klaus">
            Our operators always have a hard time to figure out, what they need to do here.
          </qa:comment>
          <qa:comment author="Walter">
            I believe this can be split up in a number of activities and partly automated.
          </qa:comment>
        </qa:analysisDetails>
      </bpmn2:extensionElements>
    </bpmn2:task>
    ...
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    ...
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
```

See [the complete diagram](https://github.com/bpmn-io/bpmn-js-examples/tree/master/custom-meta-model/resources/sample.bpmn).


## Usage

This section leads you through the necessary steps to extend bpmn-js with a custom meta-model.


### Building a meta-model extension

An extension to BPMN 2.0 must be defined in a JSON file, as shown [here](https://github.com/bpmn-io/bpmn-js-examples/tree/master/custom-meta-model/resources/qa.json).

```json
{
  "name": "QualityAssurance",
  "uri": "http://some-company/schema/bpmn/qa",
  "prefix": "qa",
  "xml": {
    "tagAlias": "lowerCase"
  },
  "types": [
    {
      "name": "AnalyzedNode",
      "extends": [
        "bpmn:FlowNode"
      ],
      "properties": [
        {
          "name": "suitable",
          "isAttr": true,
          "type": "Float"
        }
      ]
    },
    {
      "name": "AnalysisDetails",
      "superClass": [ "Element" ],
      "properties": [
        {
          "name": "lastChecked",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "nextCheck",
          "isAttr": true,
          "type": "String"
        },
        {
          "name": "comments",
          "isMany": true,
          "type": "Comment"
        }
      ]
    },
    ...
  ],
  ...
}
```

A few things are worth noting here:

* You can provide extensions for existing types via the `extends: [ "list", "of", "types" ]` property.
* Custom types that should plug into BPMN 2.0 `<extensionElements />` feature must be subclass `Element`

To use the extension in a bpmn-js powered viewer we need to configure it during viewer instantiation.


### Configuring bpmn-js

The extension needs to be passed over to a bpmn-js instance.

```javascript
var qaPackage = require('path/to/qaPackage.json');

var BpmnJS = require('bpmn-js');

var viewer = new BpmnJS({
  moddleExtensions: {
    qa: qaPackage
  }
});
```

It is passed over to [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) for model creation.


### Accessing the model data

The bpmn-viewer is now aware of your meta model extension.

You may search through an elements `<bpmn:extensionElements />` list for it by type and
extract the required information from it.

```javascript
function getExtension(element, type) {
  if (!element.extensionElements) {
    return null;
  }

  return element.extensionElements.filter(function(e) {
    return e.$instanceOf(type);
  })[0];
}
```

You may now register a click listener that shows the analytical data attached to a bpmn element:

```javascript
viewer.on('element.click', function(event) {
  var element = event.element,
      moddle = viewer.get('moddle'),

      // the underlaying BPMN 2.0 element
      businessObject = element.businessObject,
      analysis,
      score,
      message;

  analysis = getExtension(businessObject, 'qa:AnalysisDetails');
  score = businessObject.suitable;

  if (isNaN(score)) {
    message = 'No suitability score yet, dblclick to assign one';
  } else {
    message = 'Diagram element has a suitability score of ' + score;
  }

  if (analysis) {
    message += '\n Last analyzed at ' + analysis.lastChecked;
  }

  window.alert(message);
});
```

Alternatively you can also create a new instance of your extension defined data types:

```javascript
viewer.on('element.click', function(event) {

  ...

  analysis = getExtension(businessObject, 'qa:AnalysisDetails');

  var result = parseFloat(window.prompt('assign a new suitability score to ' + businessObject.id), 10);

  if (isNaN(result)) {
    return;
  }

  businessObject.suitable = result;

  if (!analysis) {
    analysis = moddle.create('qa:AnalysisDetails');

    if (!businessObject.extensionElements) {
      businessObject.extensionElements = moddle.create('bpmn:ExtensionElements');
    }

    businessObject.extensionElements.get('values').push(analysis);
  }

  analysis.lastChecked = new Date().toString();
});
```


## Build the Example

First time setup:

```
npm install
```

Building the application into the `dist` directory:

```
grunt
```


## License

MIT