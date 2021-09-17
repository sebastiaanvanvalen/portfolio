import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Ball } from './classes/Ball';
import { CanvasObject } from './interfaces/CanvasObject';


@Component({
    selector: 'app-happyBalls',
    templateUrl: './happyBalls.component.html',
    styleUrls: ['./happyBalls.component.scss'],
    styles: ['canvas { width: 400px;height: 400; }']
})
export class HappyBallsComponent implements OnInit {

    private colors = {
        'main': ['#2185C5', '#7ECEFD', '#FF7F66'],
        'reddish': ['#3581845', '#900C3F', '#C70039', '#FF5733', '#FFC300'],
        'open': ['#097392', '#83B4B3', '#FFF0CE', '#D55534', '#383838'],
        'autumn': ['#335C67', '#fff3B0', '#E09f3E', '#9E2A2B', '#540B0E'],
        'summer': ['#66FF00', '#1974D2', '#08E8DE', '#FFF000', '#FFAA1D', '#FF007F'],
        'many': [
            '#F44336',
            '#FFEBEE',
            '#FFCDD2',
            '#EF9A9A',
            '#E57373',
            '#EF5350',
            '#E53935',
            '#D32F2F',
            '#C62828',
            '#B71C1C',
            '#FF8A80',
            '#FF5252',
            '#FF1744',
            '#D50000',
            '#FCE4EC',
            '#F8BBD0',
            '#F48FB1',
            '#F06292',
            '#EC407A',
            '#E91E63',
            '#D81B60',
            '#C2185B',
            '#AD1457',
            '#880E4F',
            '#FF80AB',
            '#FF4081',
            '#F50057',
            '#C51162',
            '#F3E5F5',
            '#E1BEE7',
            '#CE93D8',
            '#BA68C8',
            '#AB47BC',
            '#9C27B0',
            '#8E24AA',
            '#7B1FA2',
            '#6A1B9A',
            '#4A148C',
            '#EA80FC',
            '#E040FB',
            '#D500F9',
            '#AA00FF',
            '#EDE7F6',
            '#D1C4E9',
            '#B39DDB',
            '#9575CD',
            '#7E57C2',
            '#673AB7',
            '#5E35B1',
            '#512DA8',
            '#4527A0',
            '#311B92',
            '#B388FF',
            '#7C4DFF',
            '#651FFF',
            '#6200EA',
            '#E8EAF6',
            '#C5CAE9',
            '#9FA8DA',
            '#7986CB',
            '#5C6BC0',
            '#3F51B5',
            '#3949AB',
            '#303F9F',
            '#283593',
            '#1A237E',
            '#8C9EFF',
            '#536DFE',
            '#3D5AFE',
            '#304FFE',
            '#E3F2FD',
            '#BBDEFB',
            '#90CAF9',
            '#64B5F6',
            '#42A5F5',
            '#2196F3',
            '#1E88E5',
            '#1976D2',
            '#1565C0',
            '#0D47A1',
            '#82B1FF',
            '#448AFF',
            '#2979FF',
            '#2962FF',
            '#E1F5FE',
            '#B3E5FC',
            '#81D4FA',
            '#4FC3F7',
            '#29B6F6',
            '#03A9F4',
            '#039BE5',
            '#0288D1',
            '#0277BD',
            '#01579B',
            '#80D8FF',
            '#40C4FF',
            '#00B0FF',
            '#0091EA',
            '#E0F7FA',
            '#B2EBF2',
            '#80DEEA',
            '#4DD0E1',
            '#26C6DA',
            '#00BCD4',
            '#00ACC1',
            '#0097A7',
            '#00838F',
            '#6064',
            '#84FFFF',
            '#18FFFF',
            '#00E5FF',
            '#00B8D4',
            '#E0F2F1',
            '#B2DFDB',
            '#80CBC4',
            '#4DB6AC',
            '#26A69A',
            '#9688',
            '#00897B',
            '#00796B',
            '#00695C',
            '#004D40',
            '#A7FFEB',
            '#64FFDA',
            '#1DE9B6',
            '#00BFA5',
            '#E8F5E9',
            '#C8E6C9',
            '#A5D6A7',
            '#81C784',
            '#66BB6A',
            '#4CAF50',
            '#43A047',
            '#388E3C',
            '#2E7D32',
            '#1B5E20',
            '#B9F6CA',
            '#69F0AE',
            '#00E676',
            '#00C853',
            '#F1F8E9',
            '#DCEDC8',
            '#C5E1A5',
            '#AED581',
            '#9CCC65',
            '#8BC34A',
            '#7CB342',
            '#689F38',
            '#558B2F',
            '#33691E',
            '#CCFF90',
            '#B2FF59',
            '#76FF03',
            '#64DD17',
            '#F9FBE7',
            '#F0F4C3',
            '#E6EE9C',
            '#DCE775',
            '#D4E157',
            '#CDDC39',
            '#C0CA33',
            '#AFB42B',
            '#9E9D24',
            '#827717',
            '#F4FF81',
            '#EEFF41',
            '#C6FF00',
            '#AEEA00',
            '#FFFDE7',
            '#FFF9C4',
            '#FFF59D',
            '#FFF176',
            '#FFEE58',
            '#FFEB3B',
            '#FDD835',
            '#FBC02D',
            '#F9A825',
            '#F57F17',
            '#FFFF8D',
            '#FFFF00',
            '#FFEA00',
            '#FFD600',
            '#FFF8E1',
            '#FFECB3',
            '#FFE082',
            '#FFD54F',
            '#FFCA28',
            '#FFC107',
            '#FFB300',
            '#FFA000',
            '#FF8F00',
            '#FF6F00',
            '#FFE57F',
            '#FFD740',
            '#FFC400',
            '#FFAB00',
            '#FFF3E0',
            '#FFE0B2',
            '#FFCC80',
            '#FFB74D',
            '#FFA726',
            '#FF9800',
            '#FB8C00',
            '#F57C00',
            '#EF6C00',
            '#E65100',
            '#FFD180',
            '#FFAB40',
            '#FF9100',
            '#FF6D00',
            '#FBE9E7',
            '#FFCCBC',
            '#FFAB91',
            '#FF8A65',
            '#FF7043',
            '#FF5722',
            '#F4511E',
            '#E64A19',
            '#D84315',
            '#BF360C',
            '#FF9E80',
            '#FF6E40',
            '#FF3D00',
            '#DD2C00',
            '#EFEBE9',
            '#D7CCC8',
            '#BCAAA4',
            '#A1887F',
            '#8D6E63',
            '#795548',
            '#6D4C41',
            '#5D4037',
            '#4E342E',
            '#3E2723',
            '#FAFAFA',
            '#F5F5F5',
            '#EEEEEE',
            '#E0E0E0',
            '#BDBDBD',
            '#9E9E9E',
            '#757575',
            '#616161',
            '#424242',
            '#212121',
            '#ECEFF1',
            '#CFD8DC',
            '#B0BEC5',
            '#90A4AE',
            '#78909C',
            '#607D8B',
            '#546E7A',
            '#455A64',
            '#37474F',
            '#263238',
            '#0']
    }

    @ViewChild('canvas', { static: true })
    private myCanvas: ElementRef<HTMLCanvasElement>
    public c: CanvasRenderingContext2D;
    private interval;

    private canvasObject:CanvasObject = {
        'balls': [],
        'ballCounter': 100,
        'radius': 9,
        'mouseX': 0,
        'mouseY': 0,
        'colorMode': 'many',
        'style': 'small',
        'collide': true,
        'coloring': true
    }
    
    constructor() {}

    ngOnInit(): void {
        this.c = this.myCanvas.nativeElement.getContext('2d');
        this.canvasObject.mouseX = this.myCanvas.nativeElement.offsetWidth / 2;
        this.canvasObject.mouseY = this.myCanvas.nativeElement.offsetHeight / 2;
        this.canvasObject.colorMode = this.randomColor(this.colors.many);

        this.init();
        this.animate();
    }

    public changeStyle(style) {
        switch (style) {
            case 'small':
                this.canvasObject.style = "small";
                this.canvasObject.ballCounter = 100;
                this.canvasObject.radius = 9;
                this.canvasObject.coloring = true;
                this.init();
                
            break;
            case 'large':
                this.canvasObject.style = "large";
                this.canvasObject.ballCounter = 50;
                this.canvasObject.radius = 18;
                this.canvasObject.coloring = true;
                this.init();
                
            break;
            case 'nobounce':
                if(this.canvasObject.style !== 'happy') {
                    this.canvasObject.collide = !this.canvasObject.collide;
                    this.canvasObject.coloring = true;
                    this.init();
                }
                
            break;
            case 'happy':
                this.canvasObject.style = "happy";
                this.canvasObject.ballCounter = 6;
                this.canvasObject.radius = 28;
                this.canvasObject.collide = true;
                this.canvasObject.coloring = false;
                this.init();

            break;
            default:
            break;
        }
    }

    randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    distanceToWall(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    distanceToBall(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    init() {
        this.canvasObject.balls = [];

        for (let i = 0; i < this.canvasObject.ballCounter; i++) {
            let x = this.distanceToWall(this.canvasObject.radius, this.myCanvas.nativeElement.width - this.canvasObject.radius);
            let y = this.distanceToWall( this.canvasObject.radius, this.myCanvas.nativeElement.height - this.canvasObject.radius );
            const color = this.randomColor(this.colors.many);

            if (i !== 0) {
                for (let j = 0; j < this.canvasObject.balls.length; j++) {
                    if ( this.distanceToBall(x, y, this.canvasObject.balls[j].x, this.canvasObject.balls[j].y) - this.canvasObject.radius * 2 < 0) {
                        x = this.distanceToWall( this.canvasObject.radius, this.myCanvas.nativeElement.width  - this.canvasObject.radius );
                        y = this.distanceToWall( this.canvasObject.radius, this.myCanvas.nativeElement.height - this.canvasObject.radius );

                        j = -1;
                    }
                }
            }
            this.canvasObject.balls.push(new Ball(x, y, this.canvasObject.radius, color, this.canvasObject.collide, this.canvasObject.coloring, this.canvasObject.style));
        }
    }

    animate() {
            // callback because of losing the 'this' context
        window.requestAnimationFrame(() => this.animate());
        this.c.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
        
        this.canvasObject.balls.forEach((ball) => {
            ball.update(this.c, this.canvasObject.mouseX, this.canvasObject.mouseY, this.canvasObject.balls, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
        });
    }

    NgOnDestroy(){
        this.interval.clear()
    }
}
