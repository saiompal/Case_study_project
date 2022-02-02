import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  public pro:boolean=false;
  pe_ratio:number;
  pb_ratio:number;
  div_yield:number;
  sector_pe:number;
  buy:number;
  constructor(private http: HttpClient, private router: Router) { }
  @Input('stock') public name:string;

  ngOnInit(): void {
    if(localStorage.getItem('type')==="pro"){
      this.pro=true;
    }
    console.log(this.pro);
  }
  ngOnChanges(): void{
    if(this.name==="TCS"){
      this.pe_ratio=42.09;
      this.pb_ratio=15.67;
      this.div_yield=1.03;
      this.sector_pe=37.39;
      this.buy=59;
    }
    else if(this.name==="ICICIBANK"){
      this.pe_ratio=29.51;
      this.pb_ratio=3.24;
      this.div_yield=0.56;
      this.sector_pe=27.32;
      this.buy=100;
    }
    else if(this.name==="BAJFINANCE"){
      this.pe_ratio=93.69;
      this.pb_ratio=11.22;
      this.div_yield=0.15;
      this.sector_pe=27.32;
      this.buy=59;
    }

  }

}
