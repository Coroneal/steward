import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Opinion } from './opinion.model';
import { OpinionPopupService } from './opinion-popup.service';
import { OpinionService } from './opinion.service';

@Component({
    selector: 'jhi-opinion-delete-dialog',
    templateUrl: './opinion-delete-dialog.component.html'
})
export class OpinionDeleteDialogComponent {

    opinion: Opinion;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private opinionService: OpinionService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['opinion']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.opinionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'opinionListModification',
                content: 'Deleted an opinion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-opinion-delete-popup',
    template: ''
})
export class OpinionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private opinionPopupService: OpinionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.opinionPopupService
                .open(OpinionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
