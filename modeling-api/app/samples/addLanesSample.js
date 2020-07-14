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

  // We use the elementFactory to create participants
  const participant1 = elementFactory.createParticipantShape();

  // Name the participant
  participant1.businessObject.name = 'Participant 1';

  // We add the participants and therefore transfrom the process into a collaboration
  modeling.createShape(participant1,
    {
      x: startEvent.x + 200,
      y: startEvent.y + startEvent.height / 2
    }, root);

  // We add two lanes (creating three lanes in the participant)
  modeling.addLane(participant1, 'bottom');
  modeling.addLane(participant1, 'bottom');

  // We retrieve the lanes and delete the middle one
  let lanes = elementRegistry.filter((element, gfx) => {
    return element.id.startsWith('Lane');
  });
  modeling.removeShape(lanes[1]);

  // By splitting, we create two nested lanes in the upper lane
  modeling.splitLane(lanes[0], 2);

}