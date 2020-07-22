import diagram from '../../resources/editingElements.bpmn';

function fn(modeler) {
  /**
   * Now, let's have a look at how you can edit existing elements.
   *
   * The modules used in this example are:
   *
   * * BpmnFactory: Creates new business objects.
   * * ElementRegistry: A registry of all shapes and connections of the diagram.
   * * Modeling: The main module for modeling.
   *
   * We will use these modules to update the properties of two existing shapes.
   */

  // (1) Get the modules
  const bpmnFactory = modeler.get('bpmnFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) Get the shapes
  const startEvent = elementRegistry.get('StartEvent_1'),
        exclusiveGateway = elementRegistry.get('ExclusiveGateway_1'),
        sequenceFlow = elementRegistry.get('SequenceFlow_3'),
        task = elementRegistry.get('Task_1');

  // (3) Change the start event's `name` property using `updateProperties`
  modeling.updateProperties(startEvent, { name: 'Foo' });

  // (4) Change the `defaultFlow` property of a gateway
  modeling.updateProperties(exclusiveGateway, {
    default: sequenceFlow.businessObject
  });

  // (5) Change a task to be multi-instance
  const multiInstanceLoopCharacteristics = bpmnFactory.create('bpmn:MultiInstanceLoopCharacteristics');

  modeling.updateProperties(task, {
    loopCharacteristics: multiInstanceLoopCharacteristics
  });
}

export default {
  id: 'editingElements',
  name: 'Editing Elements',
  description: 'How to edit existing elements.',
  diagram,
  fn
};