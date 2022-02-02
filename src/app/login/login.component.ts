import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from './loginUser';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public type:string;
  userModel = new LoginUser('','');
  constructor(private http:HttpClient, private router:Router){}
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        this.type=a.type;
        return a.email === this.userModel.email && a.password===this.userModel.password;
      });
      if(user){
        localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYmFzaWMiLCJ1c2VybmFtZSI6InNhaW9tIiwiZW1haWwiOiJzYWlvbXBhbDEzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoic2Fpb21wYWwiLCJjb25maXJtcGFzc3dvcmQiOiJzYWlvbXBhbCIsImlkIjoxfQ.aURxvnXgKNLjG0quXDhY-Q-Wg60apYtKDemSDWOWlgo");
        localStorage.setItem('type',this.type);
        this.userModel= new LoginUser('example@gmail.com','');
        this.router.navigate(['dashboard']);
      }
      else{
        alert("Invalid Credentials");
      }
    },error=>{
      alert("Something went wrong");
    })
    
      }


  ngOnInit(): void {
  }

}

