import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public register_url ="http://localhost:3000/api/register";
  public login_url = "http://localhost:3000/api/login";
  public watchlistarr_url = "http://localhost:3000/api/watchlistarr";
  public company_data_url ='http://localhost:3000/api/companydata';
  public watchlist_url = 'http://localhost:3000/api/watchlist';
  public delete_url = 'http://localhost:3000/api/delete';
  public feedback_url = 'http://localhost:3000/api/feedback';

  
  constructor(private http:HttpClient) { }
  sendfeedback(feedback:any){
    return this.http.post<any>(this.feedback_url,feedback);
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  registerUser(user: any){
    return this.http.post<any>(this.register_url,user);
  }
  loginUser(user: any){
    return this.http.post<any>(this.login_url,user);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  add_data_to_watchlist(company_ticker:string,username:string){
    return this.http.post<any>(this.watchlist_url,{"symbol":company_ticker,"username":username});
  }
  watchlist_arr(username:string){
    return this.http.post<any>(this.watchlistarr_url,{"username":username});
  }
  getcompany_data(companyname:string){
    return this.http.post<any>(this.company_data_url,{"companyname":companyname});
  }

  deleteRow(name:string,company:string){
    return this.http.post<any>(this.delete_url,{"name":name,"company":company});
  }

  getmetric(company:string){
    let url = `https://financialmodelingprep.com/api/v3/ratios-ttm/${company}?apikey=a472ca55816b2bcc853bb0464e563b1c`;
    return this.http.get<any>(url);

  }

}
