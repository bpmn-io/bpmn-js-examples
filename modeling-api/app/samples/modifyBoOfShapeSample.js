export default function loadSample(modeler) {

  /*
  * Retrieve APIs from the modeler instance
  * - elementFactory: a factory for diagram-js shapes
  * - elementRegistry: a registry that keeps track of all shapes in the diagram
  * - modeling: an API to perform BPMN 2.0 modeling operations
  * - canvas: the main drawing canvas
  */
  const elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling'),
        canvas = modeler.get('canvas');

  // Get the root element
  const root = canvas.getRootElement();

  // Get the start Event
  const startEvent = elementRegistry.get('StartEvent_1');

  // Create a task shape
  const task = elementFactory.createShape({
    type: 'bpmn:Task'
  });

  /*
  * Using the businessObject of a shape, we can access and manipulate its BPMN 2.0 XML bpmn-moddle
  * representation. bpmn-moddle defines a meta-model for BPMN 2.0, which defines how the respective
  * XML elements need to be defined and structured to create a valid BPMN 2.0 XML.
  * Using this meta-model, one can see all available properties:
  * cf. https://github.com/bpmn-io/bpmn-moddle/blob/master/resources/bpmn/json/bpmn.json
  * Each shape created using bpmn-js will have a respective businessObject holding the BPMN 2.0 XML
  * representation. Note that the di information (which e.g., includes the x and y coordinates as well
  * as width and height) is directly accessed via the shape. The structure of the di information is also
  * modeled using bpmn-moddle.
  */
  task.businessObject.name = 'Hello World';

  /*
  * Append the task, this will include updating the BPMN 2.0 XML representation according to the defined
  * bpmn-moddle meta-model and therefore result in a valid BPMN 2.0 XML
  */
  modeling.appendShape(startEvent,
    task,
    {
      x: Number(startEvent.x) + 200,
      y: Number(startEvent.y) + Number(startEvent.height) / 2
    },
    root);

}