import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CalculatorService } from 'src/app/services/Calculator.service';
import { Calculation } from 'src/app/models/calculation';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})



export class CalculatorComponent implements OnInit {

    @HostListener('window:keyup', ['$event'])
    buttonEvent(event: KeyboardEvent) {
        // console.log(event)
        this.pushButton(event.key)
    }

    CalcData: Calculation = {
        mainDisplay: '0',
        arrayToDisplay: '',
        deepThought: false

    }

    constructor(
        private TitleService: Title,
        private Calculator: CalculatorService
    ) {
        this.TitleService.setTitle('Calculator - baxxie.nl');
    }

    ngOnInit(): void {}

    pushButton(btn) {
        // console.log(btn)
        if (btn ==="?" || btn ==="") {
            return
        }

        this.CalcData = this.Calculator.pushButton(btn)

        if (this.CalcData.deepThought === true) {
            console.log('incomming answer from deepThought')
            window.alert("the answer is 42, just as the answer to the question of Life, the Universe and Everything Else...")
            // prompt modal with * wisdom
        }
    }
}
