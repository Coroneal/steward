import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Raport } from './raport.model';
import { RaportService } from './raport.service';

@Component({
    selector: 'jhi-raport-detail',
    templateUrl: './raport-detail.component.html'
})
export class RaportDetailComponent implements OnInit, OnDestroy {

    raport: Raport;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private raportService: RaportService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['raport']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRaports();
    }

    load(id) {
        this.raportService.find(id).subscribe((raport) => {
            this.raport = raport;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRaports() {
        this.eventSubscriber = this.eventManager.subscribe('raportListModification', (response) => this.load(this.raport.id));
    }
}
