import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home/home.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {LearnComponent} from './learn/learn/learn.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {ContactCardComponent} from './learn/contact-card/contact-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {TutorFilterPipe} from './learn/tutorFilter/tutor-filter.pipe';
import {TutorComponent} from './tutor/tutor.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    LearnComponent,
    ProfileComponent,
    ContactCardComponent,
    TutorFilterPipe,
    TutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
