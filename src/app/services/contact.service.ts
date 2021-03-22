import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'jquery';

import { Email } from '../models/email'


@Injectable({
    providedIn: 'root',
})
export class ContactService {


    constructor(private http: HttpClient) {}

    postMessage(formData) {
        const data = {
            name: formData.Fullname,
            email: formData.Email,
            comment: formData.Comment
        }


        // console.log(data)
        // return this.http.post(this.URL, data)

    }
}
