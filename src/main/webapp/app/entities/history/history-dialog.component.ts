import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { History } from './history.model';
import { HistoryPopupService } from './history-popup.service';
import { HistoryService } from './history.service';

@Component({
    selector: 'jhi-history-dialog',
    templateUrl: './history-dialog.component.html'
})
export class HistoryDialogComponent implements OnInit {

    history: History;
    authorities: any[];
    isSaving: boolean;
        constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private historyService: HistoryService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['history', 'eventType', 'eventEntity']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.history.id !== undefined) {
            this.historyService.update(this.history)
                .subscribe((res: History) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.historyService.create(this.history)
                .subscribe((res: History) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: History) {
        this.eventManager.broadcast({ name: 'historyListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-history-popup',
    template: ''
})
export class HistoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private historyPopupService: HistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.historyPopupService
                    .open(HistoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.historyPopupService
                    .open(HistoryDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
