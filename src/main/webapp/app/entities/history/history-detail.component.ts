import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { History } from './history.model';
import { HistoryService } from './history.service';

@Component({
    selector: 'jhi-history-detail',
    templateUrl: './history-detail.component.html'
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

    history: History;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private historyService: HistoryService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['history', 'eventType', 'eventEntity']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHistories();
    }

    load(id) {
        this.historyService.find(id).subscribe((history) => {
            this.history = history;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHistories() {
        this.eventSubscriber = this.eventManager.subscribe('historyListModification', (response) => this.load(this.history.id));
    }
}
