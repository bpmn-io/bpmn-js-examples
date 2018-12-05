import { ModelerService } from './modeler.service';
import { AfterContentInit, OnDestroy, Component } from '@angular/core';

import BpmnJS from 'bpmn-js/dist/bpmn-modeler.development.js';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, OnDestroy {
  private viewer: BpmnJS = new BpmnJS();

  constructor(private modelerService: ModelerService) {}

  ngAfterContentInit(): void {
    this.viewer.attachTo('#modeler');

    this.modelerService.fetchXML(this.viewer).subscribe();
  }

  ngOnDestroy(): void {
    this.viewer.detach();
  }
}
