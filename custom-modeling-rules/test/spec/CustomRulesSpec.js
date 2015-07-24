'use strict';

var TestHelper = require('../TestHelper');

/* global bootstrapModeler, inject */


var coreModule = require('bpmn-js/lib/core'),
    bpmnPaletteModule = require('bpmn-js/lib/features/palette'),
    modelingModule = require('bpmn-js/lib/features/modeling'),
    customRulesModule = require('../../lib/custom-rules');



describe('custom-rules', function() {

  var testModules = [
    // prepend our custom rules to hook into the
    // rule evaluation before the default rules
    // get applied
    customRulesModule,

    // add default interaction features
    coreModule,
    modelingModule,
    bpmnPaletteModule
  ];


  var diagramXML = require('./diagram.bpmn');

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules
  }));


  describe('shape.create', function() {

    it('should reject per default', inject(function(rules, elementRegistry, elementFactory) {

      // given
      var newEventShape = elementFactory.create('shape', { type: 'bpmn:StartEvent' });
      var targetElement = elementRegistry.get('Process_1');

      // when
      var canCreate = rules.allowed('shape.create', {
        shape: newEventShape,
        target: targetElement
      });

      // then
      expect(canCreate).to.be.false;
    }));


    it('should reject drop non bpmn:Task on special flow', inject(function(rules, elementRegistry, elementFactory) {

      // given
      var newEventShape = elementFactory.create('shape', { type: 'bpmn:StartEvent' });
      var specialFlowElement = elementRegistry.get('SequenceFlow_1');

      // when
      var canCreate = rules.allowed('shape.create', {
        shape: newEventShape,
        target: specialFlowElement
      });

      // then
      expect(canCreate).to.be.false;

    }));


    it('should allow drop bpmn:Task on special flow', inject(function(rules, elementRegistry, elementFactory) {

      // given
      var newTaskShape = elementFactory.create('shape', { type: 'bpmn:Task' });
      var specialFlowElement = elementRegistry.get('SequenceFlow_1');

      // when
      var canCreate = rules.allowed('shape.create', {
        shape: newTaskShape,
        target: specialFlowElement
      });

      // then
      expect(canCreate).to.be.true;

    }));

  });

});
