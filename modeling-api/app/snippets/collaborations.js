function fn(modeler) {
  /**
   * So far we've worked with processes. Let's have a look at collaborations.
   *
   * The modules used in this example are:
   *
   * * ElementFactory: Creates new shapes and connections.
   * * ElementRegistry: A registry of all shapes and connections of the diagram.
   * * Modeling: The main module for modeling.
   *
   * We will use these modules to create Participants, add them to the diagram (thereby
   * turning the process into a collaboration), create lanes and connect participants
   * using Message Flows.
   */

  // (1) Get the modules
  const elementFactory = modeler.get('elementFactory'),
        elementRegistry = modeler.get('elementRegistry'),
        modeling = modeler.get('modeling');

  // (2) Get the existing process and the start event
  const process = elementRegistry.get('Process_1'),
        startEvent = elementRegistry.get('StartEvent_1');

  // (3) Create a new participant shape using `createParticipantShape`
  const participant = elementFactory.createParticipantShape({ type: 'bpmn:Participant' });

  // (4) Add the new participant to the diagram turning the process into a collaboration
  modeling.createShape(participant, { x: 400, y: 100 }, process);

  // The existing start event is now a child of the participant
  console.log(startEvent.parent); // Shape { "type": "bpmn:Participant", ... }

  // (5) Create a lane
  const lane = modeling.addLane(participant, 'bottom');

  // (6) Create two nested lanes
  modeling.splitLane(lane, 2);

  // (7) Create another participant shape that is collapsed
  const collapsedParticipant = elementFactory
    .createParticipantShape({ type: 'bpmn:Participant', isExpanded: false });

  // (8) Add the participant to the diagram
  modeling.createShape(collapsedParticipant, { x: 300, y: 500 }, process);

  // (9) Connect the two participants through a message flow
  modeling.connect(collapsedParticipant, participant);
}

export default {
  id: 'collaborations',
  name: 'Collaborations',
  description: 'Working with collaborations.',
  fn
};