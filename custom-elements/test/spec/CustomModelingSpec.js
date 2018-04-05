import {
  bootstrapBpmnJS,
  inject
} from '../TestHelper';

import {
  assign
} from 'min-dash';

import CustomModeler from '../../app/custom-modeler';


describe('custom modeling', function() {

  var xml = require('./diagram.bpmn');

  beforeEach(bootstrapBpmnJS(CustomModeler, xml));


  describe('custom elements', function() {

    beforeEach(inject(function(bpmnjs) {

      var customShape = {
        type: 'custom:triangle',
        id: 'CustomTriangle_1',
        x: 300,
        y: 300
      };

      bpmnjs.addCustomElements([ customShape ]);
    }));


    it('should export custom element', inject(
      function(bpmnjs, elementRegistry, modeling) {

        // given
        var customElement = {
          type: 'custom:circle',
          id: 'CustomCircle_1',
          x: 200,
          y: 400
        };

        var position = { x: customElement.x, y: customElement.y },
            target = elementRegistry.get('Process_1');

        modeling.createShape(
          assign({ businessObject: customElement }, customElement),
          position,
          target
        );

        // when
        var customElements = bpmnjs.getCustomElements();

        // then
        expect(customElements).to.contain(customElement);
      }
    ));


    it('should not resize custom shape', inject(function(elementRegistry, rules) {

      // given
      var customElement = elementRegistry.get('CustomTriangle_1');

      // when
      var allowed = rules.allowed('resize', { shape: customElement });

      // then
      expect(allowed).to.be.false;
    }));


    it('should update custom element', inject(function(elementRegistry, modeling) {

      // given
      var customElement = elementRegistry.get('CustomTriangle_1');

      // when
      modeling.moveShape(customElement, { x: 200, y: 50 }, customElement.parent);

      // then
      expect(customElement.businessObject.x).to.equal(500);
      expect(customElement.businessObject.y).to.equal(350);
    }));


    it('should remove deleted shape from _customElements', inject(
      function(bpmnjs, elementRegistry, modeling) {

        // given
        var customShape = elementRegistry.get('CustomTriangle_1'),
            customElements = bpmnjs.getCustomElements();

        // when
        modeling.removeShape(customShape);

        // then
        expect(customElements.length).to.equal(0);
      }
    ));

  });


  describe('custom connections', function() {

    beforeEach(inject(function(bpmnjs) {

      var customShape = {
        type: 'custom:triangle',
        id: 'CustomTriangle_1',
        x: 400,
        y: 300
      };

      bpmnjs.addCustomElements([ customShape ]);
    }));


    it('should export custom connection', inject(
      function(bpmnjs, elementRegistry, modeling) {

        // given
        var customShape = elementRegistry.get('CustomTriangle_1'),
            taskShape = elementRegistry.get('Task_1');

        modeling.connect(customShape, taskShape, {
          type: 'custom:connection',
          id: 'CustomConnection_1'
        });

        // when
        var customElements = bpmnjs.getCustomElements();

        // then
        var ids = customElements.map(function(element) {
          return element.id;
        });

        expect(ids).to.include('CustomConnection_1');
      }
    ));


    it('should connect custom shape to task', inject(
      function(bpmnjs, elementRegistry, modeling, rules) {

        // given
        var customShape = elementRegistry.get('CustomTriangle_1'),
            taskShape = elementRegistry.get('Task_1');

        // when
        var allowedConnection = rules.allowed('connection.create', {
          source: customShape,
          target: taskShape
        });

        modeling.connect(
          customShape,
          taskShape,
          allowedConnection
        );

        // then
        expect(allowedConnection.type).to.eql('custom:connection');

        expect(customShape.outgoing.length).to.equal(1);
        expect(taskShape.outgoing.length).to.equal(1);

        expect(bpmnjs.getCustomElements().length).to.equal(2);
      }
    ));


    it('should not connect custom shape to start event', inject(
      function(elementRegistry, rules) {

        // given
        var customShape = elementRegistry.get('CustomTriangle_1'),
            startEventShape = elementRegistry.get('StartEvent_1');

        // when
        var allowed = rules.allowed('connection.create', {
          source: customShape,
          target: startEventShape
        });

        // then
        expect(allowed).to.be.false;
      }
    ));


    it('should reconnect start', inject(function(bpmnjs, elementRegistry, modeling) {

      // given
      var customShape = elementRegistry.get('CustomTriangle_1'),
          taskShape = elementRegistry.get('Task_1');

      var customConnection = modeling.connect(customShape, taskShape, {
        type: 'custom:connection'
      });

      bpmnjs.addCustomElements([{
        type: 'custom:circle',
        id: 'CustomCircle_1',
        x: 200,
        y: 300
      }]);

      var customCircle = elementRegistry.get('CustomCircle_1');

      // when
      modeling.reconnectStart(customConnection, customCircle, {
        x: customCircle.x + customCircle.width / 2,
        y: customCircle.y + customCircle.height / 2
      });

      // then
      expect(customConnection.source).to.equal(customCircle);
      expect(customConnection.target).to.equal(taskShape);
    }));


    it('should reconnect end', inject(function(bpmnjs, elementRegistry, modeling) {

      // given
      var customShape = elementRegistry.get('CustomTriangle_1'),
          taskShape1 = elementRegistry.get('Task_1'),
          taskShape2 = elementRegistry.get('Task_2');

      var customConnection = modeling.connect(customShape, taskShape1, {
        type: 'custom:connection'
      });

      // when
      modeling.reconnectEnd(customConnection, taskShape2, {
        x: taskShape2.x + taskShape2.width / 2,
        y: taskShape2.y + taskShape2.height / 2
      });

      // then
      expect(customConnection.source).to.equal(customShape);
      expect(customConnection.target).to.equal(taskShape2);
    }));


    it('should update custom connection', inject(function(elementRegistry, modeling) {

      // given
      var customElement = elementRegistry.get('CustomTriangle_1'),
          taskShape = elementRegistry.get('Task_1');

      var customConnection = modeling.connect(customElement, taskShape, {
        type: 'custom:connection'
      });

      // when
      modeling.moveShape(customElement, { x: 200, y: 50 }, customElement.parent);

      // then
      expect(customConnection.businessObject.waypoints).to.eql([
        { x: 613, y: 364 },
        { x: 354, y: 157 }
      ]);
    }));


    it('should remove deleted connection from _customElements', inject(
      function(bpmnjs, elementRegistry, modeling) {

        // given
        var customShape = elementRegistry.get('CustomTriangle_1'),
            taskShape = elementRegistry.get('Task_1'),
            customElements = bpmnjs.getCustomElements();

        var customConnection = modeling.connect(customShape, taskShape, {
          type: 'custom:connection'
        });

        // when
        modeling.removeConnection(customConnection);

        // then
        expect(customElements.length).to.equal(1);
      }
    ));

  });

});
