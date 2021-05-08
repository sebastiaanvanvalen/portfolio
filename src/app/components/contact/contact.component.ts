import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorStateMatcher } from '@angular/material/core';
import { v4 as uuidv4 } from 'uuid';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    NgForm,
    FormGroupDirective,
} from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { HttpService } from 'src/app/services/http.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null
    ): boolean {
        const isSubmitted = form && form.submitted;
        return !!(
            control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted)
        );
    }
}

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    contactForm: FormGroup;
    disabledSubmitButton: boolean = true;
    optionsSelect: Array<any>;

    url =
        'https://l1e94fxpa5.execute-api.eu-central-1.amazonaws.com/messages/message';

    @HostListener('input') oninput() {
        if (this.contactForm.valid) {
            this.disabledSubmitButton = false;
        }
    }

    constructor(
        private TitleService: Title,
        private formBuilder: FormBuilder,
        private connectionService: HttpService
    ) {
        this.TitleService.setTitle('Contact - baxxie.nl');

        this.contactForm = formBuilder.group({
            name: ['', Validators.required],
            email: [
                '',
                Validators.compose([Validators.required, Validators.email]),
            ],
            subject: ['', Validators.required],
            message: ['', Validators.required],
            copy: [''],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        console.log(this.contactForm.value);
        console.log(uuidv4());
        const body = {
            messageId: uuidv4(),
            name: this.contactForm.value.name,
            email: this.contactForm.value.email,
            message: this.contactForm.value.message,
            subject: this.contactForm.value.subject,
            copy: this.contactForm.value.copy,
            sendDate: new Date().toISOString(),
        };
        this.connectionService.makePostRequest(this.url, body).subscribe(
            (resp) => {
                // alert('Your message has been sent.');
                console.log(resp);
                this.contactForm.reset();
                this.disabledSubmitButton = true;
            },
            (error) => {
                console.log('Error', error);
            }
        );


    }
}
