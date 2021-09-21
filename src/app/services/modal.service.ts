import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalTemplateComponent } from '../mat-components/my-modal-template/my-modal-template.component';

@Injectable({
    providedIn: 'root',
    
})
export class ModalService {
    showingDialog = false;

    // template: `
    // <ng-template #content let-modal>
    // <div class="modal-header">
    //   <h4 class="modal-title" id="modal-basic-title">Profile update</h4>
    //   <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
    //     <span aria-hidden="true">&times;</span>
    //   </button>
    // </div>
    // <div class="modal-body">
    //   <form>
    //     <div class="form-group">
    //       <label for="dateOfBirth">Date of birth</label>
    //       <div class="input-group">
    //         <input id="dateOfBirth" class="form-control" placeholder="yyyy-mm-dd" name="dp" ngbDatepicker #dp="ngbDatepicker">
    //         <div class="input-group-append">
    //           <button class="btn btn-outline-secondary calendar" (click)="dp.toggle()" type="button"></button>
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </div>
    // `

    modelElement = {
        title: "",
        body: "",
        size: "sm"
    }

    // modals = MODALS;
    private modalRef;

    constructor(
        private ngbModal: NgbModal
        ) {}

    createModal(input = null, title = null): Promise<any> {
        // console.log(input);
        if (input === null) {
            this.modalRef = this.ngbModal.open(MyModalTemplateComponent, {
                size: this.modelElement.size,
            });

            this.modalRef.componentInstance.setDialogProps({
                title: this.modelElement.title,
                body: this.modelElement.body,
            });
        } else {
            this.modalRef = this.ngbModal.open(MyModalTemplateComponent, {
                size: this.modelElement.size,
            });

            this.modalRef.componentInstance.setDialogProps({
                title: 'title',
                body: input,
            });
        }

        return this.modalRef.result;
    }

    setBody(body) {
        this.modelElement.body = body; 
    }

    setTitle(title) {
        this.modelElement.title = title;
    }

    setSize(size) {
        this.modelElement.size = size;
    }

    closeModal() {}
}


