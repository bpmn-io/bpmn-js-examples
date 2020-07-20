import addCompShapes from './addCompShapes.js';
import addLanes from './addLanes.js';
import addParticipants from './addParticipants.js';
import addShapes from './addShapes.js';
import bpmnGroups from './bpmnGroups.js';
import defaultFlow from './defaultFlow.js';
import modifyBoOfShape from './modifyBoOfShape.js';
import parallelGateway from './parallelGateway.js';

export default [
  addShapes,
  parallelGateway,
  addCompShapes,
  bpmnGroups,
  addParticipants,
  addLanes,
  defaultFlow,
  modifyBoOfShape
];