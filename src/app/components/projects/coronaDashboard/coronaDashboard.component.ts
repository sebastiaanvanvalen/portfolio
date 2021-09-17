import { Component, OnInit, inject, Inject, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

import { CovidSummary } from './interfaces/covidSummary';
import { CovidWorldTotal } from './interfaces/covidWorldTotal';
import { CovidCountryTimeline } from './interfaces/covidCountryTimeline';
import { Title } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-coronaDashboard',
    templateUrl: './coronaDashboard.component.html',
    styleUrls: ['./coronaDashboard.component.scss'],
})
export class CoronaDashboardComponent implements OnInit {
    selectedCountry: string = 'world';

    modalObject = {
        D3: {
            title: 'Data Visualisation with D3JS',
            body:
                'The data in this model is transformed with the D3JS library. Pushing of sort types or selector buttons will rearange the bars, the scales and colors.',
        },
        API: {
            title: 'covid19api.com',
            body:
                "choosing a datasource for this project was not easy. It turned out many API's generate very large data packages with much data that I didn't need for this small project. This uses specific queries for very specific data.<br>This being such a small project I need to remind to check every now and then if the data is still displayed correctly and the API is still sending correct info. For instance one of the object key names was changed overnight.<br> The goal of this project was creating a nice model based on data available from a public API. Not creating a perfect situation dashboard concerning Covid. This means the situation will not be 100% complete. For instance, at the moment this is written, France has 0 recovered cases.",
        },
    };

    covidSummary: CovidSummary[] = [];
    covidWorldTotal: CovidWorldTotal[] = [];
    covidCountryTimeline: CovidCountryTimeline[] = [];
    updateDate: string;

    // current values world wide.
    worldtotalUrl: string = 'https://api.covid19api.com/world/total';

    confirmed: number;
    recovered: number;
    deceased: number;
    testedPeople: number;

    select = false;

    constructor(
        private HttpService: HttpService,
        private TitleService: Title,
        private ModalService: ModalService
    ) {
        this.TitleService.setTitle('Corona Dashboard - baxxie.nl');
    }

    ngOnInit() {
        this.getData(this.worldtotalUrl);
    }

    showModal(type): void {
        this.ModalService.setTitle(this.modalObject[type]['title']);
        this.ModalService.setBody(this.modalObject[type]['body']);
        this.ModalService.createModal();
    }

    private getData(url) {
        this.HttpService.makeGetRequest(url, null).subscribe((res) => {
            this.covidWorldTotal.push(res);
            this.procesWorldTotal();
        });
    }

    setDate(event) {
        this.updateDate =
            event.substring(0, 10) + ' (at ' + event.substring(11, 19) + ')';
    }

    private procesWorldTotal() {
        this.confirmed = this.covidWorldTotal[0].TotalConfirmed;
        this.recovered = this.covidWorldTotal[0].TotalRecovered;
        this.deceased = this.covidWorldTotal[0].TotalDeaths;
    }
}
