export { default as loadSampleOne } from './addShapesSample.js';
export { default as loadSampleTwo } from './modifyBoOfShapeSample.js';
export { default as loadSampleThree } from './parallelGatewaySample.js';
export { default as loadSampleFour } from './addCompShapesSample.js';
export { default as loadSampleFive } from './bpmnGroupsSample.js';
export { default as loadSampleSix } from './defaultFlowSample.js';
export { default as loadSampleSeven } from './addParticipantsSample.js';
export { default as loadSampleEight } from './addLanesSample.js';

/**
 * Format the sample code by removing first two and last lines and
 * removing leading whitesspaces while keeping indentation.
 *
 * @param {string} code - The sample code including linebreaks
 * @return {string} The formatted sample code
 */
export function stripSampleCode(code) {
  let lines = code.split('\n');

  // Remove first two and last line
  // (which are not essential for the understanding of the sample)
  lines = lines.slice(2, lines.length - 1);

  // Determin startingWhitesspaces by reducing to lowest value (except -1 => empty line)
  let leadingWhitespaces = lines.reduce((acc, val) => {
    val = val.search((/\S/));
    return (val != -1 && val < acc) ? val : acc;
  }, 999);

  // Return starting whitespaces and join again to multiline string
  lines = lines.map(x => x.substring(leadingWhitespaces)).join('\n');
  return lines;
}