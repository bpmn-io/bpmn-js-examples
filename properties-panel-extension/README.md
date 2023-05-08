> Extending the properties panel changed significantly with `bpmn-js-properties-panel>=1`. For the `0.x` version of the library, check out [the old version of this example](https://github.com/bpmn-io/bpmn-js-examples/tree/b20919ac2231abf3df45b9dc9a2561010009b4a2/properties-panel-extension).


# Properties Panel Extension Example

This example shows how to extend the [bpmn-js-properties-panel](https://github.com/bpmn-io/bpmn-js-properties-panel) with custom properties.

![properties panel extension screenshot](./docs/screenshot.png "Screenshot of the properties panel extension example")


## About

> If you need more information about setting up take look at the [basic properties example](../properties-panel) first.

In this example we extend the properties panel to allow editing a `magic:spell` property on all start events. To achieve that we will walk through the following steps:

* Add a group called "Black Magic" to contain the property
* Add a "spell" text input field to this group
* Create a new moddle extension

The property `magic:spell` will be persisted as an extension as part of the BPMN 2.0 document:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions ... xmlns:magic="http://magic" id="sample-diagram">
  <bpmn2:process id="Process_1">
    <bpmn2:startEvent id="StartEvent_1" magic:spell="WOOO ZAAAA" />
  </bpmn2:process>
  ...
</bpmn2:definitions>
```


Let us look into all the necessary steps in detail.


### Create a Properties Provider

The first step to a custom property is to create your own `PropertiesProvider`.
The provider defines which properties are available and how they are organized in the panel using tabs, groups and input elements.

We created the [`MagicPropertiesProvider`](app/provider/magic/MagicPropertiesProvider.js) which exposes the "magic" group on top of the existing BPMN properties. Note that we make sure that the group is shown only if a start event is selected.

```javascript
function MagicPropertiesProvider(propertiesPanel, translate) {

  // Register our custom magic properties provider.
  // Use a lower priority to ensure it is loaded after the basic BPMN properties.
  propertiesPanel.registerProvider(LOW_PRIORITY, this);

  ...

  this.getGroups = function(element) {

    ...

    return function(groups) {

      // Add the "magic" group
      if(is(element, 'bpmn:StartEvent')) {
        groups.push(createMagicGroup(element, translate));
      }

      return groups;
    }
  };
}
```


### Define a Group

As part of the properties provider we define the magic group:

```javascript
// Import your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "spell" property.
import spellProps from './parts/SpellProps';

// Create the custom magic group
function createMagicGroup(element, translate) {

  // create a group called "Magic properties".
  const magicGroup = {
    id: 'magic',
    label: translate('Magic properties'),
    entries: spellProps(element)
  };

  return magicGroup
}
```


### Define an Entry

The "spell" entry is defined in [`SpellProps`](app/provider/magic/parts/SpellProps.js). We reuse [`TextFieldEntry`](https://github.com/bpmn-io/properties-panel/blob/main/src/components/entries/TextField.js) to create a text field for the property. The `component` needs to be a Preact component. We use [`htm`](https://github.com/developit/htm) to create a Preact component from a tagged template.

```javascript
import { html } from 'htm/preact';

import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel'

export default function(element) {

  return [
    {
      id: 'spell',
      element,
      component: Spell,
      isEdited: isTextFieldEntryEdited
    }
  ];
}

function Spell(props) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.spell || '';
  }

  const setValue = value => {
    return modeling.updateProperties(element, {
      spell: value
    });
  }

  return html`<${TextFieldEntry}
    id=${ id }
    element=${ element }
    description=${ translate('Apply a black magic spell') }
    label=${ translate('Spell') }
    getValue=${ getValue }
    setValue=${ setValue }
    debounce=${ debounce }
  />`
}
```

You can look into the [`entries`](https://github.com/bpmn-io/properties-panel/blob/main/src/components/entries/index.js) to find many other useful reusable form input components.

### Create a Moddle Extension

The second step to create a custom property is to create a moddle extension so that moddle is aware of our new property "spell". This is important for moddle to write and read BPMN XML containing custom properties. The extension is basically a json descriptor file [magic.json](app/descriptors/magic.json) containing a definition of `bpmn:StartEvent#spell`:

```javascript
{
  "name": "Magic",
  "prefix": "magic",
  "uri": "http://magic",
  "xml": {
    "tagAlias": "lowerCase"
  },
  "associations": [],
  "types": [
    {
      "name": "BewitchedStartEvent",
      "extends": [
        "bpmn:StartEvent"
      ],
      "properties": [
        {
          "name": "spell",
          "isAttr": true,
          "type": "String"
        },
      ]
    },
  ]
}
```

In this file we define the new type `BewitchesStartEvent` which extends the type `bpmn:StartEvent` and adds the "spell" property as an attribute to it.

**Please note**: It is necessary to define in the descriptor which element you want to extend. If you want the property to be valid for all bpmn elements, you can extend `bpmn:BaseElement`:

```javascript
...

{
  "name": "BewitchedStartEvent",
  "extends": [
    "bpmn:BaseElement"
  ],

  ...
},
```


### Plugging Everything together

To ship our custom extension with the properties panel we have to wire both the moddle extension and the properties provider when creating the modeler.

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import magicPropertiesProviderModule from './provider/magic';
import magicModdleDescriptor from './descriptors/magic';

const bpmnModeler = new BpmnModeler({
  container: '#js-canvas',
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    magicPropertiesProviderModule
  ],
  moddleExtensions: {
    magic: magicModdleDescriptor
  }
});
```


## Running the Example

Install all required dependencies:

```
npm install
```

Build and run the project

```
npm start
```


## License

MIT
