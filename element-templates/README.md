# bpmn-js Modeler + element templates Example


## About
<!-- Points:
  * Explain: currently no custom element templates provider, need to use C7/C8 providers
  * Explain:
    - ElementTemplatesLoader handles loading of templates. 
    - There is no template chooser UI built in the properties panel. This needs to be added on top: see example [@bpmn-io/element-template-chooser](https://github.com/bpmn-io/element-template-chooser)
  * Compare to custom elements, when to use what
  * Link to element template documentation
 -->


```javascript
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule
} from 'bpmn-js-properties-panel'


var bpmnModeler = new BpmnModeler({
  container: canvas,
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    ElementTemplatesPropertiesProviderModule,
  ]
})

bpmnModeler.get('elementTemplatesLoader').setTemplates(templates)

```

## Building the Example

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) and installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the example using [webpack](https://webpack.js.org/) via

```
npm run all
```

Both tasks generate the distribution ready client-side modeler application into the `public` folder.

Serve the application locally or via a web server (nginx, apache, embedded).
