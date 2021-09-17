import { Component, OnInit, HostListener } from '@angular/core';
import { Calculation } from './interfaces/calculation';
import { Calculator } from './classes/Calculator';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    
    @HostListener('window:keyup', ['$event'])
    buttonEvent(event: KeyboardEvent) {
        this.pushButton(event.key);
    }

    CalcData: Calculation = {
        mainDisplay: '0',
        arrayToDisplay: '',
        deepThought: false,
    };

    constructor(private Calculator: Calculator, private ModalService:ModalService) {}

    ngOnInit(): void {}

    pushButton(btn) {
        if (btn === '?' || btn === '') {
            return;
        }

        this.CalcData = this.Calculator.pushButton(btn);

        if (this.CalcData.deepThought === true) {
            this.ModalService.setTitle("Deep Thought was inspirired by...")
            this.ModalService.setBody(`“If I were a tree, I would have no reason to love a human.”
            <br><span style="font-weight: bold;">― Maggie Stiefvater, The Raven Boys</span>`);
            this.ModalService.createModal();
        }
    }
}
