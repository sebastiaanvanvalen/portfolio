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

    public dataModel: DataModel;
    private svg;
    private xAxis;
    private yAxis;
    private margin = 70;
    private width = 800 - this.margin * 2;
    private height = 400 - this.margin * 2;

    worldSituationURL: string = 'https://api.covid19api.com/summary';
    countryURL: string = 'https://api.covid19api.com/country/';

    constructor(private HttpService: HttpService) {}

    public getGraph(dataModel) {
        this.dataModel = dataModel;

        if (this.dataModel.selectedCountry === 'world') {
            this.HttpService.makeGetRequest(this.worldSituationURL, null).subscribe((res) => {

                this.rawData = res.Countries;
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

        // tempData = this.rawData.filter((obj) => obj.param === this.dataModel.minBar);
        this.rawData.map((d) => {
            if (d.TotalDeaths > this.dataModel.minBar) {
                tempData.push(d);
            } else {
                return;
            }
        });
        this.processedData = tempData;
    }

    private sortData() {
        let type = this.dataModel.sortedBy.filter(
            (element) => element.value === true
        );
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
    }

    private setXaxisText() {
        console.log('will generate text some day');
    }

    private createGraph(): void {
        let dataModel = this.dataModel;

        document.getElementById('svg-container').innerHTML = '';
        this.svg = d3
            .select('.svg-container')
            .append('svg')
            .classed('svg-content', true)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '-70 -50 800 450')
            .attr('padding', 50)
            .classed('svg-content-responsive', true)
            .append('g');

        let showParam = this.dataModel.dataParams.filter(
            (obj) => obj.value === true
        );

        let tooltip = d3
            .select('.svg-container')
            .append('div')
            .attr('class', 'tooltip')
            .style('z-index', '10')
            .style('opacity', 0)
            .style('padding', '10px')
            .style('background', 'rgba(0,0,0,0.6)')
            .style('color', '#fff');

        

        if (this.dataModel.selectedCountry === 'world') {
            this.xAxis = d3
                .scaleBand()
                .range([0, this.width])
                .domain(this.processedData.map((d) => d.Slug))
                .padding(0.2);

            this.svg
                .append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3.axisBottom(this.xAxis))
                .selectAll('text')
                .attr('transform', 'translate(-10,0)rotate(-35)')
                .style('text-anchor', 'end');
        } else {
            this.xAxis = d3
                .scaleBand()
                .range([0, this.width])
                .domain(this.processedData.map((d) => d.Date));

            this.svg
                .append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3.axisBottom(this.xAxis))
                .selectAll('text')
                .remove();
        }

        this.yAxis = d3
            .scaleLinear()
            .domain([0, d3.max(this.processedData, (d) => d[showParam[0].param])])
            .range([this.height, 0]);

        this.svg.append('g').call(d3.axisLeft(this.yAxis));

        this.svg
            .selectAll('.bar')
            .data(this.processedData)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('width', this.xAxis.bandwidth())
            .attr('height', (data) => this.height - this.yAxis(data[showParam[0].param]))
            .attr('x', (data) => {
                if (this.dataModel.selectedCountry === 'world') {
                    return this.xAxis(data.Slug);
                } else {
                    return this.xAxis(data.Date);
                }
            })
            .attr('y', (data) => this.yAxis(data[showParam[0].param]))
            .attr('fill', showParam[0].color)
            // .axis().tickFormat("")

            .on('mouseover', function (d, i) {
                d3.select(this).transition().attr('fill', 'red');
                tooltip
                    .style('pointer-events', 'none')
                    .style('opacity', 1)

                if (dataModel.selectedCountry === 'world') {
                    tooltip.html(`<div>Country: ${i.Country}<br> ${showParam[0].name}: ${i[showParam[0].param]}</div>`);
                } else {
                    tooltip.html(`<div>Date: ${i.Date.substring(0, 10)}<br> ${showParam[0].name}: ${i[showParam[0].param]}</div>`);
                }
            })
            
            .on('mousemove', function (event, i) {
                const [x, y] = d3.pointer(event);
                tooltip
                    .style('left', event.offsetX + 10 + 'px')
                    .style('top', event.offsetY - 30 + 'px');
            })

            .on('mouseout', function () {
                tooltip.html(``).style('opacity', 0);
                d3.select(this).transition().attr('fill', showParam[0].color);
            });
    }
}
