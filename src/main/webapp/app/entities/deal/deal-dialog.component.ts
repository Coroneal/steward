import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Deal } from './deal.model';
import { DealPopupService } from './deal-popup.service';
import { DealService } from './deal.service';
import { Mechanic, MechanicService } from '../mechanic';
import { Buyer, BuyerService } from '../buyer';

@Component({
    selector: 'jhi-deal-dialog',
    templateUrl: './deal-dialog.component.html'
})
export class DealDialogComponent implements OnInit {

    deal: Deal;
    authorities: any[];
    isSaving: boolean;

    mechanics: Mechanic[];

    buyers: Buyer[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private dealService: DealService,
        private mechanicService: MechanicService,
        private buyerService: BuyerService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['deal']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.mechanicService.query().subscribe(
            (res: Response) => { this.mechanics = res.json(); }, (res: Response) => this.onError(res.json()));
        this.buyerService.query().subscribe(
            (res: Response) => { this.buyers = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.deal.id !== undefined) {
            this.dealService.update(this.deal)
                .subscribe((res: Deal) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.dealService.create(this.deal)
                .subscribe((res: Deal) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Deal) {
        this.eventManager.broadcast({ name: 'dealListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackMechanicById(index: number, item: Mechanic) {
        return item.id;
    }

    trackBuyerById(index: number, item: Buyer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-deal-popup',
    template: ''
})
export class DealPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dealPopupService: DealPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.dealPopupService
                    .open(DealDialogComponent, params['id']);
            } else {
                this.modalRef = this.dealPopupService
                    .open(DealDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
