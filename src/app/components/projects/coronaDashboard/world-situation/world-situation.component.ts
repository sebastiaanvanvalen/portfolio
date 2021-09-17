import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import * as d3 from 'd3';
import { HttpService } from 'src/app/services/http.service';
import { DataModel } from '../interfaces/datamodel';
import { BarChartService } from 'src/app/services/bar-chart.service';

@Component({
    selector: 'app-world-situation',
    templateUrl: './world-situation.component.html',
    styleUrls: ['./world-situation.component.scss'],
})
export class WorldSituationComponent implements OnInit {

    private dataModel: DataModel;
    public updateDate;

    worldSituationURL: string = 'https://api.covid19api.com/summary';
    countryURL: string = 'https://api.covid19api.com/country/';

    constructor(
        private BarChartService: BarChartService
    ) {}

    ngOnInit() {}

    public buildGraph(dataModel) {
        // buildGraph inits after childComp sends its first datamodel. standard or preset it gives the buildgraph the parameters on which the graph should be build
        this.dataModel = dataModel
        
        this.BarChartService.getGraph(this.dataModel);
        this.updateDate = this.dataModel.updatedOn
    }
}