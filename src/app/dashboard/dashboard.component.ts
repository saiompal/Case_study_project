import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public details: string;
  public name: string = "TCS";
  constructor() { }


  onSubmit(f: NgForm) {
    console.log(f.value.search);
    this.name = f.value.search;
    if (this.name === "ICICIBANK") {
      this.details="ICICI Bank Limited is an Indian multinational bank and financial services company headquartered in the city of Vadodara, Gujarat.";
    }
    else if (this.name === "BAJFINANCE") {
      this.details="Bajaj Finance Limited, a subsidiary of Bajaj Finserv, is an Indian non-banking financial company headquartered in the city of Pune, India. The company deals in consumer finance, SME and commercial lending, and wealth management.";
    }
  }


  ngOnInit(): void {
    if (this.name === "TCS") {
      this.details = "Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai, Maharashtra, India with its largest campus located in Chennai, Tamil Nadu, India. As of February 2021, TCS is the largest IT services company in the world by market capitalisation.";
    }
    else if (this.name === "ICICIBANK") {
      this.details="ICICI Bank Limited is an Indian multinational bank and financial services company headquartered in the city of Vadodara, Gujarat.";
    }
    else if (this.name === "BAJFFINANCE") {
      this.details="Bajaj Finance Limited, a subsidiary of Bajaj Finserv, is an Indian non-banking financial company headquartered in the city of Pune, India. The company deals in consumer finance, SME and commercial lending, and wealth management.";
    }
  }

}
