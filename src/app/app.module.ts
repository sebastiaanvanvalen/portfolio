import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ClickOutsideModule } from 'ng-click-outside';


import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { RpsComponent } from './components/rps/rps.component';
import { ClocksComponent } from './components/clocks/clocks.component';
import { Clock01Component } from './components/clocks/clock01/clock01.component';
import { Clock02Component } from './components/clocks/clock02/clock02.component';
import { PokerComponent } from './components/poker/poker.component';
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';
import { ContactService } from './services/contact.service';
import { DropdownDirective } from './directives/dropdown.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MastermindComponent } from './components/mastermind/mastermind.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';


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
    DropdownDirective,
    MastermindComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatMenuModule,
    ClickOutsideModule

  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
