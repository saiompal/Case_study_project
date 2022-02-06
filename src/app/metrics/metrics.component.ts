import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  public pro:boolean=false;
  pe_ratio:string;
  dividend_pre_share:string;
  div_yield:string;
  debt_to_equity:string;
  buy:number;
  constructor(private http: HttpClient, private router: Router,private _authservice:AuthService) { }
  @Input('stock') public name:string;

  ngOnInit(): void {
    if(localStorage.getItem('Type')==="pro"){
      this.pro=true;
    }
    this.fetchmetric();

  }
  ngOnChanges(): void{
    this.fetchmetric();

  }
  fetchmetric(){
    this._authservice.getmetric(this.name)
    .subscribe(
      res=>{
        
        this.pe_ratio=parseFloat(res[0]['peRatioTTM']).toFixed(2);
        this.div_yield = parseFloat(res[0]['dividendYieldTTM']).toFixed(2);
        this.debt_to_equity =parseFloat(res[0]['debtEquityRatioTTM']).toFixed(2);
        this.dividend_pre_share=parseFloat(res[0]['dividendPerShareTTM']).toFixed(2);
        this.buy = 75;
      },
      err=>{console.log(err)}
    )
  }

}
