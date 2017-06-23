import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Raport } from './raport.model';
import { RaportPopupService } from './raport-popup.service';
import { RaportService } from './raport.service';

@Component({
    selector: 'jhi-raport-delete-dialog',
    templateUrl: './raport-delete-dialog.component.html'
})
export class RaportDeleteDialogComponent {

    raport: Raport;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private raportService: RaportService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['raport']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.raportService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'raportListModification',
                content: 'Deleted an raport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-raport-delete-popup',
    template: ''
})
export class RaportDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private raportPopupService: RaportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.raportPopupService
                .open(RaportDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
