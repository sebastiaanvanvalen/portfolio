import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-unitconvertor',
  templateUrl: './unitconvertor.component.html',
  styleUrls: ['./unitconvertor.component.scss']
})
export class UnitconvertorComponent implements OnInit {

    constructor(private TitleService: Title) { 
        this.TitleService.setTitle('Converter - baxxie.nl'
        )
      }

  ngOnInit(): void {
  }

}
