import { Component, OnInit,ChangeDetectionStrategy, Input } from '@angular/core';
import icici from '../../assets/ICICIBANK.json';
import tcs from '../../assets/TCS.json';
import bajaj from '../../assets/BAJFINANCE.json';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input("stock") public name: string;
  public data:any;
  
    constructor() {

    }

  ngOnInit(): void {
    console.log(this.name);
      if(this.name==="ICICIBANK"){
        this.data=icici;
      }
      else if(this.name=="TCS"){
        this.data=tcs;
      }
      else if(this.name==="BAJFINANCE"){
        this.data=bajaj;
      }
  }
  ngOnChanges(){
    if(this.name==="ICICIBANK"){
      this.data=icici;
    }
    else if(this.name=="TCS"){
      this.data=tcs;
    }
    else if(this.name==="BAJFINANCE"){
      this.data=bajaj;
    }
  }

}
