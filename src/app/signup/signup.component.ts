import { Component, OnInit } from '@angular/core';
import { User } from './users';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userModel = new User('basic','','example@gmail.com','','');
  constructor(private http:HttpClient, private router:Router,private _auth:AuthService){}
  // signup(){
  //   this.http.post<any>("http://localhost:3000/signupUsers",this.userModel)
  //   .subscribe(res=>{
  //     alert("signup successfull");
  //     localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYmFzaWMiLCJ1c2VybmFtZSI6InNhaW9tIiwiZW1haWwiOiJzYWlvbXBhbDEzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2Fpb21wYWwiLCJjb25maXJtcGFzc3dvcmQiOiJzYWlvbXBhbCIsImlkIjoxfQ.aURxvnXgKNLjG0quXDhY-Q-Wg60apYtKDemSDWOWlgo");
  //     this.userModel= new User('basic','','example@gmail.com','','');
  //     this.router.navigate(['login']);
  //   },error=>{
  //     alert("Failure");
  //   })
  //  }
  registerUser(){
    this._auth.registerUser(this.userModel)
    .subscribe(
      res=>{
        console.log(res)
        localStorage.setItem("token",res.token);
        this.router.navigate(['login']);
      },
      err=>console.log(err)
    )
  }
  ngOnInit(): void {
    
  }
  
}
