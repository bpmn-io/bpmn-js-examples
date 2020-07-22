function fn(modeler) {
  /**
   * After creating a new instance of bpmn-js you can access any module of bpmn-js using
   * modeler#get.
   *
   * The modules used in this example are:
   *
   * * ElementFactory: Creates new shapes and connections.
   * * ElementRegistry: A registry of all shapes and connections of the diagram.
   * * Modeling: The main module for modeling.
   *
   * We will use these modules to create a new shape, add it to the diagram, and
   * connect it to an existing shape.
   */

  // (1) Get the modules
  const elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) Get the existing process and the start event
  const process = elementRegistry.get('Process_1'),
        startEvent = elementRegistry.get('StartEvent_1');

  // (3) Create a new diagram shape
  const task = elementFactory.createShape({ type: 'bpmn:Task' });

  // (4) Add the new task to the diagram
  modeling.createShape(task, { x: 400, y: 100 }, process);

  // You can now access the new task through the element registry
  console.log(elementRegistry.get(task.id)); // Shape { "type": "bpmn:Task", ... }

  // (5) Connect the existing start event to new task
  modeling.connect(startEvent, task);
}

export default {
  id: 'introduction',
  name: 'Introduction',
  description: 'An introduction to the modules of bpmn-js that can be used to create and connect shapes.',
  fn
};