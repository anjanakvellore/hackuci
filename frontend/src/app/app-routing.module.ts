import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {LearnComponent} from './learn/learn/learn.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {HomeComponent} from './home/home/home.component';
import {TutorComponent} from './tutor/tutor.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent },    
  { path: 'learn', component: LearnComponent },    
  { path: 'profile', component: ProfileComponent },
  { path:'mentor',component:TutorComponent} 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
