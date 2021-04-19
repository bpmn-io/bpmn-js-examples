import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {

  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:StartEvent')) {
    group.entries.push(entryFactory.textField(translate, {
      id : 'spell',
      description : 'Apply a black magic spell',
      label : 'Spell',
      modelProperty : 'spell'
    }));
    
    group.entries.push({
      html: '<input type="file" id="fileUploaded"><br><br>',
      description : 'File Upload',
      label : 'File Upload',
      id : 'fileUploader',
      modelProperty : 'fileUploader',
      set: function(element, values){
        console.log(values.fileUploader);
        //element.businessObject.$attrs.fileUploader = values.fileUploader;
        return;
      }
    });
  }
}
