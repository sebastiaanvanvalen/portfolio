// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';
import { MaterialModule } from './modules/material.module';

// components
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RpsComponent } from './components/portfolio/games/rps/rps.component';
import { MastermindComponent } from './components/portfolio/games/mastermind/mastermind.component';
import { ClocksComponent } from './components/portfolio/gadgets/clocks/clocks.component';
import { Clock01Component } from './components/portfolio/gadgets/clocks/clock01/clock01.component';
import { Clock02Component } from './components/portfolio/gadgets/clocks/clock02/clock02.component';
import { Clock03Component } from './components/portfolio/gadgets/clocks/clock03/clock03.component';
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MemoryComponent } from './components/portfolio/games/memory/memory.component';
import { SlotsComponent } from './components/portfolio/games/slots/slots.component';
import { ColorThemeComponent } from './components/color-theme/color-theme.component';
import { GadgetsComponent } from './components/portfolio/gadgets/gadgets.component';
import { CalculatorComponent } from './components/portfolio/gadgets/calculator/calculator.component';
import { CoronaDashboardComponent } from './components/portfolio/gadgets/coronaDashboard/coronaDashboard.component';
import { WorldSituationComponent } from './components/portfolio/gadgets/coronaDashboard/world-situation/world-situation.component';
import { GraphSelectionComponent } from './components/portfolio/gadgets/coronaDashboard/graphSelection/graphSelection.component';
import { MybirdsComponent } from './components/portfolio/mybirds/mybirds.component';
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
import { SlotsMachine } from './components/portfolio/games/slots/classes/SlotsMachine';
import { Calculator } from './components/portfolio/gadgets/calculator/classes/Calculator';
import { Clock } from './components/portfolio/gadgets/clocks/classes/Clock';
import { HappyBallsComponent } from './components/portfolio/gadgets/happyBalls/happyBalls.component';
import { GamesComponent } from './components/portfolio/games/games.component';
import { GameBoardComponent } from './components/portfolio/games/doodlesMultiPlayer/gameBoard/gameBoard.component';
import { PlayerComponent } from './components/portfolio/games/doodlesMultiPlayer/player/player.component';
import { DiceBoardComponent } from './components/portfolio/games/doodlesMultiPlayer/diceBoard/diceBoard.component';
import { TableTilesComponent } from './components/portfolio/games/doodlesMultiPlayer/tableTiles/tableTiles.component';
import { TileComponent } from './components/portfolio/games/doodlesMultiPlayer/Tile/Tile.component';
import { DieComponent } from './components/portfolio/games/doodlesMultiPlayer/die/die.component';
import { DoodleLobbyComponent } from './components/portfolio/games/doodlesMultiPlayer/doodleLobby/doodleLobby.component';
import { DoodlesMultiPlayerComponent } from './components/portfolio/games/doodlesMultiPlayer/doodlesMultiPlayer.component';
import { SocketService } from './services/socket.service';
import { SocketIoService } from './services/socketio.service';


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
    CoronaDashboardComponent,
    WorldSituationComponent,
    GraphSelectionComponent,
    SlotsComponent,
    MemoryComponent,
    HappyBallsComponent,
    GamesComponent,
    DoodlesMultiPlayerComponent,
    DoodleLobbyComponent,
    GameBoardComponent,
    PlayerComponent,
    DiceBoardComponent,
    TableTilesComponent,
    TileComponent,
    DieComponent,

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
  providers: [Calculator, Clock, ModalService, HttpService, BarChartService, SlotsMachine, SocketService, SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
