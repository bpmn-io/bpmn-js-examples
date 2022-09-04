
declare module 'bpmn-js/lib/Modeler' {

    import BaseViewer from "bpmn-js/lib/BaseViewer";

    /**
     * Make the Modeler compatible with Typescript, as ES5 inheritance via prototype cant be typed.
     */
    export default class BpmnModeler {
        /**
         * @param options configuration options to pass to the viewer
         * @param options.container the container to attach to
         * @param options.width the width of the viewer
         * @param options.height the height of the viewer
         * @param options.moddleExtensions extension packages to provide
         * @param options.modules a list of modules to override the default modules
         * @param options.additionalModules a list of modules to use with the default modules
         */
        constructor(options?: {
            container?: HTMLElement|string,
            width?: string|number,
            heigt?: string|number,
            moddleExtensions?: object,
            modules?: any[],
            additionalModules?: any[],
        });

        /**
         * @see BaseViewer.importXML
         * 
         * @param xml the BPMN 2.0 xml
         * @param {ModdleElement<BPMNDiagram>|string} bpmnDiagram BPMN diagram or id of diagram to render (if not provided, the first one will be rendered)
         */
        importXML(xml: string, bpmnDiagram?: string): Promise<{warnings: string[]}>;

        /**
         * @see BaseViewer.saveXML
         * 
         * @param {Object} options export options
         * @param {boolean} [options.format=false] output formatted XML
         * @param {boolean} [options.preamble=true] output preamble
         */
        saveXML(options?: { format?: boolean, preamble?: boolean }): Promise<{xml: string}>;

        /**
         * @see BaseViewer.saveSVG
         */
        saveSVG(): Promise<{svg: string}>;
    }
}
