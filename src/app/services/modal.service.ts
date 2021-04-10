import { Injectable } from '@angular/core';
import { MyModal } from '../models/my-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalTemplateComponent } from '../mat-components/my-modal-template/my-modal-template.component';


const MODALS: MyModal[] = [
    {
        id: 0,
        title: 'example',
        body: 'this is an example bodyText',
        options: false,
        createdOn: new Date('2021-04-04'),
        lastUpdatedOn: new Date('2021-04-04'),
    },
    {
        id: 1,
        title: 'example 2',
        body:
            'this is an other example of some text we will use for a body text',
        options: false,
        createdOn: new Date('2021-04-04'),
        lastUpdatedOn: new Date('2021-04-04'),
    },
    {
        id: 3,
        title: 'example 3',
        body:
            'this is an other example lorem15',
        options: false,
        createdOn: new Date('2021-04-04'),
        lastUpdatedOn: new Date('2021-04-04'),
    },
];


@Injectable({
    providedIn: 'root',
})
export class ModalService {

    showingDialog = false;

    modals = MODALS;
    private modalRef;
 


    constructor(private ngbModal: NgbModal ) {}

  
    createModal(): Promise<any> {
      this.modalRef = this.ngbModal.open(MyModalTemplateComponent, {
        size: 'sm',

      });
  
      this.modalRef.componentInstance.setDialogProps({title: 'BaxxieTitle', body: 'a story about this subject'});
      return this.modalRef.result;
    }

    closeModal() {

    }
  
  }

