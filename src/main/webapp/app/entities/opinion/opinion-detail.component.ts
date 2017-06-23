import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Opinion } from './opinion.model';
import { OpinionService } from './opinion.service';

@Component({
    selector: 'jhi-opinion-detail',
    templateUrl: './opinion-detail.component.html'
})
export class OpinionDetailComponent implements OnInit, OnDestroy {

    opinion: Opinion;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private opinionService: OpinionService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['opinion']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOpinions();
    }

    load(id) {
        this.opinionService.find(id).subscribe((opinion) => {
            this.opinion = opinion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOpinions() {
        this.eventSubscriber = this.eventManager.subscribe('opinionListModification', (response) => this.load(this.opinion.id));
    }
}
