import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-my-modal-template',
    templateUrl: './my-modal-template.component.html',
    styleUrls: ['./my-modal-template.component.scss'],
})
export class MyModalTemplateComponent implements OnInit {
    public title = '';
    public body = '';

    constructor(public activeModal: NgbActiveModal) {}

    buttons: any[] = [{ value: 'One' }, { value: 'Two' }, { value: 'Three' }];

    ngOnInit() {}

    setDialogProps(props: any) {
        let body = document.getElementById('body')

        this.title = props.title;
        // this.body = props.body;
        body.innerHTML = props.body;
        'all info concerning: ' + props;
    }

    actionTaken(result: any) {
        this.activeModal.close(JSON.stringify(result));
    }
}
