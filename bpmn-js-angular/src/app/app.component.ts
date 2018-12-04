import { AfterContentInit, OnDestroy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import BpmnJS from 'bpmn-js/dist/bpmn-modeler.development.js';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, OnDestroy {
  private res;
  private viewer: BpmnJS = new BpmnJS();
  private xml =
    'https://cdn.rawgit.com/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

  constructor(private http: HttpClient) {}

  ngAfterContentInit(): void {
    console.log(this.res);
    this.viewer.attachTo('#modeler');

    this.http
      .get(this.xml, { responseType: 'text' })
      .pipe(
        map(res => {
          this.viewer.importXML(res, err => {
            if (err) {
              console.log('error rendering', err);
            } else {
              console.log('rendered');
            }
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.viewer.detach();
  }
}
