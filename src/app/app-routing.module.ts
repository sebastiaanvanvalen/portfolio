import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { RpsComponent } from './components/rps/rps.component';
import { ClocksComponent } from './components/clocks/clocks.component';
import { PokerComponent } from './components/poker/poker.component';
import { CvComponent } from './components/cv/cv.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'rps', component: RpsComponent},
    {path: 'clocks', component: ClocksComponent},
    {path: 'poker', component: PokerComponent},
    {path: 'cv', component: CvComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [

  ]
})
export class AppRoutingModule { }
