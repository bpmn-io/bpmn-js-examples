import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import SpellProperty from './properties/SpellProperty';

import Group from '@bpmn-io/properties-panel/lib/components/Group';

import { isEdited } from '@bpmn-io/properties-panel/lib/components/entries/TextField';

export default class MagicPropertiesProvider {

  constructor(propertiesPanel, translate) {

    propertiesPanel.registerProvider(this);

    this._translate = translate;
  }

  getGroups(element) {

    const translate = this._translate;

    return (groups) => {

      if(is(element, 'bpmn:StartEvent')) {
        groups.push({
          id: 'magic',
          label: translate('Magic Properties'),
          component: Group,
          entries: [
            {
              id: 'spell',
              component: <SpellProperty 
                element={ element }
                translate={ this._translate }
              />,
              isEdited
            }
          ]
        });
      }
      
      return groups;
    };
  }

}

MagicPropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ];