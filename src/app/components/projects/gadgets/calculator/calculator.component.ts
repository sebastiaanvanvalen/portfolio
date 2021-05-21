import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
    currentNumber: string = "Hello";
    currentArray: [];
    historyArray: [];

    constructor(private TitleService: Title) {
        this.TitleService.setTitle('Calculator - baxxie.nl');
    }

    ngOnInit(): void {}

    pushButton(event) {
        let btn = event.target.id
        if (btn !== '') {
            switch (btn) {
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    if (this.currentNumber) {
                        this.currentNumber += btn 
                    } else {

                        return
                    }
            }

            console.log(event.target.id);
        }
    }
}


// var curVal, prevVal, pressedOp, newInputToggle, display, storedOp, doTheMath, ans, displayLength, mem;
// curVal = prevVal = storedOp, calcActive = null;
// newInputToggle = true;
// display = $('#display');
// displayLength = 10;
// mem = 0;

// $(".numbers").click(function() {
//   if (newInputToggle) {
//     display.val('');
//     newInputToggle = false;
//     calcActive = true;
//     storedOp = pressedOp;
//   }

//   if (display.val().length < 10 && ($(this).text() !== '.' || (display.val().match(/\./g) || []).length < 1)) {
//     display.val((display.val() + $(this).text())
//       .replace(/^0*\./, '0.'))
//   }
// });

// $('.op').click(function() {
//   pressedOp = $(this).text()
//   newInputToggle = true;
//   if (!prevVal) {
//         prevVal = parseFloat(display.val(), 10);
//     calcActive = false;
//   } 
  
//   else if (calcActive) {
//     curVal = parseFloat(display.val(), 10);
//     ans = doTheMath[storedOp](prevVal, curVal)
//     display.val(truncateAns(ans));
//     calcActive = false;
    

//     if (pressedOp === '=') {
//       prevVal = null;
//     } else {
//       prevVal = parseFloat(display.val(), 10);
//     }
//   }
// });

// doTheMath = {
//   '\u002B': function(a, b) {
//     return a + b;
//   },
//   '\u2212': function(a, b) {
//     return a - b;
//   },
//   '\u00D7': function(a, b) {
//     return a * b;
//   },
//   '\u00F7': function(a, b) {
//     return a / b;
//   },
//   '=': function(a, b) {
//     return b;
//   }
// };

// $('#clear-all').click(function() {
//   curVal = prevVal = storedOp = null;
//   newInputToggle = true;
//   display.val('0');
// });

// $('.mem-key').click(function(){
//   var pressedmem = $(this).text();
//  switch (pressedmem) {     
//     case 'm+':
//       mem += parseFloat(display.val(),10);
//       newInputToggle = true;
//       break;
//     case 'm-':
//       mem -= parseFloat(display.val(),10);
//       newInputToggle=true;
//       break;
//     case 'mc':
//       mem = 0;
//       break;
//     case 'mr':
//       display.val(mem);
//       newInputToggle=true;
//       calcActive = true;
//       storedOp = pressedOp;
//   }
  
//   if (mem) {
//     $('#mem-indicator').text('M');
//   } else {
//     $('#mem-indicator').text('');
//   }
// });

// $('#plus-min').click(function(){
//   display.val(0 - display.val())
  
//   console.log(display.val());

// });

// function truncateAns(num) {
//   if (num === Infinity){
//     return '8008135'
//   } else if (num > Math.pow(10, displayLength - 1)) {
//     return num.toExponential(displayLength - 5).toString().
//     replace(/\.0+e/, 'e');
//   } else if (num.toString().length >= displayLength) {
//     return num.toFixed(displayLength - Math.round(num).toString().length - 1).
//     toString().
//     replace(/\.0+e/, 'e');
//   } else {
//     return num;
//   }
// }
