import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {
    FormControl,
    FormGroupDirective,
    NgForm,
    Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { map, startWith } from 'rxjs/operators';

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
    selector: 'app-myforms',
    templateUrl: './myforms.component.html',
    styleUrls: ['./myforms.component.scss'],
})
export class MyformsComponent implements OnInit {
    myControl = new FormControl();
    matcher = new MyErrorStateMatcher();
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    rippleColor: "orange"
    favoriteSeason: string;
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    value: string ="";
    filteredOptions: Observable<string[]>;

    options: string[] = [
        'Arend',
        'Ard',
        'Anneke',
        'Aafje',
        'Agnes',
        'Anusha',
        'Amber',
        'Aldo',
        'Annelies',
        'Annemieke',
        'Arwen',
    ];

    constructor(private TitleService: Title) {
        this.TitleService.setTitle('Forms - baxxie.nl');
    }

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(
            (option) => option.toLowerCase().indexOf(filterValue) === 0
        );
    }
}
