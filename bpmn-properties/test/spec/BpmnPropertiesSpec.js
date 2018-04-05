import {
  bootstrapModeler,
  inject
} from '../TestHelper';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';


describe('bpmn properties', function() {

  var testModules = [
    coreModule,
    modelingModule
  ];


  var diagramXML = require('./diagram.bpmn');

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules
  }));


  describe('read properties', function() {

    it('should read name', inject(function(elementRegistry) {

      // given
      var sequenceFlowElement = elementRegistry.get('SequenceFlow_1'),
          sequenceFlow = sequenceFlowElement.businessObject;

      // when
      var name = sequenceFlow.name;

      // then
      expect(name).to.eql('FOO > BAR?');
    }));


    it('should read conditionExpression', inject(function(elementRegistry) {

      // given
      var sequenceFlowElement = elementRegistry.get('SequenceFlow_1'),
          sequenceFlow = sequenceFlowElement.businessObject;

      // when
      var condition = sequenceFlow.conditionExpression;

      // then
      expect(condition.body).to.eql('${foo > bar}');
    }));

  });


  describe('write properties', function() {

    it('should write conditionExpression', inject(
      function(elementRegistry, moddle, modeling) {

        // given
        var sequenceFlowElement = elementRegistry.get('SequenceFlow_2'),
            sequenceFlow = sequenceFlowElement.businessObject;

        var newCondition = moddle.create('bpmn:FormalExpression', {
          body: '${ value > 100 }'
        });

        // assume
        expect(sequenceFlow.conditionExpression).not.to.exist;

        // when
        modeling.updateProperties(sequenceFlowElement, {
          conditionExpression: newCondition
        });

        // then
        expect(sequenceFlow.conditionExpression).to.equal(newCondition);
      }
    ));


    it('should undo write conditionExpression', inject(
      function(elementRegistry, moddle, modeling, commandStack) {

        // given
        var sequenceFlowElement = elementRegistry.get('SequenceFlow_2'),
            sequenceFlow = sequenceFlowElement.businessObject;

        var newCondition = moddle.create('bpmn:FormalExpression', {
          body: '${ value > 100 }'
        });

        modeling.updateProperties(sequenceFlowElement, {
          conditionExpression: newCondition
        });


        // when
        commandStack.undo();

        // then
        expect(sequenceFlow.conditionExpression).not.to.exist;
      }
    ));

  });

});
