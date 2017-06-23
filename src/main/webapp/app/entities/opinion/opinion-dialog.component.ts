import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Opinion } from './opinion.model';
import { OpinionPopupService } from './opinion-popup.service';
import { OpinionService } from './opinion.service';
import { Mechanic, MechanicService } from '../mechanic';
import { Buyer, BuyerService } from '../buyer';

@Component({
    selector: 'jhi-opinion-dialog',
    templateUrl: './opinion-dialog.component.html'
})
export class OpinionDialogComponent implements OnInit {

    opinion: Opinion;
    authorities: any[];
    isSaving: boolean;

    mechanics: Mechanic[];

    buyers: Buyer[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private opinionService: OpinionService,
        private mechanicService: MechanicService,
        private buyerService: BuyerService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['opinion']);
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
        if (this.opinion.id !== undefined) {
            this.opinionService.update(this.opinion)
                .subscribe((res: Opinion) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.opinionService.create(this.opinion)
                .subscribe((res: Opinion) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Opinion) {
        this.eventManager.broadcast({ name: 'opinionListModification', content: 'OK'});
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
    selector: 'jhi-opinion-popup',
    template: ''
})
export class OpinionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opinionPopupService: OpinionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.opinionPopupService
                    .open(OpinionDialogComponent, params['id']);
            } else {
                this.modalRef = this.opinionPopupService
                    .open(OpinionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
