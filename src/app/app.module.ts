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
import { Clock03Component } from './components/projects/clocks/clock03/clock03.component';
import { PokerComponent } from './components/projects/poker/poker.component';
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyformsComponent } from './components/projects/myforms/myforms.component';

// services
import { ContactService } from './services/contact.service';
import { MybirdsComponent } from './components/projects/mybirds/mybirds.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MyBirdTableComponent } from './mat-components/my-bird-table/my-bird-table.component';
import { ModalService } from './services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './services/http.service';
import { ColorThemeComponent } from './components/color-theme/color-theme.component';



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
    Clock03Component,
    PokerComponent,
    CvComponent,
    AboutComponent,
    MastermindComponent,
    MybirdsComponent,
    MyBirdTableComponent,
    MyformsComponent,
    ColorThemeComponent,

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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,

  ],
  providers: [ContactService, ModalService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
