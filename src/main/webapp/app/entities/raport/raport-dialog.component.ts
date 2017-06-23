import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Raport } from './raport.model';
import { RaportPopupService } from './raport-popup.service';
import { RaportService } from './raport.service';
import { Deal, DealService } from '../deal';

@Component({
    selector: 'jhi-raport-dialog',
    templateUrl: './raport-dialog.component.html'
})
export class RaportDialogComponent implements OnInit {

    raport: Raport;
    authorities: any[];
    isSaving: boolean;

    deals: Deal[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private raportService: RaportService,
        private dealService: DealService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['raport']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.dealService.query({filter: 'raport-is-null'}).subscribe((res: Response) => {
            if (!this.raport.deal || !this.raport.deal.id) {
                this.deals = res.json();
            } else {
                this.dealService.find(this.raport.deal.id).subscribe((subRes: Deal) => {
                    this.deals = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.raport.id !== undefined) {
            this.raportService.update(this.raport)
                .subscribe((res: Raport) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.raportService.create(this.raport)
                .subscribe((res: Raport) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Raport) {
        this.eventManager.broadcast({ name: 'raportListModification', content: 'OK'});
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

    trackDealById(index: number, item: Deal) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-raport-popup',
    template: ''
})
export class RaportPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private raportPopupService: RaportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.raportPopupService
                    .open(RaportDialogComponent, params['id']);
            } else {
                this.modalRef = this.raportPopupService
                    .open(RaportDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
