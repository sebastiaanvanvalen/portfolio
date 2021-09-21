export interface DataModel {
    selectedCountry: string;
    updatedOn: string;
    dataParams: dataParams[];
    sortedBy: sortType[];
    minBar: number;
}

interface dataParams {
    param: string;
    name: string;
    value: boolean;
    color: string;
}

interface sortType {
    type: string;
    value: ConstrainBoolean;
}
