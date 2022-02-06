import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { 
	IgxFinancialChartModule,
	IgxLegendModule
 } from "igniteui-angular-charts";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsComponent } from './charts/charts.component';
import { MetricsComponent } from './metrics/metrics.component';
import { FormsModule } from '@angular/forms';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ContactusComponent } from './contactus/contactus.component';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChartsComponent,
    MetricsComponent,
    WatchlistComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    ContactusComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IgxFinancialChartModule,
	  IgxLegendModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
