import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from './feedback';
import { NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  feedbackModel = new Feedback();
  constructor(private http:HttpClient, private router:Router,private _authservice:AuthService){}
  
  feedback(){
    this._authservice.sendfeedback(this.feedbackModel)
    .subscribe(
      res=>{
        console.log(res)
        this.router.navigate(['dashboard']);
      },
      err=>{console.log(err)}
    )
  }
  ngOnInit(): void {

  }
  

}
