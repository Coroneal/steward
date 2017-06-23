import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Buyer } from './buyer.model';
import { BuyerPopupService } from './buyer-popup.service';
import { BuyerService } from './buyer.service';

@Component({
    selector: 'jhi-buyer-delete-dialog',
    templateUrl: './buyer-delete-dialog.component.html'
})
export class BuyerDeleteDialogComponent {

    buyer: Buyer;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private buyerService: BuyerService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['buyer']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.buyerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'buyerListModification',
                content: 'Deleted an buyer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-buyer-delete-popup',
    template: ''
})
export class BuyerDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private buyerPopupService: BuyerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.buyerPopupService
                .open(BuyerDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
