import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(private TitleService: Title) {
    this.TitleService.setTitle('Games - baxxie.nl')

  }

  ngOnInit() {
  }

}
