import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-clocks',
  templateUrl: './clocks.component.html',
  styleUrls: ['./clocks.component.scss']
})
export class ClocksComponent implements OnInit {

    constructor(private TitleService: Title) {
        this.TitleService.setTitle('Clocks - baxxie.nl')
    }

  ngOnInit(): void {
  }

}
