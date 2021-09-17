import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { RpsComponent } from './components/projects/rps/rps.component';
import { ClocksComponent } from './components/projects/clocks/clocks.component';
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';
import { MastermindComponent } from './components/projects/mastermind/mastermind.component';
import { MybirdsComponent } from './components/projects/mybirds/mybirds.component';
import { GadgetsComponent } from './components/projects/gadgets/gadgets.component';
import { CoronaDashboardComponent } from './components/projects/coronaDashboard/coronaDashboard.component';
import { SlotsComponent } from './components/projects/slots/slots.component';
import { MemoryComponent } from './components/projects/memory/memory.component';
import { HappyBallsComponent } from './components/projects/gadgets/happyBalls/happyBalls.component';

const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'rps', component: RpsComponent },
    { path: 'clocks', component: ClocksComponent },
    { path: 'slots', component: SlotsComponent },
    { path: 'cv', component: CvComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'mastermind', component: MastermindComponent },
    { path: 'mybirds', component: MybirdsComponent },
    { path: 'gadgets', component: GadgetsComponent},
    { path: 'coronaDashboard', component: CoronaDashboardComponent},
    { path: 'memory', component: MemoryComponent},
    { path: 'happyBalls', component: HappyBallsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [

  ]
})
export class AppRoutingModule { }
