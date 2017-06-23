import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Deal } from './deal.model';
import { DealPopupService } from './deal-popup.service';
import { DealService } from './deal.service';

@Component({
    selector: 'jhi-deal-delete-dialog',
    templateUrl: './deal-delete-dialog.component.html'
})
export class DealDeleteDialogComponent {

    deal: Deal;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private dealService: DealService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['deal']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dealService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dealListModification',
                content: 'Deleted an deal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-deal-delete-popup',
    template: ''
})
export class DealDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dealPopupService: DealPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.dealPopupService
                .open(DealDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
