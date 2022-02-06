import { HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../auth.service';
export interface StockData {
  id: number;
  company: string;
  stock_price: number;
  percentage_change: number;
  action:string;
}

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  displayedColumns: string[] = ['id', 'company', 'stock_price', 'percentage_change','action'];
  dataSource: MatTableDataSource<StockData>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public username:any = "adim";
  public watchlist_arr:any;
  public company_data:any[]=[];
  // public data:StockData[]=[
  //   {no:1, company:'Apple', stock_price:1000,percentage_change:-1.2,action:"Delete"},
  //   {no:2, company:'Microsoft', stock_price:2000,percentage_change:-1.2,action:"Delete"},
  //   {no:3, company:'Walmart', stock_price:3000,percentage_change:-1.2,action:"Delete"},
  //   {no:4, company:'Tesla', stock_price:1220,percentage_change:-1.2,action:"Delete"},
  //   {no:5, company:'Meta', stock_price:800,percentage_change:-1.2,action:"Delete"}
    
  // ]
  
  constructor(private http:HttpClient, private _authservice:AuthService) {
      
  }

  ngOnInit(){
    this.username = localStorage.getItem('user');
    this._authservice.watchlist_arr(this.username)
    .subscribe(
      res=>{this.watchlist_arr=res},
      err=>{console.log(err)}
    )
    
    setTimeout(()=>{
      for(let i=0;i<this.watchlist_arr.length;i++){
        this._authservice.getcompany_data(this.watchlist_arr[i])
        .subscribe(
          res=>{
            this.company_data[i]={
              id:i,
              company:res['company'],
              stock_price:res['price'],
              percentage_change:res['change_percent']
            }
          },
          err=>(console.log(err))
        )
        // setTimeout(()=>console.log(this.company_data[i]),2000)
      }
      console.log(typeof this.watchlist_arr[0])
    },1000)

    setTimeout(()=>{this.dataSource = new MatTableDataSource(this.company_data);},2000);
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  del(row:any){
    console.log(row)
    this.dataSource.data.splice(row.id,1);
    this.dataSource.filter="";

    let company_name = ""+localStorage.getItem('user');
    this._authservice.deleteRow(company_name,row.company)
    .subscribe(
      res=>{console.log(res)},
      err=>{console.log(err)}
    )
  }
}

