function fn(modeler) {
  /**
   * Now that we have created our first shapes let's create some more complex shapes.
   *
   * The modules used in this example are:
   *
   * * BpmnFactory: Creates new business objects.
   * * ElementFactory: Creates new shapes and connections.
   * * ElementRegistry: A registry of all shapes and connections of the diagram.
   * * Modeling: The main module for modeling.
   *
   * We will use these modules to create some more shapes including a BoundaryEvent and
   * a SubProcess.
   */

  // (1) Get the modules
  const bpmnFactory = modeler.get('bpmnFactory'),
        elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) Get the existing process and the start event
  const process = elementRegistry.get('Process_1'),
        startEvent = elementRegistry.get('StartEvent_1');

  // (3) Create a service task shape
  const serviceTask = elementFactory.createShape({ type: 'bpmn:ServiceTask' });

  // (4) Add the new service task shape to the diagram using `appendShape` to connect it to an existing
  // shape
  modeling.appendShape(startEvent, serviceTask, { x: 400, y: 100 }, process);

  // (5) Create a boundary event shape
  const boundaryEvent = elementFactory.createShape({ type: 'bpmn:BoundaryEvent' });

  // (6) Add the new boundary event to the diagram attaching it to the service task
  modeling.createShape(boundaryEvent, { x: 400, y: 140 }, serviceTask, { attach: true });

  // (7) Create an event sub process business object
  const eventSubProcessBusinessObject = bpmnFactory.create('bpmn:SubProcess', {
    triggeredByEvent: true,
    isExpanded: true
  });

  // (8) Create the SubProcess shape, set the previously created event sub process business object
  const eventSubProcess = elementFactory.createShape({
    type: 'bpmn:SubProcess',
    businessObject: eventSubProcessBusinessObject,
    isExpanded: true
  });

  // (9) Add the event sub process to the diagram
  modeling.createShape(eventSubProcess, { x: 300, y: 400 }, process);

  // (10) Create a timer start event specifying `eventDefinitionType` so an event definition will
  // be added
  const timerStartEvent = elementFactory.createShape({
    type: 'bpmn:StartEvent',
    eventDefinitionType: 'bpmn:TimerEventDefinition'
  });

  // (11) Add the new timer start event to the diagram specifying the event sub process as the target
  // so the event will be a child of it
  modeling.createShape(timerStartEvent, { x: 200, y: 400 }, eventSubProcess);

  // (12) Finally, create a new group shape specifying width and height
  const group = elementFactory.createShape({ type: 'bpmn:Group', width: 400, height: 200 });

  // (13) Add the new group to the diagram
  modeling.createShape(group, { x: 325, y: 100 }, process);

  // (14) Create two shapes specifying x and y which will be treated as relative
  // coordinates, not absolute
  const messageStartEvent = elementFactory.createShape({
    type: 'bpmn:StartEvent',
    eventDefinitionType: 'bpmn:MessageEventDefinition',
    x: 0,
    y: 22
  });

  const userTask = elementFactory.createShape({
    type: 'bpmn:UserTask',
    x: 100,
    y: 0
  });

  // (15) Add multiple shapes to the diagram
  modeling.createElements([ messageStartEvent, userTask ], { x: 300, y: 600 }, process);
}

export default {
  id: 'creatingShapes',
  name: 'Creating Shapes',
  description: 'Creating more complex shapes.',
  fn
};