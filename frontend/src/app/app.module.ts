import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LearnComponent } from './learn/learn/learn.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { TutorComponent } from './tutor/tutor.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    LearnComponent,
    ProfileComponent,
    TutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
