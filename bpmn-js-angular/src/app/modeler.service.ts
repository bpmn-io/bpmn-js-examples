import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import BpmnJS from "bpmn-js/dist/bpmn-modeler.development.js";
import { map, catchError, retry } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable()
export class ModelerService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  fetchXML(viewer: BpmnJS, xmlSrc: string) {
    return this.http.get(xmlSrc, { responseType: "text" }).pipe(
      map((res: string) => {
        viewer.importXML(res);
      }),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }
}
