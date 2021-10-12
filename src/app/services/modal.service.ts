import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyModalTemplateComponent } from '../mat-components/my-modal-template/my-modal-template.component';

@Injectable({
    providedIn: 'root',
    
})
export class ModalService {
    showingDialog = false;

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


