// import { Injectable } from '@angular/core';
import { Calculation } from '../interfaces/calculation'
import { Decimal } from 'decimal.js';

// @Injectable({
//     providedIn: 'root',
// })

export class Calculator {
        // numeral = require('numeral');

        CalcData: Calculation = {
            mainDisplay: '0',
            arrayToDisplay: '',
            deepThought: false
        };
    
        showAnswer: boolean = false;
        lastIsOperate: boolean = false;
        isDecimal: boolean = false;
        
        arrayToCalculate: any[] = [];
    
    
        tempNumber: Decimal = new Decimal(0);
    
        constructor() {}
    
        public pushButton(btn): Calculation {
            switch (btn) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '0':
                case ',':
                    this.createNumber(btn);
    
                    break;
                case 'sin':
                case 'tan':
                case 'cos':
                case 'log':
                case 'pow':
                case 'sqrt':
                case '/':
                case '*':
                case '+':
                case '-':
                    this.enterOperation(btn);
    
                    break;
                case '=':
                case 'Enter':
                    this.calculate();
    
                    break;
                case 'del':
                case 'Escape':
                    this.delete();
    
                    break;
                case "bs":
                    // backspace
                    this.backSpace();
    
                break;
                case "?":
                    // backspace
                    return
    
                break;
                default:
    
                    return;
    
            }
    
            return this.CalcData;
        }
    
        // PRIVATE FUNCTIONS
    
        private createNumber(num) {
            // when a answer is produced only an operation
            this.lastIsOperate = false;
            if (this.showAnswer === true) {
    
                return;
            }
    
            if (num === ',') {
    
                if (this.isDecimal === true) {
    
                    return;
                } else if (this.CalcData.mainDisplay === '') {  
                    this.CalcData.mainDisplay += '0.';
                } else {
                    this.CalcData.mainDisplay += '.';
                }
    
                this.isDecimal = true;
    
            } else if (num === '0') {
                if (this.CalcData.mainDisplay[0] === '0' && this.isDecimal === false) {
    
                    return;
                } else {
                    this.CalcData.mainDisplay += num;
                }
            } else if (this.CalcData.mainDisplay === '' || this.CalcData.mainDisplay === '0') {
                this.CalcData.mainDisplay = num;
    
                return;
            } else {
                this.CalcData.mainDisplay += num;
            }
        }
    
        private enterOperation(func) {
            switch (func) {
                case 'pow':
                    if(this.showAnswer === true) {
                        this.CalcData.arrayToDisplay += '&#178;';
                        this.arrayToCalculate.push('pow');
                    } else {
                        this.arrayToCalculate.push(new Decimal(this.CalcData.mainDisplay), 'pow' );
                        this.CalcData.arrayToDisplay += this.CalcData.mainDisplay;
                        this.CalcData.arrayToDisplay += '&#178;';
                    }
                    this.CalcData.mainDisplay = '';
                    
                    this.lastIsOperate = false;
                    
                    break;
                case 'sqrt':
                    if(this.showAnswer === true) {
                        let str = this.CalcData.arrayToDisplay;
                        let position = str.lastIndexOf("=") + 1;
                        this.CalcData.arrayToDisplay = str.substring(0, position) + '&#8730;' + str.substring(position);
                        this.arrayToCalculate.unshift('sqrt');
                    } else {
                        this.arrayToCalculate.push('sqrt', new Decimal(this.CalcData.mainDisplay));
                        this.CalcData.arrayToDisplay += '&#8730;';
                        this.CalcData.arrayToDisplay +=  this.CalcData.mainDisplay;
                    }
                    
                    this.CalcData.mainDisplay = '';
                    this.lastIsOperate = false;
                    
                    break;
                case '*':
                case '/':
                case '+':
                case '-':
                    if(this.lastIsOperate === true) {
                        
                        return;
                        
                    }else if (this.showAnswer === true) {
                        // operation after pushing "="
                        this.arrayToCalculate.push(func);
                        this.CalcData.arrayToDisplay += func;
                        this.CalcData.mainDisplay = '';
                    } else if (this.CalcData.mainDisplay !== '') {
                        // operation after numbers are entered
                        this.CalcData.arrayToDisplay += this.CalcData.mainDisplay;
                        this.CalcData.arrayToDisplay += func;
                        this.arrayToCalculate.push(new Decimal(this.CalcData.mainDisplay),func);
                        this.CalcData.mainDisplay = '';
                    } else {
                        // operation after a (x2) or (v)
                        this.arrayToCalculate.push(func);
                        this.CalcData.arrayToDisplay += func;
                    }
                    
                    this.lastIsOperate = true;
                    
                default:
                    break;
                }
                        
            this.CalcData.deepThought = false
            this.showAnswer = false;
            this.isDecimal = false;
        }
    
        private calculate() {
            // only if:
            // - currentAnswer !== infinite
    
            if(this.lastIsOperate === true || this.showAnswer === true || this.arrayToCalculate.length === 0) {
                console.log('catch');
    
                return;
            } else {
                if (this.CalcData.mainDisplay !== "") {
                    this.arrayToCalculate.push(new Decimal(this.CalcData.mainDisplay));
                }
            } 
            
            while (this.arrayToCalculate.includes('sqrt')) {
                this.arrayToCalculate.forEach((element, index) => {
                    if (element === 'sqrt') {
                        this.tempNumber = this.operate(
                            parseFloat(this.arrayToCalculate[index + 1]),
                            this.arrayToCalculate[index],
                            null
                        );
    
                        this.arrayToCalculate.splice(index, 2, this.tempNumber);
                        this.tempNumber = new Decimal(0);
                    }
                });
            }
            while (this.arrayToCalculate.includes('pow')) {
                this.arrayToCalculate.forEach((element, index) => {
                    if (element === 'pow') {
                        this.tempNumber = this.operate(
                            parseFloat(this.arrayToCalculate[index - 1]),
                            this.arrayToCalculate[index],
                            2
                        );
    
                        this.arrayToCalculate.splice(index - 1, 2, this.tempNumber);
                        this.tempNumber = new Decimal(0);
                    }
                });
            }
            while (this.arrayToCalculate.includes('*')) {
                this.handleOperation('*')
            }
            while (this.arrayToCalculate.includes('/')) {
                this.handleOperation('/')
            }
            while (this.arrayToCalculate.includes('+')) {
                this.handleOperation('+')
            }
            while (this.arrayToCalculate.includes('-')) {
                this.handleOperation('-')
            }
    
            this.arrayToCalculate[0] = new Decimal(this.arrayToCalculate[0])
            .toDecimalPlaces(12)
            .toString();
            
            if(this.arrayToCalculate[0] === "42" ) {
                this.CalcData.deepThought = true
            } else {
                this.CalcData.deepThought = false
    
            }
            
            this.CalcData.arrayToDisplay += this.CalcData.mainDisplay + '=' + this.arrayToCalculate[0];
            this.CalcData.mainDisplay = this.arrayToCalculate[0];
            this.showAnswer = true
            this.isDecimal = false
    
        }
    
        private operate(operand1, operator, operand2) {
            switch (operator) {
                case 'sqrt':
                    return Decimal.sqrt(operand1);
                case 'pow':
                    return Decimal.pow(operand1, operand2);
                    break;
                case '/':
                    return Decimal.div(operand1, operand2);
                    break;
                case '*':
                    return Decimal.mul(operand1, operand2);
                    break;
                case '+':
                    return Decimal.add(operand1, operand2);
                    break;
                case '-':
                    return Decimal.sub(operand1, operand2);
                    break;
                default:
                console.log('error in operate()')
                    break;
            }
        }
    
        private handleOperation(operation) {
            this.arrayToCalculate.forEach((element, index) => {
                if (element === operation) {
                    this.tempNumber = this.operate(
                        parseFloat(this.arrayToCalculate[index - 1]),
                        this.arrayToCalculate[index],
                        parseFloat(this.arrayToCalculate[index + 1])
                    );
                    this.arrayToCalculate.splice(index - 1, 3);
                    this.arrayToCalculate.splice(
                        index - 1,
                        0,
                        this.tempNumber
                    );
                    this.tempNumber = new Decimal(0);
                }
            });
        }
    
        private backSpace() {
            if (this.CalcData.mainDisplay.length < 1) {
                return
            } else {
                this.CalcData.mainDisplay = this.CalcData.mainDisplay.slice(0, -1)
            }
        }
    
        private delete() {
            this.CalcData = {
                mainDisplay: '0',
                arrayToDisplay: '',
                deepThought: false
            };
    
            this.showAnswer = false;
            this.isDecimal = false;
            this.lastIsOperate = false;
            this.tempNumber = new Decimal(0);
            this.arrayToCalculate = [];
        }
}
