import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LearnComponent } from './learn/learn/learn.component';
import { ProfileComponent } from './profile/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    NavbarComponent,
    DashboardComponent,
    LearnComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
