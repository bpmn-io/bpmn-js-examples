import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import { 
  createElement,
  createParameters,
  getParameters,
  getParametersExtension,
  nextId
} from '../util';

import ParameterProps from './ParameterProps';

import { without } from 'min-dash';


export default function ParametersProps({ element, injector }) {

  const parameters = getParameters(element) || [];

  const bpmnFactory = injector.get('bpmnFactory'),
        commandStack = injector.get('commandStack');

  const items = parameters.map((parameter, index) => {
    const id = element.id + '-parameter-' + index;

    return {
      id,
      label: parameter.get('name') || '',
      entries: ParameterProps({
        idPrefix: id,
        element,
        parameter
      }),
      autoFocusEntry: id + '-name',
      remove: removeFactory({ commandStack, element, parameter })
    };
  });

  return {
    items,
    add: addFactory({ element, bpmnFactory, commandStack })
  };
}

function removeFactory({ commandStack, element, parameter }) {
  return function(event) {
    event.stopPropagation();

    const extension = getParametersExtension(element);

    if (!extension) {
      return;
    }

    const parameters = without(extension.get('values'), parameter);

    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: extension,
      properties: {
        values: parameters
      }
    });
  };
}

function addFactory({ element, bpmnFactory, commandStack }) {
  return function(event) {
    event.stopPropagation();

    const commands = [];

    const businessObject = getBusinessObject(element);

    let extensionElements = businessObject.get('extensionElements');

    // (1) ensure extension elements
    if (!extensionElements) {
      extensionElements = createElement(
        'bpmn:ExtensionElements',
        { values: [] },
        businessObject,
        bpmnFactory
      );

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: businessObject,
          properties: { extensionElements }
        }
      });
    }

    // (2) ensure parameters extension
    let extension = getParametersExtension(element);

    if (!extension) {
      extension = createParameters({
        values: []
      }, extensionElements, bpmnFactory);

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: extensionElements,
          properties: {
            values: [ ...extensionElements.get('values'), extension ]
          }
        }
      });
    }

    // (3) create parameter
    const newParameter = createElement('magic:Parameter', {
      name: nextId('Parameter_'),
      value: ''
    }, extension, bpmnFactory);

    // (4) add parameter to list
    commands.push({
      cmd: 'element.updateModdleProperties',
      context: {
        element,
        moddleElement: extension,
        properties: {
          values: [ ...extension.get('values'), newParameter ]
        }
      }
    });

    commandStack.execute('properties-panel.multi-command-executor', commands);
  };
}
