import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AboutComponent } from './components/about/about.component';

import { MybirdsComponent } from './components/portfolio/mybirds/mybirds.component';
import { ClocksComponent } from './components/portfolio/gadgets/clocks/clocks.component';

import { GamesComponent } from './components/portfolio/games/games.component';
import { MastermindComponent } from './components/portfolio/games/mastermind/mastermind.component';
import { MemoryComponent } from './components/portfolio/games/memory/memory.component';
import { SlotsComponent } from './components/portfolio/games/slots/slots.component';
import { RpsComponent } from './components/portfolio/games/rps/rps.component';

import { CoronaDashboardComponent } from './components/portfolio/gadgets/coronaDashboard/coronaDashboard.component';
import { GadgetsComponent } from './components/portfolio/gadgets/gadgets.component';
import { HappyBallsComponent } from './components/portfolio/gadgets/happyBalls/happyBalls.component';

import { CvComponent } from './components/cv/cv.component';
import { ContactComponent } from './components/contact/contact.component';
import { CalculatorComponent } from './components/portfolio/gadgets/calculator/calculator.component';

// import { DoodlesComponent } from './components/portfolio/games/doodles/doodles.component';
import { DoodlesMultiPlayerComponent } from './components/portfolio/games/doodlesMultiPlayer/doodlesMultiPlayer.component';
import { DoodleLobbyComponent } from './components/portfolio/games/doodlesMultiPlayer/doodleLobby/doodleLobby.component';


const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'about', component: AboutComponent },
    { path: 'mybirds', component: MybirdsComponent },

    { path: 'games', component: GamesComponent},
    { path: 'mastermind', component: MastermindComponent },
    { path: 'rps', component: RpsComponent },
    { path: 'slots', component: SlotsComponent },
    { path: 'memory', component: MemoryComponent},
    // { path: 'doodles', component: DoodlesComponent },
    { path: 'doodlesMultiPlayer', component: DoodlesMultiPlayerComponent},
    { path: 'doodlesLobby', component: DoodleLobbyComponent},

    { path: 'gadgets', component: GadgetsComponent},
    { path: 'clocks', component: ClocksComponent },
    { path: 'coronaDashboard', component: CoronaDashboardComponent},
    { path: 'happyBalls', component: HappyBallsComponent},
    { path: 'calculator', component: CalculatorComponent},

    { path: 'contact', component: ContactComponent },
    { path: 'cv', component: CvComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [

  ]
})
export class AppRoutingModule { }
