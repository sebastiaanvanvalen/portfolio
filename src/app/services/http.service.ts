import { Injectable } from '@angular/core';
import { MyBirdTableItem } from '../mat-components/my-bird-table/my-bird-table-datasource';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MyMessage } from '../models/my-message';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    // time for tokens
    optionsSet1 = {

        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
            "Access-Control-Allow-Headers": "x-requested-with, content-type",
            'Connection': 'keep-alive',
            'Cache-Control': 'Public',
            'ETag': 'W/"e4-hFc9aHGYZmwXvrBC8byswCwD+x0d'
        })
    }
        
    constructor(private http: HttpClient) {}

        
    makeGetRequest(url, headerId) {
        const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin','*')
        .set('ETag', 'W/"e4-hFc9aHGYZmwXvrBC8byswCwD+x0d')
        .set('Cache-Control', 'public')
        return this.http
            .get<any>(url, {headers})
            .pipe(retry(1), catchError(this.handleError));
    }




    makeGetAllRequest(url): Observable<any> {
        
        return this.http
        .get<any>(url)
        .pipe(retry(1), catchError(this.handleError));
    }

    makePostRequest(url: string, body: MyMessage) {
        console.log(body)

        return this.http
            .post(url, body)
            .pipe(retry(1), catchError(this.handleError));
    }

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
