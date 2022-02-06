import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';

@Component({

  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input("stock") public name: string;
  public chart_data: any;
  public stock_data: any[]=[];
  public data: any;
  constructor(private dataservice: DataService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.stock_data=[];
    this.getdata();
    this.fetch();
    
  }

  ngOnInit(): void {
    this.getdata();
    this.fetch();
  }

   public fetch(){
    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
      let date: string = Object.keys(this.data["Weekly Time Series"])[i];
      this.stock_data[i] =
      {
        time: new Date(date),
        open: parseFloat(this.data["Weekly Time Series"][date]['1. open']),
        high: parseFloat(this.data["Weekly Time Series"][date]['2. high']),
        low: parseFloat(this.data["Weekly Time Series"][date]['3. low']),
        close: parseFloat(this.data["Weekly Time Series"][date]['4. close']),
        volume: parseFloat(this.data["Weekly Time Series"][date]['5. volume'])
      }
    }
    this.stock_data.reverse();
    this.chart_data = [this.stock_data];
    }, 4000);
   }
   public  getdata() {
    this.dataservice.getdata(this.name).subscribe(
       (apidata) => {
      this.data = apidata;
    });
  }



}
