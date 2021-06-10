import TextField from '@bpmn-io/properties-panel/lib/components/entries/TextField';

import {
  useService
} from '@bpmn-io/bpmn-properties-panel';


export default function SpellProperty(props) {
  const {
    element
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const getValue = () => {
    return element.businessObject.spell;
  }

  const setValue = (value) => {
    return modeling.updateProperties(element, {
      spell: value
    });
  }

  return TextField({
    element,
    description: translate('Apply a black magic spell'),
    id: 'spell',
    label: translate('Spell'),
    getValue,
    setValue,
    debounce
  });
}