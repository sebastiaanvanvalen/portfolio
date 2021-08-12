import { Injectable } from '@angular/core';
import { MyModal } from '../models/my-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalTemplateComponent } from '../mat-components/my-modal-template/my-modal-template.component';

// const MODALS: MyModal[] = [
//     {
//         id: 0,
//         title: 'example',
//         body: 'this is an example bodyText',
//         options: false,
//         createdOn: new Date('2021-04-04'),
//         lastUpdatedOn: new Date('2021-04-04'),
//     },
//     {
//         id: 1,
//         title: 'example 2',
//         body:
//             'this is an other example of some text we will use for a body text',
//         options: false,
//         createdOn: new Date('2021-04-04'),
//         lastUpdatedOn: new Date('2021-04-04'),
//     },
//     {
//         id: 3,
//         title: 'example 3',
//         body: 'this is an other example lorem15',
//         options: false,
//         createdOn: new Date('2021-04-04'),
//         lastUpdatedOn: new Date('2021-04-04'),
//     },
// ];






@Injectable({
    providedIn: 'root',
    
})
export class ModalService {
    showingDialog = false;

    template: `
    <ng-template #content let-modal>
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Profile update</h4>
      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class="form-group">
          <label for="dateOfBirth">Date of birth</label>
          <div class="input-group">
            <input id="dateOfBirth" class="form-control" placeholder="yyyy-mm-dd" name="dp" ngbDatepicker #dp="ngbDatepicker">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary calendar" (click)="dp.toggle()" type="button"></button>
            </div>
          </div>
        </div>
      </form>
    </div>
    `

    // modals = MODALS;
    private modalRef;

    constructor(
        private ngbModal: NgbModal
        ) {}

    createModal(input = null): Promise<any> {
        console.log(input);
        if (input === null) {
            this.modalRef = this.ngbModal.open(MyModalTemplateComponent, {
                size: 'sm',
            });

            this.modalRef.componentInstance.setDialogProps({
                title: 'Dark Mode',
                body: 'some parts of this website and colors for the dark- and lightMode are set yet.',
            });
        } else {
            this.modalRef = this.ngbModal.open(MyModalTemplateComponent, {
                size: 'sm',
            });

            this.modalRef.componentInstance.setDialogProps({
                title: 'title',
                body: input,
            });
        }

        return this.modalRef.result;
    }

    closeModal() {}
}


