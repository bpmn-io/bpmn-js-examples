import '../TestHelper';

import TestContainer from 'mocha-test-container-support';

import CustomModeler from '../../app/custom-modeler';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


describe('custom modeler', function() {

  var xml = require('./diagram.bpmn');

  var container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });


  describe('custom elements', function() {

    var modeler;

    // spin up modeler with custom element before each test
    beforeEach(function(done) {

      modeler = new CustomModeler({ container: container });

      modeler.importXML(xml, function(err) {
        if (!err) {
          done();
        }
      });

    });


    it('should import custom element', function() {

      // given
      var elementRegistry = modeler.get('elementRegistry'),
          customElements = modeler.getCustomElements();

      // when
      var customElement = {
        type: 'custom:triangle',
        id: 'CustomTriangle_1',
        x: 300,
        y: 200
      };

      modeler.addCustomElements([ customElement ]);
      var customTriangle = elementRegistry.get('CustomTriangle_1');

      // then
      expect(is(customTriangle, 'custom:triangle')).to.be.true;

      expect(customTriangle).to.exist;
      expect(customElements).to.contain(customElement);

    });

  });


  describe('custom connections', function() {

    var modeler;

    // spin up modeler with custom element before each test
    beforeEach(function(done) {
      modeler = new CustomModeler({ container: container });

      modeler.importXML(xml, function(err) {
        if (!err) {
          modeler.addCustomElements([{
            type: 'custom:triangle',
            id: 'CustomTriangle_1',
            x: 300,
            y: 200
          }]);

          done();
        }
      });
    });


    it('should import custom connection', function() {

      // given
      var elementRegistry = modeler.get('elementRegistry');
      var customElements = modeler.getCustomElements();

      // when
      var customElement = {
        type: 'custom:connection',
        id: 'CustomConnection_1',
        source: 'CustomTriangle_1',
        target: 'Task_1',
        waypoints: [
          { x: 100, y: 100 },
          { x: 200, y: 300 }
        ]
      };

      modeler.addCustomElements([ customElement ]);
      var customConnection = elementRegistry.get('CustomConnection_1');

      // then
      expect(customConnection).to.exist;
      expect(customElements).to.contain(customElement);

    });

  });

});
