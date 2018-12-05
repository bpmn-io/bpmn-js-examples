import { HttpClient } from '@angular/common/http';
import BpmnJS from 'bpmn-js/dist/bpmn-modeler.development.js';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ModelerService {
  private xml =
    'https://cdn.rawgit.com/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

  constructor(private http: HttpClient) {}

  fetchXML(viewer: BpmnJS) {
    return this.http.get(this.xml, { responseType: 'text' }).pipe(
      map(res => {
        viewer.importXML(res, err => {
          if (err) {
            console.log('error rendering', err);
          } else {
            console.log('rendered');
          }
        });
      })
    );
  }
}
