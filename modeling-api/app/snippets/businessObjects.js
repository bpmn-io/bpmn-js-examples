function fn(modeler) {
  /**
   * Business objects are the model objects that hold all the BPMN-related properties of a shape or
   * connection. They can be accessed through an element's `businessObject` property. Not all model
   * objects are visible as shapes or connections. An event definition for example is a model object
   * that is part of an event shape's business object.
   *
   * The entire BPMN model can be found here: https://github.com/bpmn-io/bpmn-moddle/blob/master/resources/bpmn/json/bpmn.json
   *
   * The modules used in this example are:
   *
   * * BpmnFactory: Creates new business objects.
   * * ElementFactory: Creates new shapes and connections.
   * * ElementRegistry: A registry of all shapes and connections of the diagram.
   * * Modeling: The main module for modeling.
   *
   * We will use these modules to create a new business object representing a shape,
   * add it to the diagram, and connect it to an existing shape.
   */

  // (1) Get the modules
  const bpmnFactory = modeler.get('bpmnFactory'),
        elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) Get the existing process and the start event
  const process = elementRegistry.get('Process_1'),
        startEvent = elementRegistry.get('StartEvent_1');

  // You can access the start event's business object
  console.log(startEvent.businessObject); // { "$type": "bpmn:StartEvent", ... }

  // (3) Instead of relying on the element factory to automatically create a business object use
  // the BPMN factory to create one
  const taskBusinessObject = bpmnFactory.create('bpmn:Task', { id: 'Task_1', name: 'Task' });

  // (4) Create a new diagram shape using the business object you just created
  const task = elementFactory.createShape({ type: 'bpmn:Task', businessObject: taskBusinessObject });

  // (5) Add the new task to the diagram
  modeling.createShape(task, { x: 400, y: 100 }, process);

  // Using the `id` property we specified you can now access the new task through the element registry
  console.log(elementRegistry.get('Task_1')); // Shape { "type": "bpmn:Task", ... }
}

export default {
  id: 'businessObjects',
  name: 'Business Objects',
  description: 'What business objects are and how you can work with them.',
  fn
};