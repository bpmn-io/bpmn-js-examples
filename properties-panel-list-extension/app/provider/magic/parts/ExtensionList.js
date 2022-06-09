import { without } from 'min-dash';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import { 
  CollapsibleEntry,
  ListEntry 
} from '@bpmn-io/properties-panel';

import { useService } from 'bpmn-js-properties-panel';

import ExtensionProps from './ExtensionProps';

import { 
  createElement 
} from '../util';


export default function ExtensionList(props) {
  const {
    element,
    idPrefix,
    parameter
  } = props;

  const id = `${ idPrefix }-extensions`;

  const bpmnFactory = useService('bpmnFactory');
  const commandStack = useService('commandStack');
  const translate = useService('translate');

  const businessObject = getBusinessObject(element);

  let extensions = parameter.get('extensions');

  const extensionsList = (extensions && extensions.get('extensions')) || [];

  function addExtension() {
    const commands = [];

    // (1) ensure extensions
    if (!extensions) {
      extensions = createElement(
        'magic:Extensions',
        { },
        businessObject,
        bpmnFactory
      );

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: parameter,
          properties: { extensions }
        }
      });
    }

    // (2) add extension
    const extension = createElement(
      'magic:Extension',
      { key: undefined },
      extensions,
      bpmnFactory
    );

    commands.push({
      cmd: 'element.updateModdleProperties',
      context: {
        element,
        moddleElement: extensions,
        properties: {
          extensions: [ ...extensions.get('extensions'), extension ]
        }
      }
    });

    // (3) commit updates
    commandStack.execute('properties-panel.multi-command-executor', commands);
  }

  function removeExtension(extension) {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: extensions,
      properties: {
        extensions: without(extensions.get('extensions'), extension)
      }
    });
  }

  return <ListEntry
    element={ element }
    autoFocusEntry={ `[data-entry-id="${id}-extension-${extensionsList.length - 1}"] input` }
    id={ id }
    label={ translate('Extensions') }
    items={ extensionsList }
    component={ Extension }
    onAdd={ addExtension }
    onRemove={ removeExtension } />;
}

function Extension(props) {
  const {
    element,
    id: idPrefix,
    index,
    item: extension,
    open
  } = props;

  const translate = useService('translate');

  const id = `${ idPrefix }-extension-${ index }`;

  return (
    <CollapsibleEntry
      id={ id }
      element={ element }
      entries={ ExtensionProps({
        extension,
        element,
        idPrefix: id
      }) }
      label={ extension.get('key') || translate('<empty>') }
      open={ open }
    />
  );
}