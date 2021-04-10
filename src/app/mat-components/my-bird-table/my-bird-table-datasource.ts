import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Injectable } from '@angular/core';


export interface MyBirdTableItem {
    birdId: number;
    birdName: string;
    location: string;
    picture: boolean;
    link: string;
    date: string;
}


// const EXAMPLE_DATA: MyBirdTableItem[] = [
//     {
//         id: 1,
//         name:
//             '<a href="https://nl.wikipedia.org/wiki/Witbuikzeearend" style="color: black;" target="_blank">Witbuik Zeearend</a>',
//         location: 'Indonesia',
//         date: '2019',
//     },
//     {
//         id: 3,
//         name: 'Baardman',
//         location: 'Nederland',
//         date: '2009',
//     },
//     {
//         id: 4,
//         name: 'Europese Zeearend',
//         location: 'Nederland',
//         date: '2016',
//     },
//     {
//         id: 5,
//         name: 'Zwarte Specht',
//         location: 'Zweden',
//         date: '2017',
//     },
//     {
//         id: 7,
//         name: 'Lachstern',
//         location: 'Madeira',
//         date: '2008',
//     },
//     {
//         id: 8,
//         name: 'Azoren Vuurgoudhaan',
//         location: 'Azoren',
//         date: '2017',
//     },
//     {
//         id: 9,
//         name: 'Bonte Kraai',
//         location: 'Italie',
//         date: '2008',
//     },
//     {
//         id: 10,
//         name: 'Steenarend',
//         location: 'Oostenrijk',
//         date: '2007',
//     },
//     {
//         id: 11,
//         name: 'StrandLeeuwerik',
//         location: 'Schotland',
//         date: '2019',
//     },
//     {
//         id: 12,
//         name: 'Grote Zilerreiger',
//         location: 'Belgie',
//         date: '2003',
//     },
//     {
//         id: 13,
//         name: 'Raaf',
//         location: 'Engeland',
//         date: '1998',
//     },
//     {
//         id: 15,
//         name: 'Bijeneter',
//         location: 'Spanje',
//         date: '2007',
//     },
//     {
//         id: 16,
//         name: 'Sint Helenafazantje',
//         location: 'Azoren',
//         date: '2017',
//     },
//     {
//         id: 17,
//         name: 'Appelvink',
//         location: 'Frankrijk',
//         date: '2005',
//     },
//     {
//         id: 18,
//         name: 'Schots Sneeuwhoen',
//         location: 'Schotland',
//         date: '2019',
//     },
//     {
//         id: 20,
//         name: 'Aasgier',
//         location: 'Spanje',
//         date: '2007',
//     },
//     {
//         id: 21,
//         name: 'Goudplevier',
//         location: 'Nederland',
//         date: '2016',
//     },
//     {
//         id: 22,
//         name: 'Heilige Ibis',
//         location: 'Nederland',
//         date: '2004',
//     },
//     {
//         id: 23,
//         name: 'Kraanvogel',
//         location: 'Nederland',
//         date: '2021',
//     },
//     {
//         id: 24,
//         name: 'Krooneend',
//         location: 'Nederland',
//         date: '2013',
//     },
//     {
//         id: 25,
//         name: 'Oeverloper',
//         location: 'Zweden',
//         date: '2017',
//     },
//     {
//         id: 26,
//         name: 'Vuurgoudhaan',
//         location: 'Nederland',
//         date: '2014',
//     },
//     {
//         id: 28,
//         name: 'Zwarte Zeekoet',
//         location: 'Zweden',
//         date: '2017',
//     },
//     {
//         id: 29,
//         name: 'Heilige IJsvogel',
//         location: 'Indonesie',
//         date: '2019',
//     },
//     {
//         id: 30,
//         name: 'Parelhalstortel',
//         location: 'Indonesie',
//         date: '2019',
//     },
//     {
//         id: 32,
//         name: 'Kleine Fregatvogel',
//         location: 'Indonesie',
//         date: '2019',
//     },


// ];

/**
 * Data source for the ElementTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

@Injectable()
export class MyBirdTableDataSource extends DataSource<MyBirdTableItem> {
    // data: MyBirdTableItem[] = EXAMPLE_DATA;

    url:string = 'https://f655jvgct5.execute-api.eu-central-1.amazonaws.com/bird/birds';
    method:string= 'get'

    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;
    data: MyBirdTableItem[] = [];

    constructor() {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<MyBirdTableItem[]> {
        console.log(this)
        if (this.paginator && this.sort) {
            // Combine everything that affects the rendered data into one update
            // stream for the data-table to consume.

            return merge(
                observableOf(this.data),
                this.paginator.page,
                this.sort.sortChange
            ).pipe(
                map(() => {

                    return this.getPagedData(
                        this.getSortedData([...this.data])
                    );
                })
            );
        } else {
            throw Error(
                'Please set the paginator and sort on the data source before connecting.'
            );
        }
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void {}

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: MyBirdTableItem[]): MyBirdTableItem[] {
        if (this.paginator) {
            const startIndex =
                this.paginator.pageIndex * this.paginator.pageSize;

            return data.splice(startIndex, this.paginator.pageSize);
        } else {

            return data;
        }
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(data: MyBirdTableItem[]): MyBirdTableItem[] {
        if (!this.sort || !this.sort.active || this.sort.direction === '') {

            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort?.direction === 'asc';

            switch (this.sort?.active) {
                case 'birdId':
                    return compare(+a.birdId, +b.birdId, isAsc);
                case 'birdName':
                    return compare(a.birdName, b.birdName, isAsc);
                case 'location':
                    return compare(a.location, b.location, isAsc);
                case 'date':
                    return compare(+a.date, +b.date, isAsc);
                default:
                    return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
    a: string | number,
    b: string | number,
    isAsc: boolean
): number {

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
