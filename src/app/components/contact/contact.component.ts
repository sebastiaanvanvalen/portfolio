import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    FormData: FormGroup;

    constructor(
        private builder: FormBuilder,
        private contact: ContactService,
        private TitleService: Title
    ) {
        this.TitleService.setTitle('Contact - baxxie.nl')
    }




    ngOnInit(): void {
        this.FormData = this.builder.group({
            Fullname: new FormControl('', [Validators.required]),
            Email: new FormControl('', [
                Validators.compose([Validators.required, Validators.email]),
            ]),
            Comment: new FormControl('', [Validators.required]),
        });
    }

    submitToAPI(formData) {
        console.log(formData);

        // this.contact.postMessage(formData).subscribe((data) => {
        //     console.log("hello")
        //     console.log(data)
    // })
}
}
