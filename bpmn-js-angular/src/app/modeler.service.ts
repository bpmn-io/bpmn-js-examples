import { HttpClient } from '@angular/common/http';
import BpmnJS from 'bpmn-js/dist/bpmn-modeler.development.js';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ModelerService {
  constructor(private http: HttpClient) {}

  fetchXML(viewer: BpmnJS, xmlSrc: string) {
    return this.http.get(xmlSrc, { responseType: 'text' }).pipe(
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
