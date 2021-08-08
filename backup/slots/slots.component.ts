import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  constructor(private TitleService: Title) {
    this.TitleService.setTitle('Slots Machine - baxxie.nl')
   }

  ngOnInit() {
  }

}
