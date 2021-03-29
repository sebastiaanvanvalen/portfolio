// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';
import { MaterialModule } from './modules/material/material.module';


// components
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RpsComponent } from './components/projects/rps/rps.component';
import { MastermindComponent } from './components/projects/mastermind/mastermind.component';
import { ClocksComponent } from './components/projects/clocks/clocks.component';
import { Clock01Component } from './components/projects/clocks/clock01/clock01.component';
import { Clock02Component } from './components/projects/clocks/clock02/clock02.component';
import { PokerComponent } from './components/projects/poker/poker.component';
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

// services
import { ContactService } from './services/contact.service';
import { MybirdsComponent } from './components/projects/mybirds/mybirds.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent,
    ContactComponent,
    RpsComponent,
    ClocksComponent,
    Clock01Component,
    Clock02Component,
    PokerComponent,
    CvComponent,
    AboutComponent,
    MastermindComponent,
    MybirdsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
