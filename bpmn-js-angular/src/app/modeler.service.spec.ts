import { BpmnJS } from 'bpmn-js/dist/bpmn-modeler.development.js';
import { ModelerService } from './modeler.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ModelerService', () => {
  let injector: TestBed;
  let service: ModelerService;
  let httpMock: HttpTestingController;
  const dummyBpmJsInstance: BpmnJS = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModelerService]
    });
    injector = getTestBed();
    service = injector.get(ModelerService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#fetchXML', () => {
    it('makes a get request to an XML file', () => {
      spyOn(service, 'fetchXML').and.callThrough();
      service.fetchXML(dummyBpmJsInstance, 'path/to/xml').subscribe();
      const req = httpMock.expectOne('path/to/xml');
      expect(req.request.method).toBe('GET');
    });
  });
});
