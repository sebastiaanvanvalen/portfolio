import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MyBirdTableDataSource, MyBirdTableItem } from './my-bird-table-datasource';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-my-bird-table',
    templateUrl: './my-bird-table.component.html',
    styleUrls: ['./my-bird-table.component.scss'],
})
export class MyBirdTableComponent implements AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable<MyBirdTableItem>;
    dataSource = new MatTableDataSource<MyBirdTableDataSource>();

    url:string = 'https://f655jvgct5.execute-api.eu-central-1.amazonaws.com/bird/birds';

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['birdId', 'birdName', 'location', 'date'];
    constructor(private httpService: HttpService) { }
    
    ngOnInit(): void {
        let nr = 1;
        this.httpService.makeGetAllRequest(this.url).subscribe(res => {
            res['birds'].forEach(element => {
                
                element['birdId'] = nr;
                // this.dataSource.data.push(element)
                nr ++;
                console.log(this.dataSource.data)
            });
            this.dataSource.data = res['birds'];
        })

        // setTimout() necessary to prevent error reading sort asc/desc value
        // setTimeout(() => {
        //     this.sort.sort(({ id: 'birdId', start: 'asc'}) as MatSortable)
        // }, 500

        // )
    }
    
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.table.dataSource = this.dataSource;
    }
}
