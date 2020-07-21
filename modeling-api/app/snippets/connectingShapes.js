function fn(modeler) {
  /**
   * Now let's look at the different ways of connecting shapes to each other.
   *
   * The modules used in this example are:
   *
   * * ElementFactory: Creates new shapes and connections.
   * * ElementRegistry: A registry of all shapes and connections of the diagram.
   * * Modeling: The main module for modeling.
   */

  // (1) Get the modules
  const elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) Get the existing process and the start event
  const process = elementRegistry.get('Process_1'),
        startEvent = elementRegistry.get('StartEvent_1');

  // (3) Create a task shape
  const task = elementFactory.createShape({ type: 'bpmn:Task' });

  // (4) Add the new service task shape to the diagram
  modeling.createShape(task, { x: 400, y: 100 }, process);

  // (5) Connect the existing start event to new task using `connect`
  modeling.connect(startEvent, task);

  // (3) Create a end event shape
  const endEvent = elementFactory.createShape({ type: 'bpmn:EndEvent' });

  // (4) Add the new end event shape to the diagram
  modeling.createShape(endEvent, { x: 600, y: 100 }, process);

  // (5) Create a new sequence flow connection that connects the task to the end event
  modeling.createConnection(task, endEvent, { type: 'bpmn:SequenceFlow' }, process);
}

export default {
  id: 'connectingShapes',
  name: 'Connecting Shapes',
  description: 'Various ways of connecting shapes.',
  fn
}