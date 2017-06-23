import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Mechanic } from './mechanic.model';
import { MechanicService } from './mechanic.service';

@Component({
    selector: 'jhi-mechanic-detail',
    templateUrl: './mechanic-detail.component.html'
})
export class MechanicDetailComponent implements OnInit, OnDestroy {

    mechanic: Mechanic;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private mechanicService: MechanicService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['mechanic']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMechanics();
    }

    load(id) {
        this.mechanicService.find(id).subscribe((mechanic) => {
            this.mechanic = mechanic;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMechanics() {
        this.eventSubscriber = this.eventManager.subscribe('mechanicListModification', (response) => this.load(this.mechanic.id));
    }
}
