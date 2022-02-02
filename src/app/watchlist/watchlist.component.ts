import { HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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


  // public data:StockData[]=[
  //   {no:1, company:'Apple', stock_price:1000,percentage_change:-1.2,action:"Delete"},
  //   {no:2, company:'Microsoft', stock_price:2000,percentage_change:-1.2,action:"Delete"},
  //   {no:3, company:'Walmart', stock_price:3000,percentage_change:-1.2,action:"Delete"},
  //   {no:4, company:'Tesla', stock_price:1220,percentage_change:-1.2,action:"Delete"},
  //   {no:5, company:'Meta', stock_price:800,percentage_change:-1.2,action:"Delete"}
    
  // ]
  
  constructor(private http:HttpClient) {
      
  }

  ngOnInit(): void {
    this.http.get<any>("http://localhost:3000/watchList")
    .subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      console.log(res);
    },error=>{
      alert("Something went wrong");
    })  
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  del(row:any){
    
    this.http.delete<any>(`http://localhost:3000/watchList/${row.id}`)
    .subscribe(res=>{
      
    })
    this.http.get<any>("http://localhost:3000/watchList")
    .subscribe(res=>{
      this.dataSource = new MatTableDataSource(res);
      
    },error=>{
      alert("Something went wrong");
    }) 

  }
}

