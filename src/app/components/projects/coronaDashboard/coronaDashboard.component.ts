import { Component, OnInit, inject, Inject, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

import { CovidSummary } from './world-situation/modals/covidSummary';
import { CovidWorldTotal } from './modals/covidWorldTotal';
import { CovidCountryTimeline } from './modals/covidCountryTimeline';

@Component({
    selector: 'app-coronaDashboard',
    templateUrl: './coronaDashboard.component.html',
    styleUrls: ['./coronaDashboard.component.scss'],
})
export class CoronaDashboardComponent implements OnInit {
    selectedCountry: string = 'world';

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

    constructor(private httpService: HttpService) {}

    ngOnInit() {
        this.getData(this.worldtotalUrl);
    }

    private getData(url) {

        this.httpService.makeGetRequest(url, null).subscribe((res) => {
            this.covidWorldTotal.push(res);
            this.procesWorldTotal();
        });
    }
    setDate(event) {
        console.log(event)
        this.updateDate =
            event.substring(0, 10) + ' (at ' + event.substring(11, 19) + ')';
    }

    private procesWorldTotal() {
        this.confirmed = this.covidWorldTotal[0].TotalConfirmed;
        this.recovered = this.covidWorldTotal[0].TotalRecovered;
        this.deceased = this.covidWorldTotal[0].TotalDeaths;
    }
}
