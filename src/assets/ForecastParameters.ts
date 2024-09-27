export class ForecastParameters {
    private _lat: number;
    private _lon: number;
    private _date: Date;

    public constructor(lat: number, lon: number, date: Date) {
        this.lat = lat;
        this.lon = lon;
        this.date = date;
    }
  
    get lat(): number {
        return this._lat;
    }
  
    set lat(value: number) {
          this._lat = value;
    }
  
    get lon(): number {
        return this._lon;
    }
  
    set lon(value: number) {
        this._lon = value;
    }
  
    get date(): Date {
        return this._date;
    }
  
    set date(value: Date) {
          this._date = value;
    }

    equals(other: ForecastParameters): boolean {
        return this.lat === other.lat && this.lon === other.lon && this.date.getTime() === other.date.getTime();
    }
}