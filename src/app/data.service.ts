import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  ticker_symbol:string;
  constructor(private http: HttpClient) { }

  public  getdata(symbol:string) {
    this.ticker_symbol=symbol;
    let url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_WEEKLY&symbol=${this.ticker_symbol}&datatype=json`;
    return this.http.get(url, {
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '423672ab56mshc8f8270f6c85ac6p10a188jsn2ee3b1e6bfca'
      }
    });
  }
}
