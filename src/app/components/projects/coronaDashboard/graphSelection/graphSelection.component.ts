import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DataModel } from '../world-situation/modals/datamodel';
import { HttpService } from 'src/app/services/http.service';
import { CovidCountries } from '../modals/covidCountries';

@Component({
    selector: 'app-graphSelection',
    templateUrl: './graphSelection.component.html',
    styleUrls: ['./graphSelection.component.scss'],
})
export class GraphSelectionComponent implements OnInit {
    @Output() sendDataModel: EventEmitter<DataModel> = new EventEmitter();

    @Input() selectedCountry;

    selectedSortType = 'alphabet';

    covidCountries: CovidCountries[] = [];
    countriesUrl: string = 'https://api.covid19api.com/countries';
    worldSituationURL: string = 'https://api.covid19api.com/summary';


    public dataModel: DataModel = {
        selectedCountry: "world",
        updatedOn: "",
        dataParams: [
            {
                param: 'TotalConfirmed',
                name: 'confirmed',
                value: false,
                color: 'rgb(127, 23, 31)',
            },
            {
                param: 'TotalRecovered',
                name: 'recovered',
                value: false,
                color: 'rgb(23, 127, 117)',
            },
            {
                param: 'TotalDeaths',
                name: 'deceased',
                value: true,
                color: 'rgb(127, 84, 23)',
            },
        ],
        sortedBy: [
            { type: 'alphabet', value: true },
            { type: 'confirmed', value: false },
            { type: 'recovered', value: false },
            { type: 'deceased', value: false },
        ],
        minBar: 15000,
    };

    constructor(private HttpService: HttpService) {}

    ngOnInit() {
        this.getCountries();
        this.sendDataModel.emit(this.dataModel);    
    }
    
    private getCountries() {
        // getting countries for 
        this.HttpService.makeGetRequest(this.countriesUrl, null).subscribe((res) => {
            res.sort((a, b) => {
                if (a.Slug < b.Slug) {

                    return -1;
                } else if (a.Slug > b.Slug) {

                    return 1;
                }
                return 0;
            });

            this.covidCountries = res
        });
    }

    public processParam(param) {
        let selectedParam = this.dataModel.dataParams.filter(
            (obj) => obj.param === param
        );

        this.dataModel.dataParams.forEach((element) => (element.value = false));
        selectedParam[0].value = !param[0].value;

        this.sendDataModel.emit(this.dataModel);
    }

    public setCountry(country) {

        this.selectedCountry = country;
        this.dataModel.selectedCountry = country;
        
        if (country === "world") {
            this.dataModel.minBar = 15000;
        } else {
            this.dataModel.minBar = 0;
        }

        this.sendDataModel.emit(this.dataModel);
    }

    public selectSortType(sortType) {
        let selectedSortType = this.dataModel.sortedBy.filter(
            (obj) => obj.type === sortType
        );
        this.selectedSortType = selectedSortType[0].type;
        this.dataModel.sortedBy.forEach((element) => (element.value = false));
        selectedSortType[0].value = !selectedSortType[0].value;

        this.sendDataModel.emit(this.dataModel);
    }
}
