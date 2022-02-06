import { Component, OnInit, Output,OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  public details: string;
  public name: string = "TSLA";
  public watchlist_arr:string[] =[];
  public username:any;
  public hide:boolean=false;
  constructor(private _authservice:AuthService) { }
  
  onSubmit(f: NgForm) {
    console.log(f.value.search);
    this.name = f.value.search;
  }
  addtoWatchlist(w:NgForm){
    let username:any = localStorage.getItem('user')
    this._authservice.add_data_to_watchlist(this.name,username)
    .subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }
  ngOnInit():void{
    this.username = localStorage.getItem('user');
    this._authservice.watchlist_arr(this.username)
    .subscribe(
      res=>{this.watchlist_arr=res},
      err=>{console.log(err)}
    )
    setTimeout(() => {
      for(let i=0;i<this.watchlist_arr.length;i++){
      if(this.watchlist_arr[i]===this.name){
        this.hide=true;
      }
    }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.hide =false;
    this.username = localStorage.getItem('user');
    this._authservice.watchlist_arr(this.username)
    .subscribe(
      res=>{this.watchlist_arr=res},
      err=>{console.log(err)}
    )
    setTimeout(() => {
      for(let i=0;i<this.watchlist_arr.length;i++){
      if(this.watchlist_arr[i]===this.name){
        this.hide=true;
      }
    }
    console.log(this.hide);
    }, 1000);
  }
  

}
