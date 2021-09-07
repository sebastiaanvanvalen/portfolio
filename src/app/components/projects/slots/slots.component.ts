import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  constructor(private TitleService: Title, private ModalService: ModalService) {
    this.TitleService.setTitle('Slots Machine - baxxie.nl')
   }

  ngOnInit() {
  }
}
