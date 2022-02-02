import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from './feedback';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  feedbackModel = new Feedback();
  constructor(private http:HttpClient, private router:Router){}
  feedback(){
    this.http.post<any>("http://localhost:3000/feedback",this.feedbackModel)
    .subscribe(res=>{
      alert("feedback Submitted");
      this.router.navigate(['dashboard']);
    },error=>{
      alert("Failure");
    })  
      }

  ngOnInit(): void {
  }
  

}
