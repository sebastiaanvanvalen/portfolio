import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { RpsComponent } from './components/projects/rps/rps.component';
import { ClocksComponent } from './components/projects/clocks/clocks.component';
import { PokerComponent } from './components/projects/poker/poker.component';
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';
import { MastermindComponent } from './components/projects/mastermind/mastermind.component';
import { MybirdsComponent } from './components/projects/mybirds/mybirds.component';

const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'rps', component: RpsComponent },
    { path: 'clocks', component: ClocksComponent },
    { path: 'poker', component: PokerComponent },
    { path: 'cv', component: CvComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'mastermind', component: MastermindComponent },
    { path: 'mybirds', component: MybirdsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [

  ]
})
export class AppRoutingModule { }
