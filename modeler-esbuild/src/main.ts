import BpmnModeler from 'bpmn-js/lib/Modeler';

/** @ts-expect-error */
import { saveAs } from 'file-saver';

/** @ts-expect-error */
import newDiagramXML from "./resources/newDiagram.bpmn";

const bpmnModeler = new BpmnModeler({
  container: "#js-canvas",
});

const openDiagram = (xml) => {
  return bpmnModeler.importXML(xml)
}

openDiagram(newDiagramXML);

const downloadCmmnLink = document.getElementById("js-download-diagram")!;
const downloadSvgLink = document.getElementById("js-download-svg")!;

downloadCmmnLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const { xml } = await bpmnModeler.saveXML({ format: true })
  saveAs(new Blob([xml], {type:"application/bpmn20-xml;charset=UTF-8"}), "diagram.bpmn")
});

downloadSvgLink.addEventListener("click", async (e) => {
  e.preventDefault();
  const { svg } = await bpmnModeler.saveSVG()
  saveAs(new Blob([svg], {type:"image/svg+xml;charset=utf-8"}), "diagram.svg")
});
