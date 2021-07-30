export interface CovidSummary {
    ID: string;
    message: string;
    Global: CovidSummaryGlobal[];
    Countries: CovidSummaryCountries[];
    Date: string;
}

export interface CovidSummaryGlobal {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
}

export interface CovidSummaryCountries {
    ID: string;
    Country: string,
    CountryCode: string,
    Slug: string,
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number
    TotalRecovered: number;
    Date: string;
    Premium: CovidSummaryPremium;
}

export interface CovidSummaryPremium {
    CountryStats: CovidSummaryCountryStats;
}

export interface CovidSummaryCountryStats {
    ID: string;
    CountryISO: string;
    Country: string;
    Continent: string;
    Population: number;
    PopulationDensity: number;
    MedianAge: number;
    Aged65Older: number;
    Aged70Older: number;
    ExtremePoverty: number;
    GdpPerCapita: number;
    CvdDeathRate: number;
    DiabetesPrevalence: number;
    HandwashingFacilities: number;
    HospitalBedsPerThousand: number;
    LifeExpectancy: number;
    FemaleSmokers: number;
    MaleSmokers: number;
}