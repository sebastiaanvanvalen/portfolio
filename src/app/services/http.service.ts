import { Injectable } from '@angular/core';
import { MyBirdTableItem } from '../mat-components/my-bird-table/my-bird-table-datasource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    // time for tokens
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {}

    makeGetAllRequest(url): Observable<any> {

        return this.http
            .get<any>(url)
            .pipe(retry(1), catchError(this.handleError));
    }

    makeGetRequest(url, id) {

        return this.http
            .get<any>(url)
            .pipe(retry(1), catchError(this.handleError));
    }

    makePostRequest(url, body) {}

    makeDeleteRequest(url, id) {}

    makePatchRequest(url, id, body) {}

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
