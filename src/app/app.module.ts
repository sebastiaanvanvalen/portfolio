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
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MemoryComponent } from './components/projects/memory/memory.component';
import { SlotsComponent } from './components/projects/slots/slots.component';
import { ColorThemeComponent } from './components/color-theme/color-theme.component';
import { GadgetsComponent } from './components/projects/gadgets/gadgets.component';
import { CalculatorComponent } from './components/projects/gadgets/calculator/calculator.component';
import { UnitconvertorComponent } from './components/projects/gadgets/unitconvertor/unitconvertor.component';
import { CoronaDashboardComponent } from './components/projects/coronaDashboard/coronaDashboard.component';
import { WorldSituationComponent } from './components/projects/coronaDashboard/world-situation/world-situation.component';
import { GraphSelectionComponent } from './components/projects/coronaDashboard/graphSelection/graphSelection.component';
import { MybirdsComponent } from './components/projects/mybirds/mybirds.component';
import { MyBirdTableComponent } from './mat-components/my-bird-table/my-bird-table.component';

// services
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ModalService } from './services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './services/http.service';
import { BarChartService } from './services/bar-chart.service';

// classes
import { SlotsMachine } from './components/projects/slots/classes/SlotsMachine';
import { Calculator } from './components/projects/gadgets/calculator/classes/Calculator';
import { Clock } from './components/projects/clocks/classes/Clock';
import { HappyBallsComponent } from './components/projects/gadgets/happyBalls/happyBalls.component';


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
    CvComponent,
    AboutComponent,
    MastermindComponent,
    MybirdsComponent,
    MyBirdTableComponent,
    ColorThemeComponent,
    GadgetsComponent,
    CalculatorComponent,
    UnitconvertorComponent,
    CoronaDashboardComponent,
    WorldSituationComponent,
    GraphSelectionComponent,
    SlotsComponent,
    MemoryComponent,
    HappyBallsComponent

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
  providers: [Calculator, Clock, ModalService, HttpService, BarChartService, SlotsMachine],
  bootstrap: [AppComponent]
})
export class AppModule { }
