import { Injectable, Output, EventEmitter } from '@angular/core';
import { DataModel } from '../components/projects/coronaDashboard/world-situation/modals/datamodel';
import * as d3 from 'd3';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class BarChartService {
    dataModelChange: EventEmitter<DataModel> = new EventEmitter();

    public rawData = [];
    private processedData = [];
    private updateDate = '';

    private dataModel: DataModel;
    private svg;
    private margin = 70;
    private width = 800 - this.margin * 2;
    private height = 400 - this.margin * 2;

    worldSituationURL: string = 'https://api.covid19api.com/summary';
    countryURL: string = 'https://api.covid19api.com/country/';

    constructor(private HttpService: HttpService) {}

    public getGraph(dataModel) {
        this.dataModel = dataModel;

        if (this.dataModel.selectedCountry === 'world') {
            this.HttpService.makeGetRequest(
                this.worldSituationURL,
                null
            ).subscribe((res) => {
                this.rawData = res.Countries;
                // console.log(res)

                this.dataModel.updatedOn = res.Date;
                this.adjustMinBar();
                this.sortData();
                this.createGraph();
                this.dataModelChange.emit(this.dataModel);
            });
        } else {
            let URL = this.countryURL + this.dataModel.selectedCountry;
            this.HttpService.makeGetRequest(URL, null).subscribe((res) => {
                this.rawData = res;
                this.rawData.forEach((element, index) => {
                    this.rawData[index].TotalDeaths = this.rawData[
                        index
                    ].Deaths;
                    delete this.rawData[index].Deaths;
                    this.rawData[index].TotalConfirmed = this.rawData[
                        index
                    ].Confirmed;
                    delete this.rawData[index].Confirmed;
                    this.rawData[index].TotalRecovered = this.rawData[
                        index
                    ].Recovered;
                    delete this.rawData[index].Recovered;
                });

                // console.log(this.rawData)
                this.adjustMinBar();
                this.sortData();
                this.createGraph();
                this.dataModelChange.emit(this.dataModel);
            });
        }
    }

    public getDataModel() {
        return this.dataModel;
    }

    public adjustMinBar() {
        // this.minBar = event;
        let tempData = [];
        console.log(this.dataModel.minBar);

        // tempData = this.rawData.filter((obj) => obj.param === this.dataModel.minBar);
        this.rawData.map((d) => {
            if (d.TotalDeaths > this.dataModel.minBar) {
                tempData.push(d);
            } else {
                return;
            }
        });
        this.processedData = tempData;
        console.log(this.processedData);
    }

    private sortData() {
        let type = this.dataModel.sortedBy.filter(
            (element) => element.value === true
        );
        // console.log(type[0].type)
        switch (type[0].type) {
            case 'alphabet':
                this.processedData = this.processedData.sort(function (a, b) {
                    return a.Country.localeCompare(b.Country);
                });

                break;
            case 'deceased':
                this.processedData = this.processedData.sort(function (a, b) {
                    return a.TotalDeaths - b.TotalDeaths;
                });

                break;
            case 'confirmed':
                this.processedData = this.processedData.sort(function (a, b) {
                    return a.TotalConfirmed - b.TotalConfirmed;
                });

                break;
            case 'recovered':
                this.processedData = this.processedData.sort(function (a, b) {
                    return a.TotalRecovered - b.TotalRecovered;
                });

                break;

            default:
                break;
        }
        console.log(this.processedData);
    }

    private setXaxisText() {
        console.log('will generate text some day');
    }

    private createGraph(): void {
        document.getElementById('vis-holder').innerHTML = '';
        this.svg = d3
            .select('.vis-holder')
            .append('svg')
            .attr('width', this.width + this.margin * 2)
            .attr('height', this.height + this.margin * 2)
            .append('g')
            .attr(
                'transform',
                'translate(' + this.margin + ',' + this.margin + ')'
            );

        let showParam = this.dataModel.dataParams.filter(
            (obj) => obj.value === true
        );

        // let tooltip = d3
        //     .select('.vis-holder')
        //     .append('div')
        //     .attr('id', 'tooltip')
        //     .style('opacity', 0);

        // let overlay = d3
        //     .select('.vis-holder')
        //     .append('div')
        //     .attr('class', 'overlay')
        //     .style('opacity', 0);

        let x;
        if (this.dataModel.selectedCountry === 'world') {

            x = d3
            .scaleBand()
            .range([0, this.width])
            .domain(this.processedData.map((d) => d.Country))
            .padding(0.2)

            this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr('transform', 'translate(-10,0)rotate(-35)')
            .style('text-anchor', 'end')

        } else {

            x = d3
            .scaleBand()
            .range([0, this.width])
            .domain(this.processedData.map((d) => d.Date))
            // .padding(0.2)

            this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text').remove()
        }

            

        // Create the Y-axis band scale
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(this.processedData, (d) => d[showParam[0].param])])
            .range([this.height, 0]);

        // Draw the Y-axis on the DOM
        this.svg.append('g').call(d3.axisLeft(y));

        

        // Create and fill the bars
        this.svg
            .selectAll('.bar')
            .data(this.processedData)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('width', x.bandwidth())
            .attr('height', (data) => this.height - y(data[showParam[0].param]))
            .attr('x', (data) => {
                if (this.dataModel.selectedCountry === "world") {
                    return x(data.Country)
                } else {
                    return x(data.Date)
                }
            })
            .attr('y', (data) => y(data[showParam[0].param]))
            .attr('fill', showParam[0].color)
            // .axis().tickFormat("")

        // .on('mouseover', function (d, i) {
        //     // console.log(deaths[scaledDeaths.indexOf(i)])
        //     // console.log(scaledDeaths.indexOf(i))
        //     console.log(d);
        //     console.log(i);

        //     overlay
        //         .transition()
        //         .duration(0)
        //         .style(
        //             'height',
        //             d.target.height.baseVal.valueAsString + 'px'
        //         )
        //         .style('width', x.bandwidth() + 'px')
        //         .style('opacity', 0.9)
        //         .style(
        //             'left',
        //             showParam[0].param + x.bandwidth() + 0 + 'px'
        //         )
        //         .style(
        //             'top',
        //             this.height -
        //                 d.target.height.baseVal.valueAsString +
        //                 'px'
        //         )
        //         .style('transform', 'translateX(60px)');

        //     tooltip.transition().duration(200).style('opacity', 0.9);
        //     tooltip
        //         .html(
        //             d[showParam[0].param] +
        //                 '<br>' +
        //                 d[showParam[0].param].value
        //         )
        //         .attr('data-deaths', d[showParam[0].param][0])
        //         .style(
        //             'left',
        //             d[showParam[0].param] * x.bandwidth() + 30 + 'px'
        //         )
        //         .style('top', this.height - 100 + 'px')
        //         .style('transform', 'translateX(60px)');
        // })
        // .on('mouseout', function () {
        //     tooltip.transition().duration(200).style('opacity', 0);
        //     overlay.transition().duration(200).style('opacity', 0);
        // });
    }
}
