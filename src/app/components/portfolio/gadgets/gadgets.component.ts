import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.scss']
})
export class GadgetsComponent implements OnInit {

  constructor(private TitleService: Title) {
    this.TitleService.setTitle('Gadgets - baxxie.nl')
   }

  ngOnInit(): void {
  }

}
